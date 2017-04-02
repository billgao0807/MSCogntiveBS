// textBlock: the entire text in paragraphs separated by \n
// keywords: the array of keywords detected.
// Return array of sentences ranked above average.
function sentenceRank(textBlock, keywords) {
    //var allWords = textBlock.split(" ");
    var allSentences = textBlock.split(".");
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

    // Count occurences of every keyword in sentence.
    // Count occurrences of every keyword in total.
    for(i in allSentences) {
        var sentence = allSentences[i];
        var words = sentence.split(" ");
        for(j in words) {
            var word = words[j];
            var wordL = word.toLowerCase();
            // If is keyword.
            if(wordL in keywordsToValues) {
                // Only create a mapping if the sentence contains a keyword.

                if(!(sentence in sentenceToKeywords)) {
                    sentenceToKeywords[sentence] = {};
                }
                // If keyword not already in the sentenceToKeywords array, create.
                if(!(word in sentenceToKeywords[sentence])) {
                    sentenceToKeywords[sentence][wordL] = 0.0;
                }
                sentenceToKeywords[sentence][wordL]+=1.0;
                keywordsToValues[wordL]+=1.0;
            }
        }
    }

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
    alert("maxscore:"+maxScore);

    var avgScore = totalScore / allSentences.length;

    for(sentence in sentenceToScore) {
        if(sentenceToScore[sentence] >= avgScore) {
            result.push(sentence);
        }
    }

    return result;

}
