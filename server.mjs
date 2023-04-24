import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleStream } from "./js-backend/googleSpeechAPI.mjs";
import cors from "cors";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server);

io.on("connection", (socket) => {
  socket.emit("connection", "connection established");

  let cueData = {};

  socket.on("send_cueData", (data) => {
    cueData = { ...data };
  });

  socket.on("incoming_stream", (audio) => {
    handleStream(socket, cueData, audio);
  });

  //THIS FUNCTION IS FOR TESTING ONLY
  // socket.on("incoming_stream", (audio) => {
  //   console.log("incoming stream received");
  //   socket.emit("results_processed", sessionResult);
  //   socket.emit("close_media_recorder", "closing media recorder");
  // });
});

app.use(express.static("./dist"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.get("/api", (req, res) => {
  res.send({ message: "this is api endpoint" });
});

server.listen(PORT, function () {
  console.log("Listening on " + server.address().port);
});
