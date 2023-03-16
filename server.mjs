import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleStream } from "./js-backend/googleSpeechAPI.mjs";
import cors from "cors";


import { backendProcess } from './js-backend/backendProcess.js';

const PORT = process.env.PORT || 8080;

const app = express();
const server = createServer(app);


app.use(cors())

const io = new Server(server);


io.on("connection", (socket) => {
  console.log('server side socket id: ', socket.id)
  socket.emit("connection", "connection established")
  socket.on("message", (message) => {
  });

  handleStream(socket);


  // socket.on("incoming_stream", (audio) => {
    // console.log(`stream coming`)
    // handleStream(socket);
    // console.log(audio)

      // })

})

// import fileDirName from './utilities/file-dir-name.mjs';
// const { __dirname, __filename } = fileDirName(import.meta);


// app.use(function (req, res, next) {
//     res.setHeader(
//       'Content-Security-Policy',
//       "default-src 'self'; font-src 'self' https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fCRc4AMP6lbBP.woff2 https://fonts.googleapis.com/ ; img-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css; frame-src 'self';"
//     );
//     next();
//   });

app.use(express.static('./dist'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')})

app.get('/api', (req, res) => { 
  let result = backendProcess('We');
  
  res.send({ "message": result });
});

server.listen(PORT, function () { 

    console.log('Listening on ' + server.address().port);
});