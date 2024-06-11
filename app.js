let text = document.getElementById("inner-text");
let endCountdown = document.getElementById("end-countdown");
let delCountdown = document.getElementById("del-countdown");

text.value = "unknown";
// text.style.overflow = "hidden"

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
  delCountdown.style.display = "block";
  let timerInterval = setInterval(function () {
    let clock = document.getElementById(id);
    let timer = updateTimer(deadline);

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

    endCountdown.style.display = "none";

    // check for end of timer
    if (timer.total < 1) {
      clearInterval(timerInterval);
      clock.innerHTML =
        "<span>0</span><span>0</span><span>0</span><span>0</span>";
      endCountdown.innerHTML = `The countdown for ${text.value} has been reached, or expired.`;
      endCountdown.style.display = "block";
      delCountdown.style.display = "none";
    }
  }, 1000);
};

window.onload = function () {
  let deadline = new Date("November 30, 2024 00:00:00");
  startTimer("clock", deadline);
};

// updates:
// update the name of the deadline from the website
// suggest an update of the date on the website
// add a dark mode icon
