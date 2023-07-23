from flask import Flask, request, jsonify
from Feynman import Feynman 
from flask_cors import CORS

# from flashcards import Flashcards
from speech_rec import decodebase64
#using json files:

#app is taking the name of __name__, which is any name
app = Flask(__name__)
CORS(app)

#remember that @app.route is a decorator that makes the function hello_world() run inside the function @app.route()
@app.route("/")
def hello_world():
    return "Hi"

@app.route("/login")
def login():
    pass

@app.route("/recognizer", methods=['POST'])
def speechTranscription():   
    json=request.get_json()
    print(json)
    file = json["file"] 
    return decodebase64(file, type="mp3") 

#rest api.
@app.route("/penpal", methods=['POST'])
def second_page():
    # transcript = request.form["transcript"]
    # instead of doing this, since aly is not happy, I will be taking in the body of the request, which is a json
    json = request.get_json()
    # file_type = json["file_type"]

    # if file_type == "text":
    transcript = json["transcript"]

    # elif file_type == "wav" or file_type == "mp3":
    #     transcript = speechTranscription(json["transcript"])

    return jsonify(Feynman(transcript))

@app.route("/flashcards")
def third_page():
    # transcript = request.args.get("transcript")

    #extracts the json from the body of the POST
    transcript = request.get_json()
    return Flashcards(transcript)

if __name__ == '__main__':
    app.run(debug=True)

