import styles from "./styles.module.scss";
import MessageInputBar from "../message-input-bar/MessageInputBar";
import Messages from "../messages/Messages";
import sendMessage from "../../actions/sendMessage";

export default function Chat() {
  async function onSubmit(message: string) {
    await sendMessage(message);
  }

  return (
    <div className={styles.chatComponent}>
      <Messages />
      <MessageInputBar onSubmit={onSubmit} />
    </div>
  );
}
