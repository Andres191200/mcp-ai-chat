import styles from "./styles.module.scss";
import MessageInputBar from "../message-input-bar/MessageInputBar";
import Messages from "../messages/Messages";
import sendMessage from "../../actions/sendMessage";
import { sendMessageToDb } from "../../db/db";

export default function Chat() {

  async function onSubmit(message: string) {
    const res = await sendMessage(message);
    const {answer} = await res!.json();
    sendMessageToDb({
      message: JSON.parse(answer).answer,
      userName: "AI",
      date: Date.now(),
      userID: 0,
    });
  }

  return (
    <div className={styles.chatComponent}>
      <Messages />
      <MessageInputBar onSubmit={onSubmit} />
    </div>
  );
}
