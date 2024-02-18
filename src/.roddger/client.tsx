declare global {
  var PATH_TO_PAGE: string;
}

import React from "react";
import { hydrateRoot } from "react-dom/client";
const { Page } = await import(globalThis.PATH_TO_PAGE);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

hydrateRoot(rootElement, <Page />);

// Hot Reloading for web client
(() => {
  const socketUrl = "ws://localhost:3000";
  let socket = new WebSocket(socketUrl);
  console.log(socket);
  socket.addEventListener("close", () => {
    const interAttemptTimeoutMilliseconds = 100;
    const maxDisconnectedTimeMilliseconds = 3000;
    const maxAttempts = Math.round(
      maxDisconnectedTimeMilliseconds / interAttemptTimeoutMilliseconds
    );
    let attempts = 0;
    const reloadIfCanConnect = () => {
      attempts++;
      if (attempts > maxAttempts) {
        console.error("Could not reconnect to dev server.");
        return;
      }
      socket = new WebSocket(socketUrl);
      socket.addEventListener("error", () => {
        setTimeout(reloadIfCanConnect, interAttemptTimeoutMilliseconds);
      });
      socket.addEventListener("open", () => {
        location.reload();
      });
    };
    reloadIfCanConnect();
  });
})();
