import styles from './styles.module.scss';

export default function MessageInputBar() {
  return (
    <div className={styles.messageInputBarComponent}>
      <button className={styles.sendMessageButton}>Send</button>
    </div>
  );
}
