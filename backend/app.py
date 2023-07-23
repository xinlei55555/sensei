from flask import Flask, request, jsonify
<<<<<<< HEAD
from Feynman import Feynman 
from transformers import pipeline
=======
from Feynman import Feynman

>>>>>>> faabf899947000bf7eba0d9b821ef5d02f7c553a
# from flask_cors import CORS
# from flashcards import Flashcards
# from speech_recognition import decodebase64
# using json files:

# using json files:

# app is taking the name of __name__, which is any name
app = Flask(__name__)
# CORS(app)

<<<<<<< HEAD
def initialize():
    qna = pipeline("question-answering")
    summarizer = pipeline("summarizer") 
summarizer, qna = initialize()

#remember that @app.route is a decorator that makes the function hello_world() run inside the function @app.route()
=======

# remember that @app.route is a decorator that makes the function hello_world() run inside the function @app.route()
>>>>>>> faabf899947000bf7eba0d9b821ef5d02f7c553a
@app.route("/")
def hello_world():
    return "Hi"


@app.route("/login")
def login():
    pass


@app.route("/recognizer", methods=["POST"])
def speechTranscription():
    return decodebase64(request.form["file"], type="wav")


# rest api.
@app.route("/penpal", methods=["POST"])
def second_page():
     # #!accessing the global variable
    summarizer = globals()["summarizer"]
    qna = globals()["qna"]

    # transcript = request.form["transcript"]
    # instead of doing this, since aly is not happy, I will be taking in the body of the request, which is a json
    json = request.get_json()
    # file_type = json["file_type"]

    # if file_type == "text":
    transcript = json["transcript"]

    # elif file_type == "wav" or file_type == "mp3":
    #     transcript = speechTranscription(json["transcript"])

    return jsonify(Feynman(transcript, summarizer, qna))


@app.route("/flashcards")
def third_page():
    # transcript = request.args.get("transcript")

    # extracts the json from the body of the POST
    transcript = request.get_json()
    return Flashcards(transcript)

<<<<<<< HEAD
if __name__ == '__main__':
    #!aly wants me to initialize the variables WHEN the backend loads, so that running the summarizer doesn't take as long
    initialize()
    app.run(debug=True)
=======
>>>>>>> faabf899947000bf7eba0d9b821ef5d02f7c553a

if __name__ == "__main__":
    app.run(debug=True)
