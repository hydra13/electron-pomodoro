'use strict'
const path = require('path');
const fs = require('fs');

const btnStart = document.querySelector("#start");
const btnStop = document.querySelector("#stop");
const btnWork25 = document.querySelector('#work25')
const btnRest5 = document.querySelector('#rest5')
const btnRest15 = document.querySelector('#rest15')
const progress = document.querySelector('#progress');
const mins = document.querySelector('#mins');
const secs = document.querySelector('#secs');

let timerPomodoro = null;
let currentValue = 0;
let startValue = 0;
let isNeedCount = false;
let totalPomodoro = 0;

function normalizeDigit(x) {
  return (x < 10 ? '0' : '') + x;
}

function setStateBtns(isRunning) {
  btnStart.disabled = isRunning;
  btnWork25.disabled = isRunning;
  btnRest5.disabled = isRunning;
  btnRest15.disabled = isRunning;
  btnStop.disabled = !isRunning;
}

function showMessage() {
  //alert and play music

  if (isNeedCount) {
    isNeedCount = false;
    totalPomodoro++;
    const date = new Date();
    const dayStr = normalizeDigit(date.getDate());
    const mouthStr = normalizeDigit(date.getMonth() + 1);
    const dateToday = `${date.getFullYear()}.${mouthStr}.${dayStr}`
    fs.writeFile(dateToday, `${totalPomodoro}`);
  }

  let audio = new Audio(path.resolve(__dirname, "..", "sounds", "the_purge.mp3"));
  audio.volume = 1.0;
  let promise = audio.play();
  if (promise !== undefined) {
    promise.then(() => {
      alert('Timer!!!!!!');
      audio.pause();
      audio = null;
    })
      .catch(err => console.error(err))
  } else {
    console.error('promise === undefined')
  }
}

function process() {
  currentValue--;
  const percent = (currentValue * 100) / startValue;
  console.log(`tick: ${currentValue} secs (${percent} %)`)
  progress.style.cssText = `width:${percent}%;`;
  if (currentValue <= 0) {
    showMessage();
    stopTimer();
  }
}

function startTimer() {
  setStateBtns(true);
  startValue = (+mins.value * 60) + +secs.value;
  console.log(`init secs: ${startValue}`);
  currentValue = startValue;
  progress.style.cssText = `width:100%;`;
  timerPomodoro = setInterval(process, 1000);
}

function stopTimer() {
  setStateBtns(false);
  if (timerPomodoro) {
    clearInterval(timerPomodoro);
    timerPomodoro = null;
  }
  isNeedCount = false;
}

function startExactTime(min, sec = 0, isNeedSaveStat = false) {
  isNeedCount = isNeedSaveStat;
  mins.value = min;
  secs.value = sec;
  startTimer();
}

document.addEventListener('click', event => {
  if (event.target === btnStart) {
    startTimer();
  } else if (event.target === btnStop) {
    stopTimer();
  } else if (event.target === btnWork25) {
    startExactTime(25, 0, true);
  } else if (event.target === btnRest15) {
    startExactTime(15);
  } else if (event.target === btnRest5) {
    startExactTime(5);
  }
})
stopTimer();