import React, { useState } from 'react';
import styles from './styles.module.scss';

export default function Input() {
  const [message, setMessage] = useState<string>('');
  return (
    <div className={styles.inputComponent}>
      <input type="text" className={styles.messageInput} onChange={() => setMessage(message)} value={message}/>
    </div>
  )
}
