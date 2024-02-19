import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { prosConsUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const result = await prosConsUseCase(text);

    console.log(result);
    if (result.ok) {
      setMessages((prev) => [
        ...prev,
        {
          text: result.content,
          isGpt: true,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo realizar la correccion", isGpt: true },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola! Puedes escribir lo que sea que queiras que compare y te de mis puntos de vista!"></GptMessage>

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in"></TypingLoader>
            </div>
          )}
        </div>
      </div>
      <TextMessageBox
        onSendMessage={(message) => handlePost(message)}
        placeholder="Escribe aqui lo que desees"
        disableCorrection
      ></TextMessageBox>
    </div>
  );
};
