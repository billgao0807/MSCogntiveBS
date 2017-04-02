//content = "I have a dream. Nothing is a dream. I have potatoes, and I love bananas. Fight on!";
function summarizeText() {
    var outputText = document.getElementById("outputText");
    outputText = outputText.childNodes[0];
    var content = outputText.innerHTML;
    // alert(content);
    //alert("button pressed");
    analyzeText(content);
}
