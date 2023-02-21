const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  interval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}

function stopChangeColor() {
  clearInterval(interval);
  startBtn.disabled = false;
}

startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', stopChangeColor);
