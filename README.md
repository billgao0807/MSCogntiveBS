# MSCogntiveBS

Inspiration
As useful as videos are, sometimes it would be much easier if there were a condensed version of it in text. Video or audio files can be lengthy and often contain superfluous information. Imagine being a student and recording video lectures for your classes. Wouldn't it be nice to have something automatically summarize the key points for you? SpeechToSummary attempts to achieve this goal.

What it does
SpeechToSummary takes in speech or an audio file as input, converts it to text using Microsoft's Bing Speech API, then runs a ranking algorithm on the sentences to determine the most relevant content. It then presents a summary of the topics presented in the audio.

How we built it
We used Microsoft's cognitive services. We also implemented some basic heuristics to rank sentences by keyphrases and cues. The program is written in Javascript.

Challenges we ran into
Figuring out the API, getting the speech to text API to separate by sentences, implementing file upload of a .wav audio files.

Accomplishments that we're proud of
Taking care of some optimizations in space and time complexity while figuring out API's, and...the fact that it actually somewhat works.

What we learned
It's actually really easy to use Microsoft's API's once you're set up.

What's next for SpeechToSummary
Future improvements on SpeechToSummary include increasing the maximum file upload size, improving summarization algorithm (look into Lexrank algorithm), and porting the app to different devices (mobile, especially). We would also look into other ways to interact with the information, such as with a bot, and ways to allow the user to customize key topics the program should search for.

