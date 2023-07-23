import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../../assets/animation_lkbovu0f.json";
import downArrowData from "../../assets/downArrow.json";
import schoolStuffData from "../../assets/schoolStuff.json";
import "./Home.css";

const Home = () => {
  const studyAnimationRef = useRef();
  const navigate = useNavigate();
  const scroll = () => {
    const section = document.querySelector("#ok");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div style={{ scrollBehavior: "smooth" }}>
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="home"
      >
        <h1
          style={{
            fontWeight: "bold",
            fontFamily: "Roboto",
            paddingTop: 30,
            fontSize: 100,
            color: "black",
          }}
          data-aos="fade-right"
          data-aos-easing="ease-out"
        >
          Welcome to <span style={{ color: "#edb51a" }}>Classif</span>
          <span style={{ color: "#1f7ede" }}>.ai!</span>{" "}
          <span style={{ textShadow: "1px 1px 1px", color: "black" }}>👋</span>
        </h1>
        <div
          style={{
            alignSelf: "center",
          }}
        >
          <Lottie
            onComplete={() => {
              studyAnimationRef.current.play();
            }}
            onDataReady={() => {
              // studyAnimationRef.current.playSegments([5, 10], true);
            }}
            loop={true}
            initialSegment={[0, 500]}
            lottieRef={studyAnimationRef}
            animationData={animationData}
            style={{ width: 500 }}
          />
        </div>
        <a
          onClick={() => {
            scroll();
          }}
        >
          <div style={{ marginTop: 70 }}>
            <button
              style={{
                backgroundColor: "white",
                borderRadius: 30,
                marginBottom: 10,
                padding: 4,
                boxShadow: "-3px 6px 10px -9px",
              }}
            >
              <p
                style={{ padding: 8, fontWeight: "bold", fontFamily: "Roboto" }}
              >
                Get started!
              </p>
            </button>
            <Lottie
              loop={true}
              animationData={downArrowData}
              style={{ height: 70, marginBottom: 50 }}
            />
          </div>
        </a>
      </div>
      <div id="ok">
        <p
          style={{
            fontWeight: "bold",
            fontFamily: "Roboto",
            paddingTop: 30,
            fontSize: 70,
          }}
          data-aos="fade"
          data-aos-easing="ease-out"
        >
          How can Classif.ai help you today?
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <div className="actions">
            <div className="action">
              <p>Take Notes for My Lecture</p>
              <div>
                <button
                  onClick={() => {
                    navigate("/penpal");
                  }}
                >
                  Summarize with PenPal
                </button>
              </div>
            </div>
            <div className="action">
              <p>Study a Subject</p>
              <div>
                <button>Review with IntelliCards</button>
              </div>
            </div>
            <div className="action">
              <p>Need Some Help</p>
              <div>
                <button>Ask the Sensei</button>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
            data-aos="fade-left"
            data-aos-easing="ease-out"
          >
            <Lottie
              onComplete={() => {
                studyAnimationRef.current.play();
              }}
              onDataReady={() => {
                // studyAnimationRef.current.playSegments([5, 10], true);
              }}
              loop={true}
              animationData={schoolStuffData}
              style={{ width: 350 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
