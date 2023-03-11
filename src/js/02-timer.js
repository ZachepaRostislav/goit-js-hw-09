import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  initInput: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
}
// console.log(refs.secondsEl)
refs.startBtn.disabled = true;
// flatpickr()

let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
      userDate = selectedDates[0];
    }
  },
};


class Timer {
  constructor() {
    this.isActive = false;
    this.intervalId = null;
    refs.startBtn.disabled = true;
  }

  startTimer() {
    if (this.isActive) {
      return;
    }
    const { startBtn, daysEl, hoursEl, minutesEl, secondsEl } = refs
    this.isActive = true;
    this.intervalId = setInterval(() => {
      startBtn.disabled = true;
      const currentTime = Date.now();
      const deltaTime = userDate - currentTime;
      const components = convertMs(deltaTime);

      daysEl.textContent = components.days;
      hoursEl.textContent = components.hours;
      minutesEl.textContent = components.minutes;
      secondsEl.textContent = components.seconds;

      if (deltaTime <= 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

refs.startBtn.addEventListener('click', () => {
  timer.startTimer();
});



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const timer = new Timer();
flatpickr(refs.initInput, options);