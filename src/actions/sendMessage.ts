import DOMPurify from "dompurify";
import { useMessagesStore } from "../store/store";

export default async function sendMessage(message: string) {
  const sanitizedMessage = DOMPurify.sanitize(message);
  const userID = 3;

  // 1 - SENDING USER MESSAGE TO DB
  useMessagesStore.getState().sendMessage({
    message: sanitizedMessage,
    userID,
    date: Date.now(),
    userName: "Andrés",
  });

  // 2 - CREATING TEMP MESSAGE FOR OPTIMISTIC UI PURPOSES
  const tempID = Date.now();
  useMessagesStore.getState().sendMessage({
    message: "Thinking...",
    userName: "AI",
    date: tempID,
    userID: 0,
  });
  // 3 - FETCHING THE LLM THROUGH BACKEND
  try {
    const response = await fetch("http://localhost:3000/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: sanitizedMessage }),
    });

    // 4 - GETTING LLM RESPONSE FROM BACKEND
    const { answer } = await response.json();

    // 5 - SENDING MESSAGE TO DB FOR CENTRALIZING PURPOSES
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
