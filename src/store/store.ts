import { create } from "zustand";
import sendMessage from "../actions/sendMessage";
import DOMPurify from "dompurify";
import type { TMessage } from "../models/message";

type TMessagesStore = {
  messages: TMessage[];
  sendMessage: (message: string) => void;
  addClientMessage: (message?: string | null | undefined) => void;
  updateClientMessage: (message: TMessage) => void;
  deleteClientMessage: (message: TMessage) => void;
};

export const useMessagesStore = create<TMessagesStore>(
  (set): TMessagesStore => ({
    messages: [],

    // DATABASE MESSAGE SENDER FUNCTION
    sendMessage: async (message: string) =>{
      const sanitizedMessage = DOMPurify.sanitize(message);
      const userID = 3;
      const messageToDb: TMessage = {
        message: sanitizedMessage,
        userID,
        date: Date.now(),
        username: "Andrés",
      };
      set((state: TMessagesStore) => {
        return {
          messages: [...state.messages, messageToDb],
        };
      });
      await sendMessage(messageToDb);
      
    },

    // CLIENT MESSAGE BECAUSE IT ONLY HAPPENS ON THE CLIENT SIDE, WITHOUT SENDING TO DB (ONLY FOR OPTIMISTIC PURPOSES)
    addClientMessage: (message: string | null | undefined) => {
      const clientMessage = {
        message: message || "Thinking...",
        userID: 1,
        date: Date.now(),
        username: "AI",
      };
      set((state: TMessagesStore) => ({
        messages: [...state.messages, clientMessage],
      }));
      sendMessage(clientMessage);
    },

    // UPDATING MESSAGE ONLY ON THE CLIENT SIDE, NOT DB (ONLY FOR OPTIMISTIC PURPOSES)
    updateClientMessage: (message: TMessage) =>
      set((state: TMessagesStore) => ({
        messages: state.messages.map((msg) => {
          if (msg.date === message.date) {
            return message;
          }
          return msg;
        }),
      })),
    deleteClientMessage: (message: TMessage) =>
      set((state: TMessagesStore) => ({
        messages: state.messages.filter((msg) => msg.date !== message.date),
      })),
  })
);
