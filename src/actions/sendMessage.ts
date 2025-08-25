import DOMPurify from "dompurify";
import { useMessagesStore } from "../store/store";

export default async function sendMessage(message: string) {
  const sanitizedMessage = DOMPurify.sanitize(message);
  const userID = 3;
  useMessagesStore.getState().sendMessage({
    message: sanitizedMessage,
    userID,
    date: Date.now(),
    userName: "Andrés",
  });
  if (message.includes("/prompt")) {
    const tempID = Date.now();
    useMessagesStore.getState().sendMessage({
      message: "Thinking...",
      userName: "AI",
      date: tempID,
      userID: 0,
    });
    try {
      const response = await fetch("http://localhost:3000/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: sanitizedMessage }),
      });
      const {answer} = await response.json();
      useMessagesStore.getState().sendMessage({
        message: JSON.parse(answer).answer,
        userName: "AI",
        date: tempID,
        userID: 0,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }
}