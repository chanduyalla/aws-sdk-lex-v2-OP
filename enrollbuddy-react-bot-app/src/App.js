import "./App.css";
import Chatbot from "./Chatbot/Chatbot";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [isChatbotClicked, setIsChatbotClicked] = useState(false);
  const toggle = () => {
    setIsChatbotClicked(!isChatbotClicked);
  };
  return (
    <div className="App">
      <h1>This is EnrollBuddy</h1>
      {!isChatbotClicked && (
        <button className="chatbot-icon-button" onClick={toggle}>
          <i className="fa-solid fa-message fa-lg"></i>
        </button>
      )}
      {isChatbotClicked && <Chatbot toggle={toggle} sessionId={uuidv4()}></Chatbot>}
    </div>
  );
}

export default App;
