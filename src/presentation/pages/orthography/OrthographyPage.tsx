import React, { useState } from "react";
import {
  GptMessage,
  GptOrthographyMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { orthographyUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const data = await orthographyUseCase(text);
    if (!data.ok) {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo realizar la correccion", isGpt: true },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: data.message,
          isGpt: true,
          info: {
            errors: data.errors,
            message: data.message,
            userScore: data.userScore,
          },
        },
      ]);
    }

    setIsLoading(false);
    //Añadir mensaje de gpt
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola! Soy tu asistente personal, escribi lo que gustes!"></GptMessage>

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptOrthographyMessage
                key={index}
                errors={message.info!.errors}
                message={message.info!.message}
                userScore={message.info!.userScore}
              />
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

      {/* <TextMessageBoxFile
        onSendMessage={(message) => handlePost(message)}
        placeholder="Escribe aqui lo que desees"
      ></TextMessageBoxFile> */}

      {/* <TextMessageBoxSelect
        onSendMessage={(message) => handlePost(message)}
        placeholder="Escribe aqui lo que desees"
        options={[
          { id: "1", text: "Hola" },
          { id: "2", text: "Mundo" },
        ]}
      ></TextMessageBoxSelect> */}
    </div>
  );
};
