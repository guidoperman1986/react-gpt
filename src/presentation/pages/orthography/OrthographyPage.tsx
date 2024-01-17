import React, { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TextMessageBoxFile,
  TextMessageBoxSelect,
  TypingLoader,
} from "../../components";

interface Message {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    // Todo useCase call

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
              <GptMessage key={index} text="Esto es de openAi" />
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
