from transformers import pipeline
#inputs a text/transcript
    # Creates a summary under point form, like, as if they were notes. 
        #Write the subject at the top of a sheet of paper.
        #Pretend you are teaching the concept to a child and write an explanation of the concept on the paper.
        # If you get stuck, go back to the source material and re-read or re-learn the material until you can complete step two.
        # Simplify your explanations and create analogies.
        # Organize your notes and explanation, further clarifying the topic until it seems obvious.
    
    #https://huggingface.co/learn/nlp-course/chapter1/3?fw=pt
    
#separates the paragraph into sentences.
def sentences(transcript):
    return transcript.split('.')

def remove_bad_characters(transcript):
    return transcript.strip("\\\{\}\:\(\)\'\'\"\"")

#summarize the transcript repetitively to get the subject.
def summary(transcript, n, summarizer):
    print(transcript)
    if(n==1):
        return transcript
    else:
        #summarizer returns a list of dictionaries.
        transcript = summarizer(transcript)[0]["summary_text"] 
        return summary(transcript, n-1, summarizer)
    
def Feynman(transcript = "Nothing has been passed!"):
    #we have to parse the string and remove all spaces and remove the different corrupted characters
    transcript = remove_bad_characters(transcript)

    #generate a title for the notes:
    subjectFinder =  pipeline("question-answering")
    summarizer=pipeline("summarization")
    #the number of summarizations depends on the length of the script, and is recursively summarized
    subject = subjectFinder(question="Who or what is the main subject of this paragraph?", context=summary(transcript, len(transcript)//500, summarizer))['answer']

    #returns a summarized vesrion of each paragraph, by summarizing each sentence
    point_form=[]
    summarizer = pipeline("summarization")
    paragraph = sentences(transcript)
    summarized=""
    for sentence in paragraph:
        summarized+= sentence
        #summarize three sentences at a time? Or a specific character count at a time? 
        if len(summarized)>700: 
            point_form.append(summarizer(summarized)[0]["summary_text"])
            summarized=""
    
    notes = {"subject": subject, "point_form":point_form}
    return notes
