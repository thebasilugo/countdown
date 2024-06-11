const countdownApp = document.querySelector("#countdown-app");
const text = document.querySelector("#inner-text");
const endCountdown = document.querySelector("#end-countdown");
const countdownClock = document.querySelector("#clock");
const changeCountdownDate = document.querySelector("#change-countdown-date");
const backBtn = document.querySelector("#back-btn");
let deadline;

let dateIsSelected = false;
let timerInterval; // Declare timerInterval here

const updateTimer = (deadline) => {
  let time = deadline - new Date();
  return {
    days: Math.floor(time / (1000 * 60 * 60 * 24)),
    hours: Math.floor((time / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((time / (1000 * 60)) % 60),
    seconds: Math.floor((time / 1000) % 60),
    total: time,
  };
};

const startTimer = (id, deadline) => {
  countdownApp.style.display = "block";
  if (timerInterval) {
    clearInterval(timerInterval); // Clear the old interval
  }
  timerInterval = setInterval(function () {
    // Remove the let keyword
    let clock = document.getElementById(id);
    let timer = updateTimer(deadline);

    renderDate(timer);

    endCountdown.style.display = "none";

    // check for end of timer
    if (timer.total < 1) {
      clearInterval(timerInterval);
      clock.innerHTML =
        "<span>0</span><span>0</span><span>0</span><span>0</span>";
      endCountdown.innerHTML = `The countdown ${
        text.value && `for ${text.value}`
      } has been reached, or expired.`;
      endCountdown.style.display = "block";
      countdownApp.style.display = "none";
    }
  }, 1000);
};

const checkIfDateIsSelected = () => {
  if ((selectedDate = new Date(changeCountdownDate.value))) {
    dateIsSelected = true;
  } else dateIsSelected = false;
};

const updateCountdown = () => {
  const selectedDate = new Date(changeCountdownDate.value);
  checkIfDateIsSelected();
  const now = new Date();
  const timeRemaining = selectedDate - now;

  // Convert timeRemaining from milliseconds to a more readable format
  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  // Start the timer with the new date
  startTimer("clock", selectedDate);
};

changeCountdownDate.addEventListener("change", updateCountdown);

const renderDate = (timer) => {
  clock.innerHTML = `<span class="w-1/4 px-2">
  ${timer.days}
  </span>: 
  <span class="w-1/4 px-2">
  ${timer.hours}
  </span>: 
  <span class="w-1/4 px-2">
  ${timer.minutes}
  </span>: 
  <span class="w-1/4 px-2">
  ${timer.seconds}
  </span>`;
};

const setOriginalTimer = () => {
  deadline = new Date("nov 3, 2024 00:00:00");
};

window.onload = () => {
  setOriginalTimer();
  dateIsSelected === false
    ? startTimer("clock", deadline)
    : startTimer("clock", selectedDate);
  text.placeholder = "name this countdown";
};

backBtn.addEventListener("click", function () {
  setOriginalTimer();
  startTimer("clock", deadline);
});

// updates:
// update the name of the deadline from the website: done
// an update of the date on the website: done
// add a dark mode icon
// make it such that if date is in the past (bg would change to dark, and it'll write "it's been ...")
