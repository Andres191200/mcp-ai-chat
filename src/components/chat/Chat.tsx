import styles from "./styles.module.scss";
import MessageInputBar from "../message-input-bar/MessageInputBar";
import Messages from "../messages/Messages";
import { sendMessageToDb } from "../../db/db";
import { useState } from "react";
import DOMPurify from "dompurify";

export default function Chat() {
  const [loading, setLoading] = useState<boolean>(false);

  async function sendMessage(message: string) {
    const sanitizedMessage = DOMPurify.sanitize(message);
    const userID = 3;
    setLoading(true);
    sendMessageToDb({
      message: sanitizedMessage,
      userID,
      date: Date.now(),
      userName: "Andrés",
    });
    if (message.includes("/prompt")) {
      try {
        await fetch("http://localhost:3000/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: sanitizedMessage }),
        });
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  return (
    <div className={styles.chatComponent}>
      <Messages />
      <MessageInputBar onSendMessage={sendMessage} disabled={loading} />
    </div>
  );
}
