import DOMPurify from "dompurify";
import { useMessagesStore } from "../store/store";

export default async function sendMessage(message: string) {
  const sanitizedMessage = DOMPurify.sanitize(message);
  const userID = 3;
  const tempID = Date.now();

  // 1 - SENDING THE USER MESSAGE TO DB
  useMessagesStore.getState().sendMessage({
    message: sanitizedMessage,
    userID,
    date: Date.now(),
    userName: "Andrés",
  });

  // 2 - ASKING LLM TO SAVE ANY PARTICULAR "TOOL" IF MATCHES
      try {
      const response = await fetch("http://localhost:3000/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: sanitizedMessage }),
      });
      const {answer} = await response.json();

      // 4 - WHEN THE LLM RESPONSE IS READY, SEND IT AS A MESSAGE TO THE DB AND THE UI
      useMessagesStore.getState().sendMessage({
        message: JSON.parse(answer).answer,
        userName: "AI",
        date: tempID,
        userID: 0,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  
  // 3 - IF THE USER MESSAGE CONTAINS "/PROMPT", THEN ADD A OPTIMISTIC MESSAGE ON THE CHAT
  if (message.includes("/prompt")) {
    useMessagesStore.getState().sendMessage({
      message: "Thinking...",
      userName: "AI",
      date: tempID,
      userID: 0,
    });
  }
}
