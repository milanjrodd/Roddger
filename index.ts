import { router } from "@roddger/router";
import { db } from "@database/db";
import { movies } from "@database/schema/movies";

const result = await db.select().from(movies);
console.log(result);

Bun.serve({
  port: 3000,
  fetch(req, server) {
    if (server.upgrade(req)) return;

    return router(req);
  },
  websocket: {
    message(ws, message) {}, // a message is received
    open(ws) {}, // a socket is opened
    close(ws, code, message) {}, // a socket is closed
    drain(ws) {}, // the socket is ready to receive more data
  },
});
