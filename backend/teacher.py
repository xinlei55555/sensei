#question answer model
#https://huggingface.co/docs/transformers/tasks/question_answering

from transformers import pipeline
from datasets import load_dataset
def initialize():
    file=open("openai.key")
    key=file.read()
    print(key)
    file.close()
    openai.api_key = key
    # openai.api_key=os.getenv("OPENAI_API_KEY")
    openai.Model.list()

def callPrompt(prompt):
    response = openai.Completion.create(
        #https://beta.openai.com/docs/models/gpt-3
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
        max_tokens=709,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    return response

def sensei():
    initialize
    prompt = "Answer the following questions" + question+"with the following excerpt:\n " + transcript+". \n"
    callPrompt(prompt)