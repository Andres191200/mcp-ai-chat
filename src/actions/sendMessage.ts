import type { TMessage } from "../db/db";

export default async function sendMessage(message: TMessage) {
  try {
    await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),

    });
  } catch (error) {
    console.log("error: ", error);
  }
}
