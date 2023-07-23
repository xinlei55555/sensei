#For the flashcards creator, we can use a table question answer model, which takes in a table of questions.abs
    ## not exactly what I want # https://huggingface.co/tasks/table-question-answering

from transformers import pipeline
# from the_question_list import returnQuestions

#first, a model that generates a set of questions to answer
def questionGeneration(transcript = "Nothing has been passed!"):
    #create a 
    pass

#second, a model that asks all the questions and gets the answers.
    #https://huggingface.co/learn/nlp-course/chapter1/3?fw=pt
def questionAnswering(subject, notes, question_answerer):
    # question_answer = pipeline("question-answering")
    questions = []
    answers = []
    i=0
    for paragraph in notes:
        sub = subject[i]
        ask =f"What does {sub} represent?" 
        answer = question_answerer(
            question = ask,
            context = paragraph
        )
        answers.append(answer)
        questions.append(ask)
        i+=1
        
    return {"questions":questions, "answers":answers}

def Flashcards(subject = ["Nothing has been passed!"], notes = ["hi"], summarizer = pipeline("summarization"), qna = pipeline("question-answering")):
    cards = questionAnswering(subject, notes, qna)
    print(cards)
    return cards 

Flashcards("HI")