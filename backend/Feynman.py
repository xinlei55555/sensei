from transformers import pipeline

# inputs a text/transcript
# Creates a summary under point form, like, as if they were notes.
# Write the subject at the top of a sheet of paper.
# Pretend you are teaching the concept to a child and write an explanation of the concept on the paper.
# If you get stuck, go back to the source material and re-read or re-learn the material until you can complete step two.
# Simplify your explanations and create analogies.
# Organize your notes and explanation, further clarifying the topic until it seems obvious.

# https://huggingface.co/learn/nlp-course/chapter1/3?fw=pt


# separates the paragraph into sentences.
def sentences(transcript):
    return transcript.split(".")


def remove_bad_characters(transcript):
    return transcript.strip("\\\{\}\:\(\)''\"\"")


# summarize the transcript repetitively to get the subject.
def summary(transcript, n, summarizer):
    print(transcript)
    if n == 1:
        return transcript
    else:
        #summarizer returns a list of dictionaries.
        transcript = summarizer(transcript)[0]["summary_text"] 
        return summary(transcript, n-1, summarizer)
    
def Feynman(transcript = "Nothing has been passed!", summarizer = pipeline("summarization"), subjectFinder = pipeline("question-answering")):
    #we have to parse the string and remove all spaces and remove the different corrupted characters
    transcript = remove_bad_characters(transcript)
    paragraph = sentences(transcript)
    summarized = ""

    #generate a subject/title for every 100 words in the notes:
    # subjectFinder =  pipeline("question-answering")
    
    #the number of summarizations depends on the length of the script, and is recursively summarized

    #returns a summarized vesrion of each paragraph, by summarizing each sentence
    subject=subjectFinder(
                    question="Who or what is the main subject of this paragraph?",
                    context=summary(transcript, len(transcript) // 500, summarizer),
                )["answer"]
    point_form=[]
    # summarizer = pipeline("summarization")
    for sentence in paragraph:
        summarized += sentence
        # if len(summarized) > 500:
        #     subject=subjectFinder(
        #             question="Who or what is the main subject of this paragraph?",
        #             context=summary(transcript, len(transcript) // 500, summarizer),
        #         )["answer"]
            
        # summarize three sentences at a time? Or a specific character count at a time?
        if len(summarized) > 350:
            point_form.append(summarizer(summarized)[0]["summary_text"])
            summarized = ""

    
    notes = {"subject": subject, "point_form": point_form}
    
    return notes

# def test(summarizer):
#     print(summarizer("HIHIHIHI, Alright, hello everyone. So my name is Shani and today I'll be testing out our model pen pal which is a certain model that is able to first we're taking a audio recording and then we will be transferring this audio recording into. Um, we set of notes with the main subject, et cetera. So we shall test with the the text I just spoke and we shall see what happens. Let's try."))