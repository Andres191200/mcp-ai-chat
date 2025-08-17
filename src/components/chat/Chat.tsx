import styles from "./styles.module.scss";
import MessageInputBar from "../message-input-bar/MessageInputBar";
import Messages from "../messages/Messages";
import { useState } from "react";
import sendMessage from "../../actions/sendMessage";
import { sendMessageToDb } from "../../db/db";

export default function Chat() {
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(message: string) {
    setLoading(true);
    const res = await sendMessage(message);
    const {answer} = await res!.json();
    console.log('parsedRes_2: ', JSON.parse(answer));
    sendMessageToDb({
      message: JSON.parse(answer).answer,
      userName: "AI",
      date: Date.now(),
      userID: 0,
    });
    
    setLoading(false);
  }

  return (
    <div className={styles.chatComponent}>
      <Messages />
      <MessageInputBar onSubmit={onSubmit} disabled={loading} />
    </div>
  );
}
