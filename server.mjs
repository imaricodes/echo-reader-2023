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

const sessionResult = [
  ["Everybody", "everybody", "everybody", "everybody", "everybody."],
  ["John", "has", "a", "toy", "car."],
  {
    cueWord: "john",
    responseWord: "everybody",
    match: "false",
    responseDisplayWord: "Everybody",
  },
  {
    cueWord: "has",
    responseWord: "everybody",
    match: "false",
    responseDisplayWord: "everybody",
  },
  {
    cueWord: "a",
    responseWord: "everybody",
    match: "false",
    responseDisplayWord: "everybody",
  },
  {
    cueWord: "toy",
    responseWord: "everybody",
    match: "false",
    responseDisplayWord: "everybody",
  },
  {
    cueWord: "car",
    responseWord: "everybody",
    match: "false",
    responseDisplayWord: "everybody.",
  },
];

io.on("connection", (socket) => {
  console.log("server side socket id: ", socket.id);
  socket.emit("connection", "connection established");

  let cueData = {};

  socket.on("test", () => console.log("test received"));

  socket.on("send_cueData", (data) => {
    cueData = { ...data };
  });

  // socket.on("incoming_stream", (audio) => {
  //   console.log("incoming stream received")
  //   // console.log(audio)
  //   handleStream(socket, cueData, audio);
  // })

  socket.on("incoming_stream", (audio) => {
    console.log("incoming stream received");
    socket.emit("results_processed", sessionResult);
    socket.emit("close_media_recorder", "closing media recorder");
    // handleStream(socket, cueData, audio);
  });
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
