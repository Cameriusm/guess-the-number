let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultParas');
const lowOrHi = document.querySelector('.lowOrHi');
const p = document.createElement('p');
const record = document.querySelector('#record');
let previousGuesses = [];
let numGuesses = 1;
let playGame = true;
let currentRecord = 0;
let guessCount = 0;

if (playGame) {
  subt.addEventListener('click', function (e) {
    e.preventDefault();
    //Grab guess from user
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function setNewRecord(guess) {
  if (guess > currentRecord){
    currentRecord = guessCount;
    record.innerHTML = `Рекорд: ${guessCount}`;
  }
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Введите корректное число');
  } else if (guess < 1) {
    alert('Введите число больше 1!');
  } else if (guess > 100) {
    alert('Введите число меньше 100!');
  } else {
    previousGuesses.push(guess);
    if (numGuesses === 10) {
      displayGuesses(guess);
      displayMessage(`Игра закончена! <br/> Число было: ${randomNumber}`);
      endGame();
    } else {
      displayGuesses(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  guessCount++;
  if (guess === randomNumber) {
    displayMessage(`Вы угадали правильно!`);
    setNewRecord(guessCount);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Слишком мало! Попробуйте снова!`);
  } else if (guess > randomNumber) {
    displayMessage(`Слишком много! Попробуйте снова`);
  }
}

function displayGuesses(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}  `;
  numGuesses++;
  remaining.innerHTML = `${11 - numGuesses}  `;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h1>${message}</h1>`;
}

function endGame() {
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h1 id="newGame">Начать новую игру</h1>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function () {
    randomNumber = parseInt(Math.random() * 100 + 1);
    previousGuesses = [];
    numGuesses = 1;
    guessSlot.innerHTML = '';
    lowOrHi.innerHTML = '';
    remaining.innerHTML = `${10 - numGuesses}  `;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  });
}
