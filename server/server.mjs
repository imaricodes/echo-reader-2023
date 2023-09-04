import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleStream } from "./js-backend/googleSpeechAPI.mjs";
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
    console.log("A client disconnected");
    // Perform any necessary cleanup actions or notify other clients
  });

  socket.on("cue_data", (data) => {
    console.log(data)
    cueData = { ...data };
  });


  socket.on("handle_stream", 
  data => {
    console.log("handle_stream received...");
    handleStream(socket, cueData);
  });

 

  //THIS SECTION IS FOR TESTING ONLY

//   socket.on("handle_stream", 
//   data => {
//     console.log("handle_stream received");
//   });

//   socket.on("go", () => {
//     socket.emit("stop_media_recorder")
//     socket.emit("processing_results", true);
  
//   });

});


app.use(cors());





//********  DISABLE THIS FOR PRODUCTION ******* */
app.get("/", (req, res) => {
  res.send({ message: "this is the root route" });
});




//********  ENABLE THIS FOR PRODUCTION ******* */
//static files served via express

// app.use(express.static("./dist"));

// //send index.html via express server
// app.get("/about", (req, res) => {
//   res.sendFile(__dirname + "/dist/index.html");
// });
// app.get("/instructions", (req, res) => {
//   res.sendFile(__dirname + "/dist/index.html");
// });

// //this needs a subroute that handles the socket connection

// app.get("/api/endpoint", (req, res) => {
//   res.send({ message: "this is api endpoint" });
// });

server.listen(PORT, function () {
  console.log("Listening on " + server.address().port);
});
