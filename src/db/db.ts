import { initializeApp } from "firebase/app";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  type Unsubscribe,
} from "firebase/database";
import type { TMessage } from "../models/message";

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

async function sendMessageToDb({ message, userID, date, username }: TMessage): Promise<void> {
  try {
    const messagesRef = ref(db, "messages");
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
      message,
      userID,
      username,
      timestamp: date,
      date,
    });
  } catch (error) {
    console.log("THERE WAS AN ERROR: ", error);
  }
}

function getMessagesFromDb({
  callback,
}: {
  callback: (messages: TMessage[]) => void;
}): Unsubscribe {
  const messagesRef = ref(db, "messages");

  const unsubscribe = onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      return callback([]);
    }
    const parsedMessages = Object.values(data) as TMessage[];

    return callback(parsedMessages);
  });
  return unsubscribe;
}

export { db, sendMessageToDb, getMessagesFromDb };
export type { TMessage };
