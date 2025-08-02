import styles from "./styles.module.scss";
import { getMessagesFromDb, type TMessage } from "../../db/db";
import { useEffect, useRef, useState } from "react";
import Message from "../message/Message";
import CircularSpinnerLoading from "../circularSpinnerLoading/CircularSpinnerLoading";

export default function Messages() {
  const [messages, setMessages] = useState<TMessage[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function scrollToBottom(){
    if(containerRef.current){
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    getMessagesFromDb({
      callback: (messages: TMessage[]) => setMessages(messages),
    });
  }, []);

  return (
    <div className={styles.messagesBoxComponent} ref={containerRef}>
      {!messages ? (
        <div className={styles.loadingContainer}>
          <span>Loading messages...</span>
          <CircularSpinnerLoading />
        </div>
      ) : messages.map((message: TMessage) => {
        return <Message message={message.message} userID={message.userID} />;
      })}
    </div>
  );
}
