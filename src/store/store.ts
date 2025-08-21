import { create } from "zustand";
import { sendMessageToDb, type TMessage } from "../db/db";

type TMessagesStore = {
  messages: TMessage[];
  sendMessage: (message: TMessage) => void;
  addClientMessage: (message: TMessage) => void;
  updateClientMessage: (message: TMessage) => void;
  deleteClientMessage: (message: TMessage) => void;
};

export const useMessagesStore = create<TMessagesStore>((set):TMessagesStore => ({
  messages: [],

  // DATABASE MESSAGE SENDER FUNCTION
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

  // UPDATING MESSAGE ONLY ON THE CLIENT SIDE, NOT DB
  updateClientMessage: (message: TMessage) =>
    set((state: TMessagesStore) => ({
        messages: state.messages.map((msg) => {
            if (msg.date === message.date) {
                return message;
            }
            return msg;
        })
    })),
    deleteClientMessage: (message: TMessage) =>
    set((state: TMessagesStore) => ({
        messages: state.messages.filter((msg) => msg.date !== message.date)
    })),

}));
