import { create } from "zustand";
import { type TMessage } from "../db/db";
import sendMessage from "../actions/sendMessage";
import DOMPurify from "dompurify";

type TMessagesStore = {
  messages: TMessage[];
  sendMessage: (message: string) => void;
  addClientMessage: (message: TMessage) => void;
  updateClientMessage: (message: TMessage) => void;
  deleteClientMessage: (message: TMessage) => void;
};

export const useMessagesStore = create<TMessagesStore>(
  (set): TMessagesStore => ({
    messages: [],

    // DATABASE MESSAGE SENDER FUNCTION
    sendMessage: (message: string) => {
      const sanitizedMessage = DOMPurify.sanitize(message);
      const userID = 3;
      const messageToDb:TMessage = {
              message: sanitizedMessage,
              userID,
              date: Date.now(),
              userName: "Andrés",
            };
      set((state: TMessagesStore) => {
        return {
          messages: [
            ...state.messages,
            messageToDb,
          ],
        };
      });
      // sendMessageToDb({ ...message });
      sendMessage(messageToDb);

      //CHECK IF MESSAGE CONTAINS "/PROMPT" HERE?
    },

    // CLIENT MESSAGE BECAUSE IT ONLY HAPPENS ON THE CLIENT SIDE, WITHOUT SENDING TO DB (ONLY FOR OPTIMISTIC PURPOSES)
    addClientMessage: (message: TMessage) => {
      set((state: TMessagesStore) => ({
        messages: [...state.messages, message],
      }));
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
