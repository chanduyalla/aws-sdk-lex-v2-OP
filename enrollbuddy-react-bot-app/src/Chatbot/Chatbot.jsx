import React, { useState,useEffect, useRef } from "react";
import lexRuntimeV2 from "../aws-config";
import "./Chatbot.css";

const Chatbot = ({toggle, sessionId}) => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const lastMessageRef = useRef(null);
  const handleSubmit = async (e, inputMessage = input) => {
    e.preventDefault();
    const newUserMessage = {
      messages: [
        {
          contentType: "PlainText",
          content: inputMessage,
        },
      ],
      isUser: true,
    };
    setChatHistory([...chatHistory, newUserMessage]);
    try {
      const botResponse = await lexRuntimeV2
        .recognizeText({
          botId: process.env.REACT_APP_BOT_ID,
          botAliasId: process.env.REACT_APP_BOT_ALIAS_ID,
          localeId: process.env.REACT_APP_LOCALE_ID,
          sessionId: sessionId,
          text: inputMessage,
        })
        .promise();
      const botResponseMessage = {
        messages: botResponse.messages,
        isUser: false,
      };
      setChatHistory([...chatHistory, newUserMessage, botResponseMessage]);
      setInput("");
    } catch (error) {
      console.error("Error sending message to Lex:", error);
    }
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="chatBot">
      <div className={`chatBotHeader`}>
        <span>Enroll Buddy</span>
        <button onClick={toggle}>X</button>
      </div>
      <ChatHistory
        chatHistory={chatHistory}
        handleSubmit={handleSubmit}
        lastMessageRef={lastMessageRef}
      ></ChatHistory>
      <form className="chatForm" onSubmit={handleSubmit}>
        <input
          placeholder="Type a message"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const ChatHistory = ({ chatHistory, handleSubmit, lastMessageRef }) => {
  return (
    <div className={`chatHistory`} ref={lastMessageRef}>
      {chatHistory.map((each, index) =>
        each.messages.map((message, msgIndex) => (
          <div
            key={`${index}-${msgIndex}`}
            className={`chatBubble ${each.isUser ? "user" : "bot"}`}
          >
            {message.contentType === "PlainText" && (
              <div>{message.content}</div>
            )}
            {message.contentType === "ImageResponseCard" && (
              <div className="imageResponseCard">
                {message.imageResponseCard.imageUrl && (
                  <img
                    src={message.imageResponseCard.imageUrl}
                    alt={`Response card for ${message.imageResponseCard.title}`}
                  />
                )}
                <div className="title">{message.imageResponseCard.title}</div>
                <div className="subtitle">
                  {message.imageResponseCard.subtitle}
                </div>
                <div>
                  {message.imageResponseCard.buttons.map(
                    (button, buttonIndex) => (
                      <div key={buttonIndex}>
                        <button
                          value={button.value}
                          onClick={(e) => handleSubmit(e, button.value)}
                        >
                          {button.text}
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Chatbot;
