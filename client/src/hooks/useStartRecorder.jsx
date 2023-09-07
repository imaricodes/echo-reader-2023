import { useState } from "react";
import { socket } from "../socketIO/socket-service";

const getUserMediaConstraints = {
  audio: {
    channelCount: 1,
    sampleRate: 16000,
  },
  video: false,
};

const useStartRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);

  const reader = new FileReader();
  let base64data;

  const sendRecorderDataWhenAvailable = (e) => {
    if (MediaRecorder) {
      reader.readAsDataURL(e.data);
      reader.onload = () => {
        base64data = reader.result.split("base64,")[1];
        // console.log(`base.64 ${base64data}`)
        socket.emit("stream", base64data);
      };
    }
  };

  const startRecorder = async () => {
    console.log("startRecorder called");
    // socket.emit("handle_stream", "handle stream from client use Start hook");

    let startTime = Date.now();
    socket.emit("recorder_start", startTime);

    try {
      let mediaRecorderOptions = {};

      if (MediaRecorder.isTypeSupported("audio/webm; codecs=opus")) {
        mediaRecorderOptions = { mimeType: "audio/webm; codecs=opus" };
      } else if (MediaRecorder.isTypeSupported("video/mp4")) {
        mediaRecorderOptions = { mimeType: "video/mp4" };
      }

      await navigator.mediaDevices
        .getUserMedia(getUserMediaConstraints)
        .then((stream) => {
          let mediaRecorder = new MediaRecorder(stream, mediaRecorderOptions);

          mediaRecorder.ondataavailable = sendRecorderDataWhenAvailable;

          mediaRecorder.start(250);

          socket.on("stop_media_recorder", () => {
            setIsRecording(false);
            socket.emit("media_recorder_state", "stopped");
            //TODO: this fires 2 extra times. Why? Receiving "stop_media_recorder" 3 times
            console.log("media recorder stop received from server");
            if (mediaRecorder.state !== "inactive") {
              mediaRecorder.pause();
            }
          });
        });
    } catch (error) {
      console.log("navigator error: ", error);
    }
  };

  return { isRecording, setIsRecording, startRecorder };
};

export default useStartRecorder;
