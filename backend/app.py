from flask import Flask, request, jsonify
from Feynman import Feynman
from transformers import pipeline
from flask_cors import CORS
from flashcards import Flashcards
# from speech_recognition import decodebase64
# using json files:

# using json files:

# app is taking the name of __name__, which is any name
app = Flask(__name__)
#!somehow this is important, because penpal isn't able to send the notes
CORS(app)

def initialize():
    qna = pipeline("question-answering")
    summarizer = pipeline("summarization") 
    return summarizer, qna

summarizer, qna = initialize()
# test(summarizer)
test = "hello"
#remember that @app.route is a decorator that makes the function hello_world() run inside the function @app.route()
@app.route("/")
def hello_world():
    test = globals()["test"]
    return test


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

    # transcript = request.form["transcript"]
    # instead of doing this, since aly is not happy, I will be taking in the body of the request, which is a json
    json = request.get_json()
    # file_type = json["file_type"]

    # if file_type == "text":
    transcript = json["transcript"]
    print("_"*500, transcript)
    # elif file_type == "wav" or file_type == "mp3":
    #     transcript = speechTranscription(json["transcript"])

    summarizer = globals()["summarizer"]
    qna = globals()["qna"]
    paragraph= Feynman(transcript, summarizer, qna)
    print(paragraph)
    return jsonify(paragraph)


@app.route("/flashcards", methods = ["POST"])
def third_page():
    paragraph = request.get_json()
    # extracts the json from the body of the POST
    
    #subject is the list of subjects from penpal
    #notes is the list of notes from penpal
    subject = paragraph["subject"]
    notes = paragraph["notes"]

    qna = globals()["qna"]
    summarizer = globals()["summarizer"]
    #! returns a dictionary {"questions": list_of_questions, "answers": list_of_answers}
    return jsonify(Flashcards(subject, notes, summarizer, qna))

if __name__ == '__main__':
    #!aly wants me to initialize the variables WHEN the backend loads, so that running the summarizer doesn't take as long
    initialize()
    app.run(debug=True)
