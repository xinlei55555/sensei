import React, { useState, useRef } from "react";
import Lottie from "lottie-react";
import intelliCardsLogo from "../../assets/IntelliCards-logos.jpeg";
import "./IntelliCards.css";
import loadingBlocks from "../../assets/loadingBlocks.json";
import quizLoading from "../../assets/quizLoading.json";
import arrowUp from "../../assets/arrowUp.png";
import arrowDown from "../../assets/arrowDown.png";

const Intellicards = () => {
  const [isGameMode, setIsGameMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [counter, setCounter] = useState(0);
  const activateGame = async () => {
    setIsLoading(true);
    const body = JSON.parse(localStorage.getItem("penpalNotes"));
    console.log("BODY: ", body);
    const response = await fetch("http://127.0.0.1:5000/flashcards", {
      body: body[0],
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setQuestions(data);
    setTimeout(() => {
      setIsGameMode(true);
      setIsLoading(false);
    }, 3000);
  };
  const getQuestions = () => {};
  if (!isGameMode && !isLoading)
    return (
      <div
        className="inte-card"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 30,
        }}
        data-aos="fade-right"
        data-aos-easing="ease-out"
      >
        <h1
          style={{
            fontWeight: "bold",
            fontFamily: "Roboto",
            paddingTop: 30,

            fontSize: 80,
            color: "black",
          }}
        >
          Test your Knowledge with{" "}
          <p>
            <span style={{ color: "#edb51a" }}>IntelliCards</span>
            <span style={{ textShadow: "1px 1px 1px", color: "black" }}>
              🏆
            </span>
          </p>
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <img
            src={intelliCardsLogo}
            style={{
              width: 300,
              alignSelf: "center",
              padding: 30,
              borderRadius: "50%",
            }}
          />
          <button
            className="start-btn"
            disabled={!localStorage.getItem("penpalNotes")}
            onClick={activateGame}
          >
            Start Studying
          </button>
        </div>
        {!localStorage.getItem("penpalNotes") && (
          <p style={{ color: "red", fontWeight: "bold", padding: 30 }}>
            LOAD A TRANSCRIPT WITH PENPAL BEFORE USING THIS FUNCTIONALITY
          </p>
        )}
      </div>
    );
  else if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: 50,
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: 70, fontFamily: "Roboto" }}>
          Getting Things Ready for You...
        </h2>
        <Lottie
          loop={true}
          animationData={quizLoading}
          style={{ width: 200, marginBottom: 50 }}
        />
      </div>
    );
  else if (isGameMode)
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="quizSection">
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
            }}
          >
            <p
              style={{
                textAlign: "center",
                padding: 20,
                fontWeight: "400",
                fontSize: 20,
              }}
            >
              {counter + 1} / {questions.length}
            </p>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <p style={{ fontWeight: "bold", fontSize: 40 }}>
                    {questions[counter].question}
                  </p>
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: 40,
                    fontFamily: "Victor Mono",
                    fontStyle: "italic",
                  }}
                  className="flip-card-back"
                >
                  <p>{questions[counter].answer}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="scrollingSection">
            <button
              onClick={() => {
                if (counter > 0) {
                  setCounter(counter - 1);
                }
              }}
            >
              <img src={arrowUp} style={{ height: 60, margin: 20 }} />
            </button>
            <button
              onClick={() => {
                if (counter < questions.length - 1) {
                  setCounter(counter + 1);
                }
              }}
            >
              <img src={arrowDown} style={{ height: 60, margin: 20 }} />
            </button>
          </div>
        </div>
      </div>
    );
};

export default Intellicards;
