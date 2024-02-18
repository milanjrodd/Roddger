import { router } from "./src/.roddger/router";

Bun.serve({
  port: 3000,
  fetch(req, server) {
    if (server.upgrade(req)) return;

    return router(req);
  },
  websocket: {
    message(ws, message) {
      console.log("Message from client: ", message);
      ws.send("Hello from server!");
    }, // a message is received
    open(ws) {
      ws.send("Hello from server!");
    }, // a socket is opened
    close(ws, code, message) {
      console.log("Socket closed: ", code, message);
    }, // a socket is closed
    drain(ws) {
      console.log("Socket is ready to receive more data");
    }, // the socket is ready to receive more data
  },
});
