#For the flashcards creator, we can use a table question answer model, which takes in a table of questions.abs
    ## not exactly what I want # https://huggingface.co/tasks/table-question-answering

from transformers import pipeline

#first, a model that generates a set of questions to answer
def questionGeneration(transcript = "Nothing has been passed!"):
    #create a 
    pass

#second, a model that asks all the questions and gets the answers.
    #https://huggingface.co/learn/nlp-course/chapter1/3?fw=pt
def questionAnswering():
    question_answer = pipeline("questions-answering")
    answer = questions_answerer(
        question = "What is the number of years the person has worked",
        context = ""
    )
    return answers

def Flashcards(transcript = "Nothing has been passed!"):
    print(questionAnswering())
    return transcript

Flashcards("HI")