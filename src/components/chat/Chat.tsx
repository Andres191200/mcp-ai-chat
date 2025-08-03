import styles from "./styles.module.scss";
import MessageInputBar from "../message-input-bar/MessageInputBar";
import Messages from "../messages/Messages";
import { sendMessageToDb } from "../../db/db";
import { useState } from "react";

export default function Chat() {
  const [loading, setLoading] = useState<boolean>(false);

  function sendMessage(message: string) {
    const userID = 3;
    setLoading(true);
    sendMessageToDb({ message, userID, date: Date.now(), userName: "Andrés"});
    setLoading(false);

  }

  return (
    <div className={styles.chatComponent}>
      <Messages />
      <MessageInputBar onSendMessage={sendMessage} disabled={loading}/>
    </div>
  );
}
