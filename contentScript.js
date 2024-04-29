/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components.css":
/*!****************************!*\
  !*** ./src/components.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components.js":
/*!***************************!*\
  !*** ./src/components.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayAudioText: () => (/* binding */ displayAudioText),
/* harmony export */   displayReadyAudioBtn: () => (/* binding */ displayReadyAudioBtn)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _components_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components.css */ "./src/components.css");



const dwsvg = `<svg fill="#000000" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 29.978 29.978" xml:space="preserve">
<g>
	<path d="M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012
		v-8.861H25.462z"/>
	<path d="M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723
		c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742
		c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193
		C15.092,18.979,14.62,18.426,14.62,18.426z"/>
	  <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g>
</svg>`;
const playsvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`;

function displayReadyAudioBtn(callback) {
  let holder = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    id: 'tts-extension-holder',
    innerHTML: `Document Summarized!`,
  });
  
  
  let playBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tag: 'button',
    id: 'tts-extension-btn',
    innerHTML: playsvg,
    append: holder,
  });
  
  chrome.storage.local.get(['paid'], (res) => {
  
if(res.paid=="pdi"){

  
   let dwBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tag: 'button',
    id: 'tts-extension-dw-btn',
    innerHTML: dwsvg,
    append: holder,
}); dwBtn.addEventListener('click', speakDwn);}
  });
 
  playBtn.addEventListener('click', playDoc);
   function dwd(e) {
    callback(e);
    //holder.remove();
  }function speakDwn(e) { 
  let options = _utils__WEBPACK_IMPORTED_MODULE_0__.initialOptions;
  const showSummaryText = options?.download;
 
  if (showSummaryText) {}

chrome.storage.local.get(['spekdwn'], (res) => {
  //console.log(res.spekdwn);
  //alert(res.spekdwn) 
//chrome.runtime.sendMessage({ textToSpeak: res.spekdwn });
 TextDownload(res.spekdwn);
});
	  
}

async function TextDownload(text) {
  const urlApi = 'https://text2wav1.p.rapidapi.com/textToSpeechMem?phrase=' + encodeURIComponent(text) + '&voice=female';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c9f834b766msh742373d3c43ab70p1a6404jsn6f260a8da0bc',
      'X-RapidAPI-Host': 'text2wav1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(urlApi, options);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'audio.mp3';

    downloadLink.click();
 
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Errordownloading:', error);
  }
}
 

  function playDoc(e) {
    callback(e);
    //holder.remove();
  }
  document.body.append(holder);

  setTimeout(() => {
    //holder.remove();
  }, 20000);
}

function displayAudioText(text) {
  let holder = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    id: 'tts-extension-holder',
    textContent: text,
    append: document.body,
  });
  return holder;
}


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   initialOptions: () => (/* binding */ initialOptions)
/* harmony export */ });
const initialOptions = {
  lang: 'en',
  pitch: 1,
  rate: 1,
  voice: 1,
  volume: 1,
  showSummary: false,
};

function createElement({ tag = 'div', append = null, ...props }) {
  let e = document.createElement(tag);

  for (let key in props) {
    e[key] = props[key];
  }

  if (append) append.append(e);

  return e;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/contentScript.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ "./src/components.js");



let voices = [];
const speech = new SpeechSynthesisUtterance();
let options = _utils__WEBPACK_IMPORTED_MODULE_0__.initialOptions;
let audioText;

chrome.storage.local.get(['options'], (res) => {
  //console.log(res);
  if (res?.options) {
    options = res.options;
  }
});
chrome.storage.onChanged.addListener((changes) => {
  console.log(changes);
  if (changes?.options?.newValue) {
    options = changes.options.newValue;
  }
});

function speak(text) {
  // Implement your speak function logic here
  console.log("Speaking:", text);
  // For example, you might use the Web Speech API
  // but ensure the necessary permissions are declared in your manifest.json
  // const utterance = new SpeechSynthesisUtterance(text);
  // speechSynthesis.speak(utterance);
}

//* run speech command (double shift)
let commandTriggerCount = 0;
function checkKey(e) {
  //* Shift button will trigger the translation process;
  if (e.keyCode === 16) { // Check if the keycode is the shift key
    if (commandTriggerCount == 0) {
      commandTriggerCount++;
      return;
    }

    commandTriggerCount = 0;
    chrome.runtime.sendMessage(
      { type: 'GET_SUMMARY', text: window.getSelection().toString() },
      function(response) { // Change the arrow function to a traditional function
        console.log(response);
        speak(response);
      }
    );
  }
}



// SPEECH FUNCTIONS
function speak(text) {
  updateOptions(options);
  const showSummaryText = options?.showSummary;

  if (showSummaryText) {
    console.log('should show summary');
    audioText = (0,_components__WEBPACK_IMPORTED_MODULE_1__.displayAudioText)(text);
    speech.addEventListener('end', () => {
      audioText.remove();
    });
  }

  if (speechSynthesis.paused) {
    speechSynthesis.resume();
  }

  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
  speech.text = text;
  speechSynthesis.speak(speech);
  console.log(speechSynthesis.speaking);
}
function togglePause() {
  if (speechSynthesis.paused) {
    speechSynthesis.resume();
  } else {
    speechSynthesis.pause();
  }
}
function cancelCurrentSpeech() {
  speechSynthesis.cancel();
}
let startTime ;
// REALTIME MESSAGING HANDLING
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	//alert(sender.id)
  switch (request.type) {
    case 'SPEAK':
      console.log(request.text);chrome.storage.local.set({'spekdwn': request.text});
      (0,_components__WEBPACK_IMPORTED_MODULE_1__.displayReadyAudioBtn)(() => speak(request.text));
	   
      

      // You can send a response back to the background script if needed
      sendResponse({ response: 'Message received successfully!' });
      break;
    case 'TOGGLE_PAUSE':
      togglePause();
      break;
    case 'STOP':
      cancelCurrentSpeech();
      break;
 case 'audioURL':
   alert();
    const link = document.createElement('a');
    link.href = request.audioURL;
    link.download = 'audio.mp3';
    link.click();
    URL.revokeObjectURL(link.href);
   
  break;
    default:
      break;
  } if (request.action === 'playAudio') {
	  playAudio();
  } else if (request.action === 'pauseAudio') {
    pauseAudio();
  } else if (request.action === 'nextTrack') {
    nextTrack();
  } else if (request.action === 'previousTrack') {
    previousTrack();
  } if (request.action === 'audioStarted') {
    startTime = Date.now(); 
  }if (request.action === 'volume1') {let volume = parseFloat(request.volume); 
    audio.volume = volume; }
  if (request.action === 'getPlayerTimeA') {
    const currentTime = Date.now() - startTime;
    chrome.runtime.sendMessage(
    {  action: "timeup" ,"currentTime":audio.currentTime,"dura":""+audio.duration}); 
  }
});
 

let audio = new Audio();
let playlist = ["audio/1.mp3", "audio/2.mp3", "audio/3.mp3"];
let currentTrackIndex = 0;

function playAudio() {
  if (!audio.paused) {
    audio.pause();
  }
 
  audio.src = chrome.runtime.getURL(playlist[currentTrackIndex]);
  //audio.muted=true;
  audio.play().catch(function(error) {
	  if (error.name === 'NotAllowedError') { 
      //alert('Please interact with the document to enable audio playback.');
	  var adbr = document.createElement('div');
	  adbr.id = 'adbr';adbr.style.cssText = 'position: fixed; top: 20px; left: 20px; color: rgb(0, 0, 0); font-size: 15px; line-height: 1.5; box-shadow: rgba(0, 0, 0, 0.61) 0px 0px 6px; z-index: 999999; display: flex; align-items: center; max-width: 430px; animation: 0.7s linear 0s 1 normal none running slide; background: rgb(238, 238, 238); padding: 10px 16px; border-radius: 6px; gap: 10px;';
		adbr.innerHTML = 'Allow Background Music? <button id="alow">Allow</button><button id="closeb">Cancel</button>';
		document.body.insertBefore(adbr, document.body.firstChild);
		document.addEventListener('click', function(event) {
		  var adbr = document.getElementById('adbr');
		  if (event.target && event.target.id === 'alow') { 
			if (adbr) {
			  adbr.style.display = 'none';playAudio();
			}
		  }if (event.target && event.target.id === 'alow') { 
			if (adbr) {
			  adbr.style.display = 'none';
			}
		  }
		}); 
    } else { 
      console.error('Error playing audio:', error);
    }
    document.querySelector("body").addEventListener("mousemove", function() { 
  document.documentElement.addEventListener('click', function() {audio.muted=false}, { once: true });
});
 
 
  });
}
 
  
function pauseAudio() {
  audio.pause();
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  playAudio();
}

function previousTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  playAudio();
}

//UTILS
function updateOptions(options) {
  for (let option in options) {
    if (!isNaN(speech[option])) {
      if (option == 'voice') {
        speech.voice = voices[+options[option]];
        continue;
      }

      speech[option] = +options[option] || options[option];
    }
  }
}

// EVENT HANDLERS
function populateVoices() {
  voices = this.getVoices().filter((voice) => voice.lang.includes('en'));
  speech.voice = voices[options.voice];
}

// LISTENERS
document.addEventListener('keydown', checkKey);
speechSynthesis.addEventListener('voiceschanged', populateVoices);

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map