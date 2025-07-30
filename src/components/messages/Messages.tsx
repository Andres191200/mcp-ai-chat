import styles from './styles.module.scss';
import { getMessagesFromDb, type TMessage } from '../../db/db';
import { useEffect, useState } from 'react';
import Message from '../message/Message';

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
            <Message message={message.message} userID={message.userID} />
          )
        })
      }
    </div>
  )
}
