import React from "react";

if ("webkitSpeechRecognition" in window) {
  // Speech Recognition Stuff goes here
  console.log("IT WORKS");
} else {
  console.log("Speech Recognition Not Available");
}
