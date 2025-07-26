import styles from './styles.module.scss';


export default function MessageInputBar() {
  return (
    <div className={styles.messageInputBarComponent}>
      <input type="text" className={styles.messageInput} />
      <button className={styles.sendMessageButton}>Send</button>
    </div>
  );
}
