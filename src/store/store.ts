import { create } from "zustand";
import { sendMessageToDb, type TMessage } from "../db/db";

type TMessagesStore = {
  messages: TMessage[];
  sendMessage: (message: TMessage) => void;
};

export const useMessagesStore = create<TMessagesStore>((set) => ({
  messages: [],
  sendMessage: (message: TMessage) => {
    set((state: TMessagesStore) => {
      return { messages: [...state.messages, message] };
    });
    sendMessageToDb({ ...message });
  },
  // CLIENT MESSAGE BECAUSE IT ONLY HAPPENS ON THE CLIENT SIDE, WITHOUT SENDING TO DB
  addClientMessage: (message: TMessage) => {
    set((state: TMessagesStore) => ({
      messages: [...state.messages, message],
    }));
  },
  updateClientMessage: (message: TMessage) =>
    set((state: TMessagesStore) => ({
        messages: state.messages.map((msg) => {
            if (msg.date === message.date) {
                return message;
            }
            return msg;
        })
    }))
}));
