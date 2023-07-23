import React, { useState } from "react";
import "./Sensei.css";
import Lottie from "lottie-react";
import loadingBlocks from "../../assets/loadingBlocks.json";
const Sensei = () => {
  const [messages, setMessages] = useState([
    { message: "Hello World ME", sender: "me" },
    { message: "Hello World SENSEI", sender: "sensei" },
  ]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSend = () => {
    setMessages([...messages, { message: msg, sender: "me" }]);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setMsg("");
  };
  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <h1
        style={{
          fontWeight: "bold",
          fontFamily: "Roboto",
          paddingTop: 30,
          padding: 15,
          fontSize: 60,
          color: "black",
        }}
        data-aos="fade-right"
        data-aos-easing="ease-out"
      >
        Introducing the <span style={{ color: "#4287f5" }}>Sensei</span>{" "}
        <span style={{ textShadow: "1px 1px 1px", color: "black" }}>🧑🏼‍🏫</span>
      </h1>
      <p style={{ fontFamily: "Victor Mono" }}>
        Ask any questions to the Sensei about your recording, and he will show
        you the right path!
      </p>

      <p style={{ fontFamily: "Victor Mono" }}>
        Get started by writing a{" "}
        <span style={{ fontWeight: "bold" }}>message.</span>
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="msgHistory">
          {messages.map((msg, idx) => {
            return (
              <div
                key={idx}
                style={{
                  float: msg.sender === "sensei" ? "left" : "right",
                  alignSelf:
                    msg.sender === "sensei" ? "flex-start" : "flex-end",
                  backgroundColor: msg.sender === "me" ? "#121212" : "#d6d6d6",
                  color: msg.sender === "me" ? "white" : "black",
                  clear: msg.sender === "me" ? "left" : "right",
                  padding: 20,
                  margin: 30,
                  borderRadius: "5px",
                  fontFamily: "Roboto",
                }}
              >
                <p>{msg.message}</p>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {isLoading && (
            <Lottie
              loop={true}
              animationData={loadingBlocks}
              style={{ width: 100, alignSelf: "center" }}
            />
          )}
          <div className="messageBox">
            <textarea
              disabled={isLoading}
              className="msgInput"
              placeholder="Write your message..."
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
            />
            <button
              className="sendBtn"
              onClick={handleSend}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {!localStorage.getItem("penpalNotes") && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          LOAD A TRANSCRIPT WITH PENPAL BEFORE USING THIS FUNCTIONALITY
        </p>
      )}
    </div>
  );
};

export default Sensei;
