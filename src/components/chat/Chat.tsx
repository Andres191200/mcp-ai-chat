import styles from './styles.module.scss';
import MessageInputBar from '../message-input-bar/MessageInputBar';
import Messages from '../messages/Messages';

export default function Chat() {
  return (
    <div className={styles.chatComponent}>
        <Messages />
        <MessageInputBar />
    </div>
  )
}
