import styles from "./styles.module.scss";
import MessageInputBar from "../message-input-bar/MessageInputBar";
import Messages from "../messages/Messages";
import { useState } from "react";
import sendMessage from "../../actions/sendMessage";

export default function Chat() {
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(message: string) {
    setLoading(true);
    const res = await sendMessage(message);
    console.log('OLLAMA RESPONSE: ', res);
    console.log('OLLAMA RESPONSE BODY: ', res?.body);

    setLoading(false);
  }

  return (
    <div className={styles.chatComponent}>
      <Messages />
      <MessageInputBar onSubmit={onSubmit} disabled={loading} />
    </div>
  );
}
