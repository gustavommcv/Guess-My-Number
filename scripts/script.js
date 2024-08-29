'use strict';

const range = 10;
const initialScore = 10;
let number = Math.trunc(Math.random() * range) + 1;
let score = initialScore;
let highscore = 0;

document.querySelector('.score').textContent = score;
document.querySelector('.range').textContent = range;

const message = document.querySelector('.message');
const originalMessage = message.textContent;
const numberHTML = document.querySelector('.number');

const body = document.querySelector('body');
const settingsSection = document.querySelector('section.hidden');

let gameFinished = false;

const overlay = document.querySelector('.overlay');

// Toggle settings menu when the button is clicked
document.querySelector('.settings').addEventListener('click', () => {
    settingsSection.classList.toggle('active');
    overlay.classList.toggle('active')
});

// Closes the menu if the overlay is clicked
document.querySelector('.overlay').addEventListener('click', () => {
    if (settingsSection.classList.contains('active')) {
        settingsSection.classList.remove('active');
        overlay.classList.toggle('active')
    }
});

// Closes the menu if the esc key is pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && settingsSection.classList.contains('active')) {
        settingsSection.classList.remove('active');
        overlay.classList.toggle('active')
    }
});

document.querySelector('.check').addEventListener('click', () => {
    const guessNumber = Number(document.querySelector('.guess').value);

    if (!gameFinished) {
        if (!guessNumber) {
            setMessage("No Number!");
            return;
        }

        checkGuess(guessNumber);
        if (gameFinished) {
            document.querySelector('.guess').value = "";
        }
    }
});

document.querySelector('.again').addEventListener('click', () => {
    resetPage();
});

function setMessage(text) {
    message.textContent = text;
}

function updateScore(newScore) {
    score = newScore;
    document.querySelector('.score').textContent = score;
}

function checkGuess(guess) {
    if (guess === number) {
        updatePageWin();
    } else {
        setMessage(guess > number ? 'Too high!' : 'Too low!');
        updateScore(score - 1);

        if (score < 1) {
            updatePageLost();
        }
    }
}

function updatePageWin() {
    gameFinished = true;
    setMessage('Correct number!');
    
    if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
    }

    numberHTML.textContent = number;
    numberHTML.style.padding = '10px 50px';
    body.style.backgroundColor = '#60b347';
}

function updatePageLost() {
    gameFinished = true;
    setMessage("You've lost!");
    numberHTML.textContent = number;
    numberHTML.style.padding = '10px 50px';
    body.style.backgroundColor = '#C7253E';
}

function resetPage() {
    number = Math.trunc(Math.random() * range) + 1;
    gameFinished = false;
    score = initialScore;
    document.querySelector('.guess').value = "";

    setMessage(originalMessage);
    updateScore(score);
    numberHTML.textContent = '?';

    body.style.backgroundColor = '#1E1E1E';
    numberHTML.style.padding = '10px 20px';
}
