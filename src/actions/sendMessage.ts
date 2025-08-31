import type { TMessage } from "../db/db";
import { useMessagesStore } from "../store/store";

export default async function sendMessage(message: TMessage) {
  try {
    const response = await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    const body = await response.json();
    const answer = body.answer;
    if(answer){
      // IF THERE IS ANY LLM RESPONSE, DISPLAY IT ON THE CHAT
      useMessagesStore.getState().addClientMessage(answer);
    }
    //CHECK IF ANSWER FIELD IS NOT EMPTY AND DO ANOTHER REQUEST TO DB TO SHOW LLM RESPONSE ON THE CHAT??
  } catch (error) {
    console.log("error: ", error);
  }
}
