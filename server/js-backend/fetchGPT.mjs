import { chatGPTData } from "../js-backend/ChatGPT.mjs";

export async function fetchGPT(sessionResult) {
  try {
    let chatGPTAnalysis = await chatGPTData(sessionResult);
    console.log(`chatGPTAnalysis: ${chatGPTAnalysis}`);
    return chatGPTAnalysis;
    //   socket.emit("chatGPT_response", { chatGPTAnalysis });
  } catch (error) {
    console.log(`chatGPT in fetchGPT.mjs error: ${error}`);
    //   socket.emit("chatGPT_error", "ChatGPT is busy right now");
    return "ChatGPT is busy right now";
    //   socket.emit("chatGPT_error", "ChatGPT is busy right now");
   
  }
}
