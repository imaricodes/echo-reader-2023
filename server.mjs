import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleStream } from "./js-backend/googleSpeechAPI.mjs";
import cors from "cors";

const PORT = process.env.PORT || 8080;

const app = express();
const server = createServer(app);


app.use(cors())

const io = new Server(server);


io.on("connection", (socket) => {
  console.log('server side socket id: ', socket.id)
  socket.emit("connection", "connection established")

  socket.on("send_cueData", (data) => {
    let cueData = {}
    console.log(`cueData received: `, data);
    cueData = { ...data };
    console.log(`cueData spread ${cueData.display}`)
  });

  handleStream(socket);

})

app.use(express.static('./dist'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')})

app.get('/api', (req, res) => { 
  
  res.send({ "message": "this is api endpoint" });
});

server.listen(PORT, function () { 

    console.log('Listening on ' + server.address().port);
});