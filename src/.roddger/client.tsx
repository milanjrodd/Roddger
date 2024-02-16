declare global {
  var PATH_TO_PAGE: string;
}

import React from "react";
import { hydrateRoot } from "react-dom/client";
const { Page } = await import(globalThis.PATH_TO_PAGE);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

hydrateRoot(rootElement, <Page />);

// TODO: Hot Reloading
// const socket = new WebSocket("ws://localhost:80");

// // message is received
// socket.addEventListener("message", (event) => {
//   console.log("CLIENT: Message from server ", event.data);
// });

// // socket opened
// socket.addEventListener("open", (event) => {
//   socket.send("CLIENT: Hello Server!");
// });

// // socket closed
// socket.addEventListener("close", (event) => {
//   console.log("CLIENT: Socket closed ");
// });

// // error handler
// socket.addEventListener("error", (event) => {
//   console.log("Error ", event);
// });
