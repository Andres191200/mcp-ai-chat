import styles from './styles.module.scss';
import MessageInputBar from '../message-input-bar/MessageInputBar';
import Messages from '../messages/Messages';
import { db } from '../../db/db';

export default function Chat() {
  const database = db;
  console.log('db: ', database);
  return (
    <div className={styles.chatComponent}>
        <Messages />
        <MessageInputBar />
    </div>
  )
}
