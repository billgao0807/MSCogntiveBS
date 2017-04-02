var apiAddr = "wss://cog-web-wu.azurewebsites.net/cognitive-services/ws/speechtotextdemo?language=en-US&g_Recaptcha_Response=null&isNeedVerify=false";
// this.websocket = new WebSocket(apiAddr);
var websocket = new WebSocket(apiAddr);
function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var f = files[0];

  var reader = new FileReader();

  reader.onload = function(event) {
    // The file's text will be printed here
    // if (event.target.readyState == FileReader.DONE) {
    var inputL = event.target.result;
    var length = Math.floor(inputL.length / 3);
    var result = new Float32Array(length);

    var index = 0,
    inputIndex = 0;

    while (index < length) {
      result[index++] = inputL[inputIndex];
      inputIndex += 3;
    }

    var offset = 0;
    // var buffer = new ArrayBuffer(length * 2);
    var view = new DataView(event.target.result);
    for (var i = 0; i < result.length; i++, offset += 2) {
      var s = Math.max(-1, Math.min(1, result[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    console.log(view)

    sendView(view);
    // }
  };


  function sendView(view) {
    // var apiAddr = "wss://cog-web-wu.azurewebsites.net/cognitive-services/ws/speechtotextdemo?language=en-US&g_Recaptcha_Response=null&isNeedVerify=false";
    // this.websocket = new WebSocket(apiAddr);
    // var websocket = new WebSocket(apiAddr);
    if(websocket.readyState === websocket.OPEN){
      websocket.onclose = function () {}; // disable onclose handler first
      websocket.close();
      document.getElementById('outputText').innerHTML =  '';
    }
    // document.getElementById('outputText').innerHTML =  '';
    textToDisplay = ''
    websocket = new WebSocket(apiAddr);

    websocket.onerror = function (event) {
      this.onerr(event);
      this.stopListening();
    }.bind(this);

    websocket.onopen = function () {
      websocket.send(view);
      console.log('WebSocket Connected')
    }.bind(this);

    websocket.onmessage = function (event) {
      var data = event.data.toString();

      if (data == null || data.length <= 0) {
        return;
      }
      else if (data == "Throttled" || data == "Captcha Fail") {
        console.log(data);
        this.onerr(new Error(data));
        return;
      }
      else {
      }
      if (data == null || data.length <= 0) {
        return;
      }

      var ch = data.charAt(0);
      var message = data.substring(1);
      if (ch == 'e') {
        websocket.onclose = function () {}; // disable onclose handler first
        websocket.close();
      }
      else {
        var text = message;
        if (ch == 'f') {
          console.log("Full: " + text);
          textToDisplay = `${textToDisplay} ${text}`;

          document.getElementById('outputText').innerHTML =  `<span class='full'>${textToDisplay}</span>`;
        }
        else {
          console.log("Parital: " + text);
          document.getElementById('outputText').innerHTML = `<span class='full'>${textToDisplay}</span> <span class='partial'>${text}</span>`;
        }
      }
    }.bind(this);

    // websocket.onclose = function (event) {
    //     this.stopListening();
    // }.bind(this);
  }


  // Read in the image file as a data URL.
  // reader.readAsArrayBuffer(f);
  // for (var i = 0; i < f.size; i++) {
  // var end = 1024<f.size ? 1024:(f.size-1);
  // var blob = f.slice(0, end);
  reader.readAsArrayBuffer(f);
  // }

  // }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
