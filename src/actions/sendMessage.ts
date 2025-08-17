import { sendMessageToDb } from "../db/db";
import DOMPurify from "dompurify";

export default async function sendMessage(message: string){
     const sanitizedMessage = DOMPurify.sanitize(message);
    const userID = 3;
    sendMessageToDb({
      message: sanitizedMessage,
      userID,
      date: Date.now(),
      userName: "Andrés",
    });
    if (message.includes("/prompt")) {
      try {
        const response = await fetch("http://localhost:3000/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: sanitizedMessage }),
        });
        return response;
      } catch (error) {
        console.log("error: ", error);
      }
    }
}