(function() {

    var hostString = "cog-web-wu.azurewebsites.net";
    var appRoot = "cognitive-services";
    var endpoint = "/ws/speechtotextdemo?language=en-US&g_Recaptcha_Response=null&isNeedVerify=false"
    var uri =  `wss://${hostString}/${appRoot}${endpoint}`;

    var speech = new Speech(uri);
    window.textToDisplay = "";

    document.getElementById('toggleMic').addEventListener('click', function(e) {

        if (!speech.isListening) {
            document.body.className = "listening";

            speech.startListening(
                function(partialTxt) {
                    console.log("Parital: " + partialTxt);
                    document.getElementById('outputText').innerHTML = `<span class='full'>${textToDisplay}</span> <span class='partial'>${partialTxt}</span>`;
                },
                function(fullText) {
                    console.log("Full: " + fullText);
                    textToDisplay = `${textToDisplay} ${fullText}`;

                    document.getElementById('outputText').innerHTML =  `<span class='full'>${textToDisplay}</span>`;
                },
                function(err) {
                    document.body.className = "";
                    console.log("Error: " + err);
                }
            );

        } else {
            document.body.className = "";
            speech.stopListening();
        }

    }.bind(this));


})();
