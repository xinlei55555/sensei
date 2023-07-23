import React, { useEffect, useState } from "react";
import "./PenPal.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SummarizerView = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoadingForMP3, setIsLoadingForMP3] = useState(false);
  const [transcriptValue, setTranscriptValue] = useState("");
  const [penpalValue, setPenPalValue] = useState([
    {
      point_form: [
        "earliest implicit proof by mathematical induction was written by al-Karaji around 1000 AD . he applied it to arithmetic sequences to prove the binomial theorem and properties of Pascal's triangle . al-Samawal al-Maghribi used such an argument to prove result on sums of integral cubes already known to Aryabhata .",
        "al-Karaji's argument includes in essence the two basic components of a modern argument by induction . the truth of the statement for n = 1 (1 = 13) and the deriving of the truth for k from that of n= k - 1 . al-Fakhri is the earliest extant proof of the sum formula for integral cubes .",
      ],
      subject: "Pascal",
    },
  ]);
  const [isLoadingForPenPal, setIsLoadingForPenPal] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    console.log(penpalValue);
    localStorage.setItem("penpalNotes", JSON.stringify(penpalValue));
    console.log(localStorage.getItem("penpalNotes"));
  }, [penpalValue]);
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
        return new Promise((resolve, reject) => {
          reader.readAsDataURL(file);
          reader.onload = function (event) {
            resolve(event.target.result);
          };
          reader.onerror = function (error) {
            reject(error);
          };
        });
      }

      // reader.readAsDataURL(file)
      // return reader.onload();
    };

    if (file) {
      try {
        let Base64 = await encodeFileBase64(file);
        const formData = new FormData();
        formData.append("file", Base64);
        const response = await fetch("http://127.0.0.1:5000/recognizer", {
          body: formData,
          mode: "no-cors",
          method: "POST",
        });
        const data = await response.json();
        setTranscriptValue(data);
      } catch (err) {
        console.log(err);
      }
    }
    setIsLoadingForMP3(false);
  };
  const PenPal = async (transcript) => {
    setIsLoadingForPenPal(true);
    try {
      const body = { transcript: transcriptValue };
      console.log(body);
      const response = await fetch("http://127.0.0.1:5000/penpal", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPenPalValue(data);
      console.log(data);
      localStorage.setItem("penpalNotes", data);
    } catch (err) {
      console.log(err);
    }
    setIsLoadingForPenPal(false);
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
                  accept=".mp3"
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
                  backgroundColor: !isLoadingForPenPal ? "#0388fc" : "black",
                  color: "white",
                  borderRadius: 10,
                }}
                onClick={PenPal}
                disabled={isLoadingForPenPal}
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
          <div
            style={{
              fontStyle: "italic",
              fontWeight: "400",
            }}
            className="textArea"
          >
            {typeof penpalValue === "string"
              ? "PenPal..."
              : penpalValue.map((obj) => {
                  return (
                    <div key={obj.subject}>
                      <p style={{ fontWeight: "bold", fontSize: 20 }}>
                        {obj.subject}
                      </p>
                      <div>
                        {obj.point_form.map((point) => {
                          return (
                            <p style={{ padding: 10, paddingLeft: 10 }}>
                              - {point}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizerView;
// Pascal
//
