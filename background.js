/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_SUMMARY') {
      // Process the message and send a response back if necessary
      // For example:
      const summary = processSummary(message.text);
      sendResponse(summary);
    }
  });
  

let startTime;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'GET_SUMMARY':
      summarizeText(message.text, sendResponse);
      return true;
    case 'GET_SUMMARY_POPUP':
      summarizeText(message.text);
      return true;

    default:
      break;
  }
  if (message.action === 'audioStarted') {
      sendK({ action: 'audioStartedA' });
  }
  if (message.volume !== undefined) {
    sendK({ action: 'volume1',volume:message.volume });
  }
  if (message.action === 'getPlayerTime') {
    const currentTime = Date.now() - startTime;
  //alert(audio.currentTime+" d "+currentTime);
	//sendResponse({ "currentTime":audio.currentTime,"dura":""+audio.duration });
  //sendResponse({ "currentTime":"3","dura":"77" });
  sendK({ action: 'getPlayerTimeA' });
  }
  if (message.action === "play") {
    startTime = Date.now(); 
	console.log('KP');
    //playAudio();
	 sendK({ action: 'playAudio' });
  } else if (message.action === "pause") {
    sendK({ action: 'pauseAudio' });
  } else if (message.action === "next") {
    sendK({ action: 'nextTrack' });
  } else if (message.action === "previous") {
     sendK({ action: 'previousTrack' });
  }else if (message.textToSpeak) {
    chrome.tabs.sendMessage(sender.tab.id, { type:'audioURL',audioURL: message.textToSpeak });
  }
});
 
function sendK(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs && tabs.length > 0) {
    let tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, message); 
  } 
   });//sendResponse({ "currentTime":audio.currentTime,"dura":""+audio.duration });
  }
 
async function summarizeText(text, response = null) {
  const body = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'summarize\n ' + text,
      },
    ],
  };

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization:
        'Bearer nah im good',
    },
    body: JSON.stringify(body),
  };


try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', options);

    const data = await res.json();
    //console.log('Response:', data);
 console.log("BK1"); 
    
      response=data.choices[0].message.content;
   
      if (chrome.tabs && chrome.tabs.query) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			
			
          if (tabs && tabs.length > 0) {
            console.log("BK");
            console.log(tabs);
            chrome.tabs.sendMessage(
              tabs[0].id,
              { type: 'SPEAK', text: data.choices[0].message.content },
              (response) => {
                console.log('Response from content script:', response);
              }
            );
          } else {
            console.error('No active tabs found.');
          }
        });
      } else {
        console.error('chrome.tabs.query is not available.');
      }
    
  } catch (error) {
    console.error('cannot summarize text');
	console.error('Error:', error);
  }


}

/******/ })()
;

 
 



//# sourceMappingURL=background.js.map
