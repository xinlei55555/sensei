## **Loading time is around  1min 30, in the video, we cut for the purpose of demonstration. You may review the code : ) *

# Classify.ai

A personalized teacher, note-taker and summarizer to accompany all students in their journey to academic and social success!

## Inspiration
With more students touched by ADHD and other concentration problems, the educational system has had difficulty adapting... but we haven't!
## What it does
Inspired by the Feynman method, Classif.ai transcribes, summarizes, and returns a neat point-formatted set of notes, to help YOU study your lectures better!

Introducing... PenPal!

Steps: 
1. Send your audio, it could be an MP3 file, a transcript, OR, you can even LIVE RECORD the lecture you are attending.

2. WAIT a few minutes, and let the magic happen! The transformers on the flask backend are now working hard to transcribe speech to text, and to effectively summarize and reformat YOUR newest lecture notes!


### MOREOVER!
Using the string that were sent through the notes, we are also calling another transformer function, which is able to extract relevant subjects, and creates a set of relevant flashcards, that can be studied!
We call this... Intellicards!
### AND
Why not add another language model that can answer your questions based on the notes that you send in?
Done!

We hope you enjoy the new app!
Enjoy!
## The technologies

Backend models:Many transformer models tested:
1. A question-answering model , that was implemented with the pipeline on hugging face
2. A summarizer model that consists of the distilgpt2, and the summarizer model on pipeline huggingface
3. A speech recognition system
4. A react frontend with flask backend, connected via simple requests in the body of the calls. The model itself receives either a "transcription" or an encoded mp3 or wav video, in bit64. If a video is received, the speech recognition model, implemented with pyaudio, is activated, and returns a transcript in JSON format, before the front end can call for a summarization. (see the React app and speech_rec.py)

## Summarization model thought process:
The summarization is done repetitively.
The transformer returns two elements
1. The main subject of the given transcript/passage. To find the main subject, a summarizer is recursively passed on to the given transcript, to narrow it down, in the same way that in a Convolutional Neural Network, each image is repetitively summarized, our model effectively does the same thing, but with a text, before returning the main subject. __(see Feynman.py)__

2. For the point format summarization, our model runs a sliding window __(see Feynman.py)__. The sliding window feeds in a the text to a summarizer, which is a model that was pretrained by hugging face. The summarizer returns a summary of each parcel of text, and such parcels are reconstitued, and sent back through JSON.

## What's next for Classif.ai
We are also working on implement more language and image recognition models, to be able to read powerpoint lectures, and other blackboards!