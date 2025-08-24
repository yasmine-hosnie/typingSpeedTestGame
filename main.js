// Words Arrays
const easyWords = [
  "apple",
  "banana",
//   "cherry",
//   "grape",
//   "orange",
//   "mango",
//   "lemon",
//   "strawberry",
//   "peach",
//   "pear",
];

const normalWords = [
  "python",
  "java",
  "cpp",
  "javascript",
  "php",
  "ruby",
  "swift",
  "kotlin",
  "go",
  "rust",
];

const hardWords = [
  "react",
  "nodejs",
  "angular",
  "mongodb",
  "docker",
  "typescript",
  "express",
  "graphql",
  "firebase",
  "linux",
];

// Settings Level
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

let levelSelect = document.querySelector("#level");
let levelSelectContainer = document.querySelector(".level-select");

// Default Level
let defaultLevelName = levelSelect.value;
let defaultLevelSeconds = lvls[defaultLevelName];

// Cash Selectors
let startButton = document.querySelector(".start");
let message = document.querySelector(".message");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upComingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let control = document.querySelector(".control");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMesage = document.querySelector(".finish");
let instructions = document.querySelector(".instructions");

let words = []; // Dynamic based on difficulty

function setWordsArray() {
  if (levelSelect.value === "Easy") words = [...easyWords];
  else if (levelSelect.value === "Normal") words = [...normalWords];
  else words = [...hardWords];
  scoreTotal.innerHTML = words.length;
}

lvlNameSpan.innerHTML = defaultLevelName;
secondSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
setWordsArray();

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Hide before start
input.style.display = "none";
message.style.display = "none";
control.style.display = "none";
upComingWords.style.display = "none";


// Start Game
startButton.onclick = function () {
  defaultLevelName = levelSelect.value;
  defaultLevelSeconds = lvls[defaultLevelName];
  lvlNameSpan.innerHTML = defaultLevelName;
  secondSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  setWordsArray();

  input.style.display = "block";
  message.style.display = "block";
  upComingWords.style.display = "flex";
  control.style.display = "flex";
  levelSelectContainer.remove();
  instructions.remove();
  input.disabled = false;
  startButton.remove();
  input.focus();
  genWords();
};

function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  theWord.innerHTML = randomWord;
  let indexRandom = words.indexOf(randomWord);
  words.splice(indexRandom, 1);
  upComingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    div.textContent = words[i];
    upComingWords.appendChild(div);
  }
  startPlay();
}

// آخر جزء في startPlay() عدليه كدا:

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (input.value.toLowerCase() === theWord.innerHTML.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          input.disabled = true;
          showPopup("Congratulations", "good");
        }
      } else {
        input.disabled = true;
        showPopup("Game Over", "bad");
      }
    }
  }, 1000);
}

// Function to show popup
function showPopup(message, type) {
  let overlay = document.getElementById("overlay");
  let popupTitle = document.getElementById("popup-title");
  popupTitle.textContent = message;
  popupTitle.className = type;
  overlay.style.display = "flex";
}

