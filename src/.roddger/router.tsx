import { statSync } from "fs";
import * as path from "path";
import { renderToReadableStream } from "react-dom/server";
import { DOM } from "./dom";

const PROJECT_ROOT = path.resolve(import.meta.dir, "..");
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, "public");
const RODDGER_DIR = path.resolve(PROJECT_ROOT, ".roddger");
const BUILD_DIR = path.resolve(PROJECT_ROOT, "dist");

const srcRouter = new Bun.FileSystemRouter({
  dir: "./src/pages",
  style: "nextjs",
});

const build = await Bun.build({
  entrypoints: [
    RODDGER_DIR + "/client.tsx",
    ...Object.values(srcRouter.routes),
  ],
  outdir: BUILD_DIR,
  target: "browser",
  splitting: true,
});

build.logs.forEach((log) => {
  console.log(log);
});

const buildRouter = new Bun.FileSystemRouter({
  dir: BUILD_DIR + "/pages",
  style: "nextjs",
});

function serveFromDir(config: {
  directory: string;
  path: string;
}): Response | null {
  let basePath = path.join(config.directory, config.path);
  const suffixes = ["", ".html", "index.html"];

  for (const suffix of suffixes) {
    try {
      const pathWithSuffix = path.join(basePath, suffix);
      const stat = statSync(pathWithSuffix);
      if (stat && stat.isFile()) {
        return new Response(Bun.file(pathWithSuffix));
      }
    } catch (err) {}
  }

  return null;
}

// Change return type to ServeOptions for better DX
export async function router(request: Request): Promise<Response> {
  const srcMatch = srcRouter.match(request);

  if (srcMatch) {
    const builtMatch = buildRouter.match(request);
    if (!builtMatch) {
      return new Response("Unknown error", { status: 500 });
    }

    const { Page } = await import(srcMatch.filePath);

    // Page could not be found
    // TODO: Add Get and Post methods

    const stream = await renderToReadableStream(<DOM root={<Page />} />, {
      bootstrapScriptContent: `globalThis.PATH_TO_PAGE = "/${builtMatch.src}";`,
      bootstrapModules: [".roddger/client.js"],
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  let reqPath = new URL(request.url).pathname;
  console.log(request.method, reqPath);
  if (reqPath === "/") reqPath = "/index.html";

  // check public
  const publicResponse = serveFromDir({
    directory: PUBLIC_DIR,
    path: reqPath,
  });
  if (publicResponse) return publicResponse;

  // check built assets
  const buildResponse = serveFromDir({ directory: BUILD_DIR, path: reqPath });
  if (buildResponse) return buildResponse;

  const pagesResponse = serveFromDir({
    directory: BUILD_DIR + "/pages",
    path: reqPath,
  });
  if (pagesResponse) return pagesResponse;

  return new Response("File not found", {
    status: 404,
  });
}
