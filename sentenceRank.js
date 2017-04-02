// textBlock: the entire text in paragraphs separated by \n
// keywords: the array of keywords detected.
// Return array of sentences ranked above average.
function sentenceRank(textBlock, keywords) {
    //var allWords = textBlock.split(" ");
    // "1、2、3".split(/(?!、)/g)
    var sentencesAndEndings = textBlock.split(/([.!?]+)/);

    var allSentences = [];

    var regexI = 0;
    for (regexI = 0; regexI < sentencesAndEndings.length - 1; regexI += 2) {
        allSentences.push(sentencesAndEndings[regexI] + sentencesAndEndings[regexI + 1]);
    }

    // var jeffsRes = "";
    // for (i in allSentences) {
    //     jeffsRes += allSentences[i] + "\n";
    // }
    // alert("with endings:");
    // alert(jeffsRes);
    
    var keywordsToValues = [];
    var sentenceToKeywords = {};
    var sentenceToScore = {};
    var result = [];

    // Initialize keyword to values associative array.
    for(i in keywords) {
        var keyword = keywords[i];
        var keyToLower = keyword.toLowerCase();
        keywordsToValues[keyToLower] = 0.0;
    }

    // alert("about to do the craziness");
    // Count occurences of every keyword in sentence.
    // Count occurrences of every keyword in total.
    for(i in allSentences) {
        var sentence = allSentences[i];

        // capture the sentence in lowercase
        var lowerSentence = sentence.toLowerCase();
        // var words = sentence.split(" ");

        // for every keyword
        for(word in keywordsToValues) {
            // form a regular expression to represent the "word" (can be a phrase)
            var regExWord = word.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            // alert("reg ex word:" + regExWord);
            var regEx = new RegExp(word, "g");

            // find the number of occurrences of the word/expression in the sentence (array is null if none found, hence the " || []")
            var count = (lowerSentence.match(regEx) || []).length;

            // If is keyword.
            if(count > 0) {

                // Only create a mapping if the sentence contains a keyword.
                if(!(sentence in sentenceToKeywords)) {
                    sentenceToKeywords[sentence] = {};
                }

                // If keyword not already in the sentenceToKeywords array, create.
                if(!(word in sentenceToKeywords[sentence])) {
                    sentenceToKeywords[sentence][word] = 0.0;
                }

                sentenceToKeywords[sentence][word]+=count;
                keywordsToValues[word]+=count;
            }
        }
    }

    var jeffsRes = "";
    for (word in keywordsToValues) {
        jeffsRes += word + " " + keywordsToValues[word] + "\n";
    }
    alert("keywords to values after all the madness:");
    alert(jeffsRes);

    // Calculate heuristic value of keywords.
    var maxCount = 0.0;
    for(word in keywordsToValues) {
        var value = keywordsToValues[word];
        if(value > maxCount) {
            maxCount = value;
        }
    }

    for(keyword in keywordsToValues) {
        keywordsToValues[keyword] = keywordsToValues[keyword]/maxCount;
    }

    // Calculate score of sentences.
    var totalScore = 0.0;
    var maxScore = 0.0;
    for(sentence in sentenceToKeywords) {
        var keywordsInSentence = sentenceToKeywords[sentence];
        sentenceToScore[sentence] = 0.0;
        for(word in keywordsInSentence) {
            sentenceToScore[sentence] += keywordsToValues[word]*sentenceToKeywords[sentence][word];
        }
        if (sentenceToScore[sentence] > maxScore) {
            maxScore = sentenceToScore[sentence];
        }
        totalScore += sentenceToScore[sentence];
    }
    // alert("maxscore:"+maxScore);

    var avgScore = totalScore / allSentences.length;

    for(sentence in sentenceToScore) {
        if(sentenceToScore[sentence] >= avgScore) {
            result.push(sentence);
        }
    }

    return result;

}
