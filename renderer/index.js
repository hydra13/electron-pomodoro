'use strict'
const path = require('path');

const btnStart = document.querySelector("#start");
const btnStop = document.querySelector("#stop");
const progress = document.querySelector('#progress');
const mins = document.querySelector('#mins');
const secs = document.querySelector('#secs');
let timerPomodoro = null;
let currentValue = 0;
let startValue = 0;

function showMessage() {
  //alert and play music
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
  progress.style.cssText = `width:${percent}%;`;
  if (currentValue <= 0) {
    stopTimer();
    showMessage();
  }
}

function startTimer() {
  btnStart.disabled = true;
  btnStop.disabled = false;
  startValue = (mins.value * 60) + secs.value;
  currentValue = startValue;
  progress.style.cssText = `width:100%;`;
  timerPomodoro = setInterval(process, 1000);
}

function stopTimer() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  if (timerPomodoro) {
    clearInterval(timerPomodoro);
    timerPomodoro = null;
  }
}

document.addEventListener('click', event => {
  if (event.target === btnStart) {
    startTimer();
  } else if (event.target === btnStop) {
    stopTimer();
  }
})
stopTimer();