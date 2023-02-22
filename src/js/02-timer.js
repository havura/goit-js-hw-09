import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const inputDateTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');

const currentTime = Date.now();
let selectedDate = null;
let intervalId = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please, choose date in future!');
    } else {
      startBtn.disabled = false;
      Notiflix.Notify.success('Your date has been accepted');
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr(inputDateTime, options);

function onStartTimerClick() {
  startBtn.disabled = true;
  let deltaTime = selectedDate - currentTime;

  intervalId = setInterval(() => {
    deltaTime -= 1000;
    if (deltaTime < 0) {
      clearInterval(intervalId);
      return;
    }
    const convertedTime = convertMs(deltaTime);
    daysCounter.textContent = convertedTime.days;
    hoursCounter.textContent = convertedTime.hours;
    minutesCounter.textContent = convertedTime.minutes;
    secondsCounter.textContent = convertedTime.seconds;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', onStartTimerClick);