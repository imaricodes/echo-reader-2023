import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleStream } from "./js-backend/googleSpeechAPI.mjs";
import { fetchGPT } from "./js-backend/fetchGPT.mjs";
import cors from "cors";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server);
let cueData = {};

io.on("connection", (socket) => {
  console.log("connected: ", socket.id);
  socket.emit("connection", "true");
  socket.on("disconnect", () => {
    // Perform any necessary cleanup actions or notify other clients
  });

  socket.on("cue_data", (data) => {
    cueData = { ...data };
  });

  socket.on("handle_stream", (data) => {
    handleStream(socket, cueData);
  });

  socket.on("fetch_gpt", (data) => {
    // socket.emit("gpt_result", "this would be gpt response");

    console.log("received gpt request::: ", data);

    //run gpt code here, data is session result from local storage
    const getChatGPTResponse = async (data) => {
      try {
        let result = await fetchGPT(data);
        socket.emit("chatGPT_result", result);
      } catch (error) {
        console.log(error)
        socket.emit('chatGPT_error', 'sorry chat GPT busy now')
      }
    };

    getChatGPTResponse(data);
  });

});

app.use(cors());

//********  DISABLE THIS FOR PRODUCTION ******* */
// app.get("/message", (req, res) => {
//   res.send({ message: "this is the root route" });
// });

//********  ENABLE THIS FOR PRODUCTION ******* */
//static files served via express

app.use(express.static("./dist"));

//send index.html via express server
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});
app.get("/instructions", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});


// app.get("/api/endpoint", (req, res) => {
//   res.send({ message: "this is api endpoint" });
// });

server.listen(PORT, function () {
  console.log("Listening on " + server.address().port);
});
