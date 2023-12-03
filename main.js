const levelEl = document.getElementById("level");
const stepsEl = document.getElementById("stepCount");
const attemptsEl = document.getElementById("attemptsLeft");
const statusEl = document.getElementById("status");
const incorrectAttemptsEl = document.getElementById("incorrectAttempts");
const userWordEl = document.getElementById("userWord");
const guessEl = document.getElementById("guessInput");
const submitBtnEl = document.getElementById("submitGuess");
const wordLength = document.getElementById("wordLength");
const themeColor = document.querySelector('meta[name="theme-color"]');

const easyList = [
  "plate",
  "fork",
  "comb",
  "door",
  "bag",
  "cap",
  "cup",
  "brush",
  "lamp",
  "note",
  "ring",
  "vase",
  "spoon",
  "keys",
  "table",
  "mug",
  "scarf",
  "book",
  "chain",
  "watch",
  "bowl",
  "hat",
  "shirt",
  "pen",
  "desk",
  "glove",
  "tape",
  "knife",
  "flag",
  "coin",
  "rope",
  "mouse",
  "wire",
  "gum",
  "shoe",
  "socks",
  "cork",
  "glass",
  "clock",
  "pill",
  "soap",
  "phone",
  "card",
  "chair",
  "belt",
];

const mediumList = [
  "slippers",
  "blanket",
  "headset",
  "wallet",
  "calendar",
  "keyboard",
  "jacket",
  "cologne",
  "sunrise",
  "suitcase",
  "laundry",
  "cupboard",
  "speaker",
  "laptop",
  "passport",
  "backpack",
  "monitor",
  "headrest",
  "bicycle",
  "glasses",
  "mirror",
  "printer",
  "battery",
  "charger",
  "pillow",
  "earphone",
  "umbrella",
  "magazine",
  "handbag",
  "sunshine",
  "perfume",
  "notebook",
  ,
  "sweater",
  "bookmark",
];

const hardList = [
  "scissors",
  "backpack",
  "lunchbox",
  "portraits",
  "screwdriver",
  "highlighter",
  "microphone",
  "sunglasses",
  "television",
  "countryside",
  "baseball",
  "waterbottle",
  "telescope",
  "notebook",
  "landscape",
  "sunscreen",
  "telephone",
  "keyboard",
  "bracelets",
  "watermelon",
  "cushioning",
  "curtains",
  "pajamas",
  "helicopter",
  "crosswalk",
  "projector",
  "motorcycle",
  "nightstand",
  "doorbell",
  "skateboard",
  "calculator",
  "briefcase",
  "suitcase",
  "smartphone",
  "fireplace",
  "dashboard",
  "clipboard",
  "binoculars",
  "headphones",
  "waterfall",
  "wristwatch",
  "sneakers",
  "flashlight",
  "headset",
  "candlestick",
  "whistle",
  "toothpaste",
  "thermostat",
  "headboard",
  "restaurant",
];

let selectedWord = "";
function setLevel(level) {
  levelEl.innerHTML = level;
  let wordsList = [];

  if (level === "Easy") {
    document.getElementById("button1").classList.add("bg-stone-800");
    document.getElementById("button2").classList.remove("bg-stone-800");
    document.getElementById("button3").classList.remove("bg-stone-800");
    wordsList = easyList;
    selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    wordLength.innerHTML = selectedWord.length;
  } else if (level === "Medium") {
    document.getElementById("button1").classList.remove("bg-stone-800");
    document.getElementById("button2").classList.add("bg-stone-800");
    document.getElementById("button3").classList.remove("bg-stone-800");
    wordsList = mediumList;
    selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    wordLength.innerHTML = selectedWord.length;
  } else if (level === "Hard") {
    document.getElementById("button1").classList.remove("bg-stone-800");
    document.getElementById("button2").classList.remove("bg-stone-800");
    document.getElementById("button3").classList.add("bg-stone-800");
    wordsList = hardList;
    selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    wordLength.innerHTML = selectedWord.length;
  }
}
setLevel("Easy");

let steps = 0;
let attempts = 10;
let incorrectAttempts = "";
let userGuessedWord = "_";

function startGame() {
  steps = 0;
  attempts = 10;
  incorrectAttempts = "";
  userGuessedWord = "_".repeat(selectedWord.length);
  userWordEl.innerHTML = userGuessedWord;
  stepsEl.innerHTML = steps;
  attemptsEl.innerHTML = attempts;
  statusEl.innerHTML = "Unattempted";
  statusEl.classList.remove("text-red-400", "text-green-400");
  statusEl.classList.add("text-blue-400");
  document.getElementById("welcomeScreen").classList.add("hidden");
  guessEl.focus();
}
function onSubmit() {
  const submitAns = guessEl.value.toLowerCase();
  steps++;
  stepsEl.innerHTML = steps;
  guessEl.value = "";
  guessEl.focus();

  if (submitAns.length !== 1) {
    statusEl.innerHTML = "Enter only 1 letter";
    themeColor.setAttribute("content", "#B91C1C");
  } else if (!selectedWord.includes(submitAns)) {
    themeColor.setAttribute("content", "#B91C1C");
    statusEl.classList.remove("text-blue-400", "text-green-400");
    statusEl.classList.add("text-red-400");
    statusEl.innerHTML = "Incorrect Guess";
    attempts--;
    attemptsEl.innerHTML = attempts;
    incorrectAttempts += submitAns + " ";
    incorrectAttemptsEl.innerHTML = incorrectAttempts;
    if (attempts === 0) {
      guessEl.blur();
      document.getElementById("gameOverScreen").classList.remove("hidden");
      document.getElementById("lostWord").innerHTML = selectedWord;
    }
  } else if (selectedWord.includes(submitAns)) {
    themeColor.setAttribute("content", "#166534");
    statusEl.classList.remove("text-red-400", "text-blue-400");
    statusEl.classList.add("text-green-400");
    statusEl.innerHTML = "Correct Guess";
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === submitAns) {
        userGuessedWord =
          userGuessedWord.slice(0, i) +
          submitAns +
          userGuessedWord.slice(i + 1);
      }
    }
    userWordEl.innerHTML = userGuessedWord;
    if (userGuessedWord === selectedWord) {
      guessEl.blur();
      document.getElementById("guessedWord").innerHTML = selectedWord;
      document.getElementById("guessedSteps").innerHTML = steps;
      document.getElementById("gameWonScreen").classList.remove("hidden");
    }
  }
}

submitBtnEl.addEventListener("click", onSubmit);
guessEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    onSubmit();
  }
});

function restartGame() {
  document.getElementById("welcomeScreen").classList.remove("hidden");
  document.getElementById("gameOverScreen").classList.add("hidden");
  document.getElementById("gameWonScreen").classList.add("hidden");
  incorrectAttemptsEl.innerHTML = "None";
  themeColor.setAttribute("content", "#0C0A09");
  setLevel("Easy");
}
