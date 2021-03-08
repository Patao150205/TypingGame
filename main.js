'use strict';
function countUp() {
  const d = Date.now() - startTime;
  const remaing_t = new Date(limit_ms - d);
  const m = String(remaing_t.getMinutes()).padStart(2, '0');
  const s = String(remaing_t.getSeconds()).padStart(2, '0');
  const ms = String(Math.floor(remaing_t.getMilliseconds() / 10)).padStart(2, '0');
  timer.textContent = `${m}:${s}.${ms}`;
  if (timer.textContent === '00:30.00') {
    
  }
  if (timer.textContent === '00:00.00') {
    console.log(1);
    clearInterval(clearTime);
    playing_screen.remove();
    setGameOver();
  }
}

const main = document.querySelector('main');
const first_screen =  document.getElementById('first-screen');

let limit_ms;
let numberOfTime = 0;
let startTime;
let clearTime;
const words = [
  'patao',
  'hikakin',
  'masuo',
  'pokemon',
  'Google',
  'MacBookPro',
  'Bingo',
  '777',
  'Game'
]

const start_btn =  document.getElementById('start-btn');
start_btn.onclick = () => {
  const minutes = document.getElementById('minutes').value;
  const seconds = document.getElementById('seconds').value;
  limit_ms = (minutes * 60000) + (seconds * 1000);
  if (limit_ms === 0) {
    return;
  }
  first_screen.remove();
  main.appendChild(playing_screen);
  startTime = Date.now();
  clearTime = setInterval(() => {
    countUp();
  }, 10);  
}  

const playing_screen = document.createElement('div');
const timer = document.createElement('p');
timer.classList.add('timer');
playing_screen.appendChild(timer);

const characters = document.createElement('div');
characters.className = 'chracters'
const typedField = document.createElement('span');
typedField.className = 'typed';
typedField.textContent = '';
const unTypedField = document.createElement('span');
unTypedField.className = 'unTyped';
let NextWordIndex = Math.floor(Math.random() * words.length);
unTypedField.textContent = words[NextWordIndex];

characters.appendChild(typedField);
characters.appendChild(unTypedField);
playing_screen.appendChild(characters);

let currentKey = unTypedField.textContent.charAt(0);
document.addEventListener('keydown',(event)=> {typeEvent(event)} );
function typeEvent(event) {
  if (event.key === currentKey) {
    typedField.textContent += currentKey;
    unTypedField.textContent = unTypedField.textContent.substring(1);
    currentKey = unTypedField.textContent.charAt(0);
  } 
  if (unTypedField.textContent === '') {
    typedField.textContent = '';
    words.splice(NextWordIndex , 1);
    NextWordIndex = Math.floor(Math.random() * words.length);
    unTypedField.textContent = words[NextWordIndex];
    currentKey = unTypedField.textContent.charAt(0);
    numberOfTime++;
    console.log(numberOfTime);
    if (numberOfTime === 3) {
      document.removeEventListener('keydown',(event)=> {typeEvent(event)} );
      playing_screen.remove();
      clearInterval(clearTime);
      setClear();
    }
  }
}

function setGameOver() {
  const GameOver = document.createElement('h1');
  GameOver.textContent = 'GameOver';
  const Back_btn = document.createElement('a');
  Back_btn.href = '';
  Back_btn.textContent = '戻る';
  main.appendChild(GameOver);
  main.appendChild(Back_btn);
}

function setClear() {
  const Clear = document.createElement('h1');
  Clear.textContent = 'Clear';
  const Back_btn = document.createElement('a');
  Back_btn.href = '';
  Back_btn.textContent = '戻る';
  main.appendChild(Clear);
  main.appendChild(Back_btn);
}


