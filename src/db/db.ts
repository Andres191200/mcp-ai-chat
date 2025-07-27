import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, set } from "firebase/database";

type TMessage = {
  message: string;
  userID: number;
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function sendMessageToDb({ message, userID }: TMessage): Promise<void> {
  console.log('config: ', firebaseConfig);
  try {
    const messagesRef = ref(db, "messages");
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
      message,
      userID,
      timestamp: Date.now(),
    });
    console.log('message sent successfully');
  } catch (error) {
    console.log('THERE WAS AN ERROR: ', error);
  }
}

export { db, sendMessageToDb };
