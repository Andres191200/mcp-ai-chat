import styles from './styles.module.scss';
import { getMessagesFromDb, type TMessage } from '../../db/db';
import { useEffect, useState } from 'react';

export default function Messages() {
  const [messages, setMessages] = useState<TMessage[]>([]);

  useEffect(() => {
    getMessagesFromDb({callback: (messages:TMessage[]) => setMessages(messages)});
  },[]);
  
  return (
    <div className={styles.messagesBoxComponent}>
      {
        messages.map((message:TMessage) => {
          return (
            <div className="messageContainer">
              <h3>Message: {message.message}</h3>
              <p>User: {message.userID}</p>
            </div>
          )
        })
      }
    </div>
  )
}
