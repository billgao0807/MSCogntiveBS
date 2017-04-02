function analyzeText(content) {
    var outputTextBox = document.getElementById("summarize-text-output");
    var params = {
        // Request parameters
        "minDocumentsPerWord": "1",
        "maxDocumentsPerWord": "5",
    };
    var str = "Imagine that you are a gubernatorial candidate who is making education and college preparedness a key facet of your campaign";

    content = content.replace(/["']/g, "");
    alert(content);
    $.ajax({
        dataType: 'json',
        url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","6970ab209fad4df6abdf2c4484e6ec47");
        },
        type: "POST",
        // Request body

        data: "{'documents': [{'language': 'en','id': '1','text': '" + content + "' }]}",
    })
    .done(function(data) {
        alert("success");
        //alert(JSON.stringify(data));
        var keywords = data["documents"][0]["keyPhrases"];

        var i;
        // for(i=0; i<keywords.length; i++) {
        //     alert(keywords[i]);
        // }


        var sentences = sentenceRank(content, keywords);

        var result = "";
        for(i=0; i<sentences.length; i++) {
            result += sentences[i] + "\n";
        }

        //alert(result);
        outputTextBox.innerHTML = result;
    })
    .fail(function() {
        alert("error");
    });
}
