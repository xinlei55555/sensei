import Logo from "./assets/logo.jpg";
import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./Components/Styling/NavBar";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./routes/Home/Home";
import LoginPage from "./routes/Auth/LoginPage";
import SignupPage from "./routes/Auth/SignupPage";
import Aos from "aos";
import "aos/dist/aos.css";
import SummarizerView from "./routes/PenPal/SummarizerView";
if ("webkitSpeechRecognition" in window) {
  // Speech Recognition Stuff goes here
  console.log("IT WORKS");
} else {
  console.log("Speech Recognition Not Available");
}

function App() {
  const location = useLocation();
  useEffect(() => {
    Aos.init({ duration: 2000 }); //Initialize animation functionality to all components
  }, []);
  return (
    <div className="App">
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/" && <NavBar />}
      {(location.pathname === "/login" || location.pathname === "/signup") && (
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <img src={Logo} style={{ height: 150 }} alt={"logo"} />
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/penpal" element={<SummarizerView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <footer></footer>
    </div>
  );
}

export default App;
