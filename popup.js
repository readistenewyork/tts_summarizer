/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");


const fileOpenBtn = document.querySelector('#upload-file-btn');
const fileInput = document.querySelector('#upload-file');
const voiceSelect = document.querySelector('select#voice');
const speedRange = document.querySelector('input#rate');
const volumeRange = document.querySelector('input#volume');
const optionsToggleBtn = document.querySelector('button#options-toggle-btn');
const optionInputsDiv = document.querySelector('.options__inputs');
const inputs = [voiceSelect, speedRange, volumeRange];
const pauseBtn = document.querySelector('#pause-btn');
const stopBtn = document.querySelector('#stop-btn');
const showSummaryTextCheckbox = document.querySelector('#show-txt-checkbox');
const dwnc = document.querySelector('#dwn');
const bp = document.querySelector('#bp-checkbox');
const pd = document.querySelector('#paid');
var whis = new Date().toISOString().split('T')[0];
let options = _utils__WEBPACK_IMPORTED_MODULE_0__.initialOptions;
let extensionCode = "mySummary-tts";
let planID = 120;
// HTTPS REQUESTS
//TODO: showing loading state
async function extractFileText() {
  const data = new FormData();
  data.append('input_file', fileInput.files[0], fileInput.files[0].name);
  data.append('language', 'english');

  const options = {
    method: 'POST',
    headers: {
      'X-RapidAPI-Key': 'd4999e60f9msh58ec2231fec066dp117d8ejsnc392cf09ccde',
      'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com',
    },
    body: data,
  };

  try {
    let response = await fetch(
      'https://text-analysis12.p.rapidapi.com/text-mining/api/v1.1',
      options
    );
    let data = await response.json();
	console.log(JSON.stringify(data));
     if(data.ok===false){
		  console.log(JSON.stringify(data.msg))
	 }else{
    chrome.runtime.sendMessage(
      { type: 'GET_SUMMARY_POPUP', text: data.text },
      (response) => {
        console.log(response);
        window.close();
      }
	 );}
  } catch (err) {
    console.error('cannot extract text');
  }
}

// OPTIONS HANDLING
chrome.storage.local.get(['options', 'settings'], (value) => {
  if (value.options) {
    options = value.options;
    inputs.forEach((input) => {
      let inputId = input.id;
      input.value = +options[inputId];
    });
  }

  if (value.options?.showSummary) {
    showSummaryTextCheckbox.checked = Boolean(value.options.showSummary);
  }
  if (value.options?.download) {
    dwnc.checked = Boolean(value.options.download);
  }
  if (value.options?.bplayer) {
    bp.checked = Boolean(value.options.bplayer);
	document.querySelector('#myPlayer').style.display="initial";
		  document.querySelector('#hro').style.display="none";

  }
});

 

// EVENT HANDLERS

  chrome.storage.local.get('pda', function(result) {
  var pda = result.pda || {};
 
  if (pda[whis]) {
    var f = pda[whis];
  } else {
    var f = 0;
  }
 
  fileOpenBtn.addEventListener('click', fileInputClickHandler);

  function fileInputClickHandler() { 
    if (f < 163) { 
      f++;
 
      pda[whis] = f;
 
      chrome.storage.local.set({ pda: pda });
      fileInput.click();
    } else { 
      chrome.storage.local.get(['paid'], (res) => {
  
if(res.paid=="pdi"){ fileInput.click();}else{alert('You have reached the maximum number of uploads for today.Buy Premium.');}});
    }
  }
});

function toggleOptions() {
  optionInputsDiv.classList.toggle('active');
}

function onValueChange(e) {
  let changed = e.target.attributes.id.nodeValue;
  options = {
    ...options,
    [changed]: Math.floor(e.target.value) || e.target.value,
  };
  chrome.storage.local.set({
    options: options,
  });
}
let ps=true;
function togglePause() {
	
	
 
	
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE_PAUSE' }, () => {
		
		
		
	});
  }); 
}

function stopSpeech() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'STOP' }, () => {});
  });
}

function textVisiblityChangeHandler(e) {
  //! Overrides all settings
  const shouldShowSummary = e.target.checked;

  options = {
    ...options,
    showSummary: shouldShowSummary,
  };
  chrome.storage.local.set({
    options: options,
  });
}
function dwnChangeHandler(e) {
  //! Overrides all settings
  const dw = e.target.checked;

  options = {
    ...options,
    download: dw,
  };
  chrome.storage.local.set({
    options: options,
  });
}
function bpChangeHandler(e) {
  //! Overrides all settings
  const dw = e.target.checked;
  if(dw){
	  document.querySelector('#myPlayer').style.display="initial";
	  document.querySelector('#hro').style.display="none";
  }else{
	  document.querySelector('#myPlayer').style.display="none";
	  	  document.querySelector('#hro').style.display="initial";

  }
  options = {
    ...options,
    bplayer: dw,
  };
  chrome.storage.local.set({
    options: options,
  });
}



var bb = new BrowserBill(extensionCode); 


bb.getUser().then((data) => {
    if (data.paid) {
        document.getElementById("paid").style.display = "none";
        document.getElementById("mng").style.display = "inline";
        document.getElementById("prem").style.display = "flex";
        document.getElementById("paidStatus").innerHTML = "Paid! 🔥";
		
		 
 
  chrome.storage.local.set({
   paid: "pdi"
  });
		
    }else{
		
		
		
	}
});

document.getElementById("mng").onclick = () => {
    bb.openManagementPage();
}

function pdHandler(e) {
  bb.openPaymentPage(planID);
  
}
// EVENT LISTENERS

fileInput.addEventListener('change', extractFileText);
optionsToggleBtn.addEventListener('click', toggleOptions);
pauseBtn.addEventListener('click', togglePause);
stopBtn.addEventListener('click', stopSpeech);
showSummaryTextCheckbox.addEventListener('change', textVisiblityChangeHandler);
dwnc.addEventListener('change', dwnChangeHandler);
bp.addEventListener('change', bpChangeHandler);
pd.addEventListener('click', pdHandler);
inputs.forEach((input) => {
  input.addEventListener('change', onValueChange);
});

})();
 

/******/ })();
$(function(){
				var playerStatus = "";
//var j = $.noConflict(); 


 function setEventStatusChange(s) {
      playerStatus = s;
      //if (options.onStatusChange !== undefined) {
      //  options.onStatusChange(playerStatus);
      //}
    }
	   function formatTime(sec) {
      var min = Math.floor(sec / 60);
      min = min >= 10 ? min : "0" + min;
      sec = Math.floor(sec % 60);
      sec = sec >= 10 ? sec : "0" + sec;
      return min + ":" + sec;
    }

    function checkProgress(c, t) {
      var p = parseInt((c * 100) / t);
      //document.getElementById("luna-progress-bar").slider("option", "value", p);
	  $("#luna-progress-bar").slider("option", "value", p);
    }

    function setProgress(t, p) {
      $player.currentTime = parseInt((p * t) / 100);
    }

    function timeUpdate(elem) {
      
        elem.innerHTML="0:00";
         //checkProgress(12, 300);
      
    }

    function noTimeUpdate() {
      $player.ontimeupdate = function () {};
    }
	
	  function s(songPath) {
      $infoTotal.text("0:00");
      $player.src = songPath;
      $btnPlay.trigger("focus");
      $player.play();
      setEventStatusChange("changing_song");
    };

     function d() {
      $infoTotal.innerHTML(formatTime($player.duration));
      setEventStatusChange("metadata_loaded");
    };
	
$(document).ready(function() {
	var htmlOutput = '<div class="luna-container luna">\
    <div class="luna-controls">\
    <button id="prevBtn"type="button" class="luna-prev"></button>\
    <button id="playBtn" type="button" class="luna-play"></button>\
    <button id="pauseBtn"type="button" class="luna-pause"></button>\
    <button id="nextBtn"type="button" class="luna-next"></button>\
    </div>\
    </div><div class="kontrol luna"><span id="luna-time-current" class="luna-time-current">0:00</span>\
    <div id="luna-progress-bar"class="luna-progress-bar"></div>\
    <span id="luna-time-total"class="luna-time-total">0:00</span>\
    <div id="speakerBtn"class="luna-speaker"></div>\
    <div id="volumep" class="luna-volume"></div>\
    <audio class="luna-audio-tag" id="luna-audio-tag">\
      <source src="" type="audio/mpeg">\
      Your browser does not support the audio element. Please update your browser.\
    </audio>\
  </div>';
 function setVoiceList() {
  let voices = speechSynthesis.getVoices();
  const voiceSelect = document.getElementById('voice');
 
  voiceSelect.innerHTML = '';
 
  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent =  voice.name.replace(/\s*\(.*\)/, '');;
    voiceSelect.appendChild(option);
  });
}

if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = setVoiceList;
}
 
setVoiceList();
  $('#myPlayer').append(htmlOutput);
	$("#luna-progress-bar").slider();
	$("#volumep").slider({
    change: function(event, ui) {
      const volume = ui.value/100;
      
        chrome.runtime.sendMessage({ volume: volume });
    }
  });
	let timer;
 
function formatTime1(time) { 
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
  function formatTime(sec) {
      var min = Math.floor(sec / 60);
      min = min >= 10 ? min : "0" + min;
      sec = Math.floor(sec % 60);
      sec = sec >= 10 ? sec : "0" + sec;
      return min + ":" + sec;
    }

function updateTimer() {
  chrome.runtime.sendMessage({ action: 'getPlayerTime' }, function (response) {
 
});


   //setTimeout(stopTimer, 10000);
}
	 function startTimer() {
  timer = setInterval(updateTimer, 1000);  
}
	function stopTimer() {
  clearInterval(timer);
}

chrome.storage.sync.get(['player'], function(result) {
  const plr = result.player;
 if(plr=="started"){
	 startTimer();
$(".luna-play").css({"background-position": "right center"});	 
$(".luna-pause").css({"background-position": "left center"});	 
	 
 }else{
	 $(".luna-pause").css({"background-position": "right center"});
	 $(".luna-play").css({"background-position": "left center"});
 }
});
  

 document.getElementById("playBtn").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "play" });
  timeUpdate(document.getElementById("luna-time-current"));
  timeUpdate(document.getElementById("luna-time-total")); 
  
  $(".luna-play").css({"background-position": "right center"});	 
$(".luna-pause").css({"background-position": "left center"});
  startTimer(); 
   

  chrome.storage.sync.set({ player: "started" }, function() {
   
});

  
  
});
if (typeof jQuery.ui !== 'undefined') {
  console.log('jQuery UI is loaded');
} else {
  console.log('jQuery UI is not loaded');
}
document.getElementById("pauseBtn").addEventListener("click", function () {
  $(".luna-pause").css({"background-position": "right center"});
	 $(".luna-play").css({"background-position": "left center"});
	 chrome.runtime.sendMessage({ action: "pause" }); chrome.storage.sync.set({ player: "stopped" }, function() {
   
});
});

document.getElementById("nextBtn").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "next" });  $(".luna-play").css({"background-position": "right center"});	 
$(".luna-pause").css({"background-position": "left center"});
});

document.getElementById("prevBtn").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "prev" });  $(".luna-play").css({"background-position": "right center"});	 
$(".luna-pause").css({"background-position": "left center"});
});
});

 chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
   if (response.action === 'timeup') {
    if(response){
  if (response.dura === NaN ||response.dura === null || response.dura === undefined) {/*km*/}else{
  let lunacurrent = document.getElementById('luna-time-current');
  lunacurrent.textContent = formatTime(response.currentTime);let tot = document.getElementById('luna-time-total'); 
  tot.textContent = formatTime(response.dura);
  //alert( response.currentTime  +" -"+ response.dura);
  var p = parseInt((response.currentTime * 100) / response.dura);
  $("#luna-progress-bar").slider("option", "value", p);}
  
  }
  }
});
			});
//# sourceMappingURL=popup.js.map