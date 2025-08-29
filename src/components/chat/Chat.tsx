import styles from "./styles.module.scss";
import MessageInputBar from "../message-input-bar/MessageInputBar";
import Messages from "../messages/Messages";
import { useMessagesStore } from "../../store/store";
import { useState } from "react";

export default function Chat() {
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(message: string) {
    setLoading(true);
    useMessagesStore.getState().sendMessage(message);
    if (message.startsWith("/prompt")) {
      useMessagesStore.getState().addClientMessage();
    }
    setLoading(false);
  }

  return (
    <div className={styles.chatComponent}>
      <Messages />
      <MessageInputBar onSubmit={onSubmit} disabled={loading} />
    </div>
  );
}
