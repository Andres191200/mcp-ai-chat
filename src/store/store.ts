import { create } from "zustand";
import { sendMessageToDb, type TMessage } from "../db/db";

type TMessagesStore = {
  messages: TMessage[];
  sendMessage: (message: TMessage) => void;
};

export const useMessagesStore = create<TMessagesStore>((set) => ({
  messages: [],
  sendMessage: (message: TMessage) =>{
    set((state: TMessagesStore) => {
        return { messages: [...state.messages, message] };
    });
    sendMessageToDb({ ...message });
  }
}));
