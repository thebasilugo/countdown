"use strict";
const countdownApp = document.querySelector("#countdown-app");
const text = document.querySelector("#inner-text");
const endCountdown = document.querySelector("#end-countdown");
const countdownClock = document.querySelector("#clock");
const changeCountdownDate = document.querySelector("#change-countdown-date");
const backBtn = document.querySelector("#back-btn");
let deadline;
let dateIsSelected = false;
let timerInterval;
const updateTimer = (deadline) => {
    let time = deadline.getTime() - new Date().getTime();
    return {
        days: Math.floor(time / (1000 * 60 * 60 * 24)),
        hours: Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((time / (1000 * 60)) % 60),
        seconds: Math.floor((time / 1000) % 60),
        total: time,
    };
};
const startTimer = (deadline) => {
    countdownApp.style.display = "block";
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(function () {
        let timer = updateTimer(deadline);
        renderDate(timer);
        endCountdown.style.display = "none";
        if (timer.total < 1) {
            clearInterval(timerInterval);
            endCountdown.innerHTML = `The countdown ${text.value && `for ${text.value}`} has been reached, or expired. <br/> <button class="bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 rounded-md m-4 px-4 py-2">show time</button>`;
            endCountdown.style.display = "block";
            countdownApp.style.display = "none";
        }
        if (deadline.getTime() === new Date("nov 3, 2024 00:00:00").getTime()) {
            backBtn.style.display = "none";
        }
        else {
            backBtn.style.display = "inline-block";
        }
    }, 1000);
};
const checkIfDateIsSelected = () => {
    if (new Date(changeCountdownDate.value)) {
        dateIsSelected = true;
    }
    else
        dateIsSelected = false;
};
const updateCountdown = () => {
    const selectedDate = new Date(changeCountdownDate.value);
    checkIfDateIsSelected();
    startTimer(selectedDate);
};
changeCountdownDate === null || changeCountdownDate === void 0 ? void 0 : changeCountdownDate.addEventListener("change", updateCountdown);
const renderDate = (timer) => {
    countdownClock.innerHTML = `<span class="w-1/4 px-2"> 
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
let selectedDate;
window.onload = () => {
    setOriginalTimer();
    checkIfDateIsSelected();
    startTimer(deadline);
    text.placeholder = "name this countdown";
};
backBtn.addEventListener("click", function () {
    setOriginalTimer();
    startTimer(deadline);
});
