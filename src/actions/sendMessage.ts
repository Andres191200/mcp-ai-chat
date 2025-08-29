import type { TMessage } from "../db/db";

export default async function sendMessage(message: TMessage) {
  try {
    const response = await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    console.log('MENSAJE DEL LLM ENTRANDO...');
    console.log('frontend response: ', response);
    const body = await response.json();
    console.log('response from LLM: ', body);
    //CHECK IF ANSWER FIELD IS NOT EMPTY AND DO ANOTHER REQUEST TO DB TO SHOW LLM RESPONSE ON THE CHAT??
  } catch (error) {
    console.log("error: ", error);
  }
}
