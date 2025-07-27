import styles from './styles.module.scss';
import MessageInputBar from '../message-input-bar/MessageInputBar';
import Messages from '../messages/Messages';
import { db } from '../../db/db';

function sendMessage(message:string){
  // CALL DB
  console.log('message from chat component: ', message);
}

export default function Chat() {
  const database = db;
  console.log('db: ', database);
  return (
    <div className={styles.chatComponent}>
        <Messages />
        <MessageInputBar onSendMessage={sendMessage}/>
    </div>
  )
}
