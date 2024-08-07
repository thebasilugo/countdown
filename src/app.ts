// type definitions
type NullableElement = Element | null;
type NullableHTMLElement = HTMLElement | null;
type NullableInputElement = HTMLInputElement | null;

// Selecting necessary DOM elements
const countdownApp: any = document.querySelector("#countdown-app");
const text: NullableInputElement = document.querySelector("#inner-text");
const endCountdown: any = document.querySelector("#end-countdown");
const countdownClock: NullableElement = document.querySelector("#clock");
const changeCountdownDate: NullableInputElement = document.querySelector(
  "#change-countdown-date"
);
const backBtn: any = document.querySelector("#back-btn");

// Initialize variables
let deadline: any; // any type
let dateIsSelected: boolean = false;
let timerInterval: any; // Declare timerInterval here

// Function to calculate remaining time
const updateTimer = (deadline: any) => {
  let time: number = deadline.getTime() - new Date().getTime();
  return {
    days: Math.floor(time / (1000 * 60 * 60 * 24)),
    hours: Math.floor((time / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((time / (1000 * 60)) % 60),
    seconds: Math.floor((time / 1000) % 60),
    total: time,
  };
};

// Function to start the countdown timer
const startTimer = (deadline: Date) => {
  // Removed unused parameter 'id'
  countdownApp!.style.display = "block";
  if (timerInterval) {
    clearInterval(timerInterval); // Clear the old interval
  }
  timerInterval = setInterval(function () {
    let timer = updateTimer(deadline);

    renderDate(timer);

    endCountdown!.style.display = "none";

    // Check for end of timer
    if (timer.total < 1) {
      clearInterval(timerInterval);
      endCountdown!.innerHTML = `The countdown ${
        text!.value && `for ${text!.value}`
      } has been reached, or expired. <br/> <button class="bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 rounded-md m-4 px-4 py-2">show time</button>`;
      endCountdown!.style.display = "block";
      countdownApp!.style.display = "none";
    }
    // Check if the deadline is the original deadline
    if (deadline.getTime() === new Date("nov 3, 2024 00:00:00").getTime()) {
      backBtn!.style.display = "none";
    } else {
      backBtn!.style.display = "inline-block";
    }
  }, 1000);
};

// Function to check if a date is selected
const checkIfDateIsSelected = () => {
  if (new Date(changeCountdownDate!.value)) {
    dateIsSelected = true;
  } else dateIsSelected = false;
};

// Function to update the countdown
const updateCountdown = () => {
  const selectedDate = new Date(changeCountdownDate!.value);
  checkIfDateIsSelected();
  startTimer(selectedDate);
};

// Event listener for date change
changeCountdownDate?.addEventListener("change", updateCountdown);

// Function to render the countdown timer
const renderDate = (timer: any) => {
  countdownClock!.innerHTML = `<span class="w-1/4 px-2"> 
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

// Function to set the original timer
const setOriginalTimer = () => {
  deadline = new Date("nov 3, 2024 00:00:00");
};

// Declare selectedDate variable outside the window.onload function
let selectedDate: Date;

// On window load, set the original timer and start it
window.onload = () => {
  setOriginalTimer();
  checkIfDateIsSelected();
  startTimer(deadline);
  text!.placeholder = "name this countdown";
};

// Event listener for back button click
backBtn.addEventListener("click", function () {
  setOriginalTimer();
  startTimer(deadline);
});

// TODO:
// - Update the name of the deadline from the website: done
// - An update of the date on the website: done
// - Add a dark mode icon
// - Make it such that if date is in the past (bg would change to dark, and it'll write "it's been ...")
