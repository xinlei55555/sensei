import base64
import speech_recognition as sr
    # sample_string = sample_string_bytes.decode("ascii")
# https://realpython.com/python-speech-recognition/
def transcribeAudio(file_name):
    r=sr.Recognizer()
    harvard = sr.AudioFile(file_name)
    with harvard as source:
        audio = r.record(source)
    
    return r.recognize_google(audio)

def decodebase64(video_string, type):
    #decoding base 64:
    # https://www.geeksforgeeks.org/encoding-and-decoding-base64-strings-in-python/
    # https://stackoverflow.com/questions/50279380/how-to-decode-base64-string-directly-to-binary-audio-format
    sample_string_bytes = base64.b64decode(video_string)
    audio_file = open(f"/Users/aly/Documents/Programming/Hackathons/TechXccelerate/Classify.ai/backend/test.{type}", "wb")
    audio_file.write(sample_string_bytes)
    
    return transcribeAudio(f"backend/test.{type}")

# print(decodebase64())
#pass the folder and the file, not just the file!!!
# print(transcribeAudio(r"backend/harvard.wav"))
