import React, { useEffect, useState } from "react";
import "./PenPal.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SummarizerView = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoadingForMP3, setIsLoadingForMP3] = useState(false);
  const [transcriptValue, setTranscriptValue] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (isRecording) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    } else {
      console.log("STOPPED");
      SpeechRecognition.stopListening();
    }
  }, [isRecording]);
  useEffect(() => {
    setTranscriptValue(transcript);
  }, [transcript]);

  const uploadFile = async (event) => {
    setIsLoadingForMP3(true);
    let file = event.target.files[0];
    console.log(file);
    const encodeFileBase64 = (file) => {
      var reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          var Base64 = reader.result;
          console.log(Base64);
        };
        reader.onerror = (error) => {
          console.log("error: ", error);
        };
      }
    };
    if (file) {
      encodeFileBase64(file);
    }
    setIsLoadingForMP3(false);
  };

  if (!browserSupportsSpeechRecognition && isRecording) {
    return (
      <span>
        Browser doesn't support speech recognition. Please try on another
        browser to access feature
      </span>
    );
  }
  return (
    <div style={{ paddingBottom: "100px" }}>
      <div className="titleContainer">
        <h1
          style={{
            fontWeight: "bold",
            fontFamily: "Roboto",
            padding: 15,
            fontSize: 40,
          }}
        >
          <i style={{ fontFamily: "Victor Mono", fontWeight: "bold" }}>
            PenPal with the Feynman Technique 📝
          </i>{" "}
          <br></br>
          <p style={{ fontSize: 20 }}>
            by <span style={{ color: "#edb51a" }}>Classif</span>
            <span style={{ color: "#1f7ede" }}>.ai</span>
          </p>
        </h1>
      </div>
      <p> </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 30,
          }}
          className="btns-container"
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <label
                className="btn"
                style={{
                  backgroundColor: "#b3d0ff",
                  color: "#113266",
                  borderRadius: 10,
                }}
              >
                <input
                  class="someClass"
                  type="file"
                  name="UploadAudio"
                  accept=".mp3,audio/*"
                  hidden
                  disabled={isLoadingForMP3}
                  onChange={uploadFile}
                />
                {!isLoadingForMP3 ? "Load MP3 File" : "Loading..."}
              </label>
              <button
                className="btn"
                style={{
                  backgroundColor: "#eb3f2f",
                  color: "white",
                  borderRadius: 10,
                }}
                onClick={() => {
                  setIsRecording(!isRecording);
                }}
              >
                {!isRecording ? "Record Voice" : "Stop Recording"}
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: "#0388fc",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                <i style={{ fontFamily: "Victor Mono", fontWeight: "bold" }}>
                  PenPal
                </i>{" "}
                My Notes
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            display: "flex",
            padding: 20,
            gap: 10,
          }}
        >
          <textarea
            style={{ backgroundColor: "#082d54", color: "#ededed" }}
            placeholder="Transcript..."
            onChange={(e) => {
              setTranscriptValue(e.target.value);
            }}
            value={transcriptValue}
          />
          <textarea
            style={{
              fontStyle: "italic",
              fontWeight: "400",
            }}
            placeholder="PenPal..."
            value={""}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default SummarizerView;
