/* eslint-disable @typescript-eslint/no-non-null-assertion */
export {};

const days = document.querySelector("#days") as HTMLHeadingElement;
const hours = document.querySelector("#hours") as HTMLHeadingElement;
const minutes = document.querySelector("#minutes") as HTMLHeadingElement;
const seconds = document.querySelector("#seconds") as HTMLHeadingElement;
const title = document.querySelector("#countdown-title") as HTMLHeadingElement;
const setCountdownTitle = document.querySelector("#set-countdown-title") as HTMLInputElement;
const setCountdownTime = document.querySelector("#set-countdown-time") as HTMLInputElement;
const setCountdownBtn = document.querySelector("#set-countdown-btn") as HTMLButtonElement;
const deleteCountdownBtn = document.querySelector("#delete-countdown-btn") as HTMLButtonElement;

let countdownDestination = new Date(localStorage.getItem("countdownDestination") || `January 01 ${new Date().getFullYear() + 1} 00:00:00`);
title.innerText = localStorage.getItem("countdownTitle") || "New Year Countdown";

const setCountdown = () => {
    if (setCountdownTitle.value.trim() === "" || setCountdownTime.value === "") {
        return;
    }
    title.innerText = setCountdownTitle.value;
    countdownDestination = new Date(setCountdownTime.value);

    localStorage.setItem("countdownTitle", setCountdownTitle.value);
    localStorage.setItem("countdownDestination", String(new Date(setCountdownTime.value)));
};

const deleteCountdown = () => {
    localStorage.removeItem("countdownDestination");
    localStorage.removeItem("countdownTitle");

    countdownDestination = new Date(`January 01 ${new Date().getFullYear() + 1} 00:00:00`);
    title.innerText = "New Year Countdown";
};

const countdown = () => {
    const currentTime = new Date();
    const difference = countdownDestination.valueOf() - currentTime.valueOf();
    const daysTime = Math.floor(difference / 1000 / 60 / 60 / 24);
    const hoursTime = Math.floor(difference / 1000 / 60 / 60) % 24;
    const minutesTime = Math.floor(difference / 1000 / 60) % 60;
    const secondsTime = Math.floor(difference / 1000) % 60;

    days.innerText = String(daysTime);
    hours.innerText = String(hoursTime < 10 ? `0${hoursTime}` : hoursTime);
    minutes.innerText = String(minutesTime < 10 ? `0${minutesTime}` : minutesTime);
    seconds.innerText = String(secondsTime < 10 ? `0${secondsTime}` : secondsTime);

    if (secondsTime === 1) seconds.parentNode!.querySelector("span")!.innerText = "Second";
    else seconds.parentNode!.querySelector("span")!.innerText = "Seconds";

    if (minutesTime === 1) minutes.parentNode!.querySelector("span")!.innerText = "Minute";
    else minutes.parentNode!.querySelector("span")!.innerText = "Minutes";

    if (hoursTime === 1) hours.parentNode!.querySelector("span")!.innerText = "Hour";
    else hours.parentNode!.querySelector("span")!.innerText = "Hours";

    if (daysTime === 1) days.parentNode!.querySelector("span")!.innerText = "Day";
    else days.parentNode!.querySelector("span")!.innerText = "Days";
};

setInterval(countdown, 1000);

setCountdownTime.min = String(new Date().toISOString()).slice(0, 16);

setCountdownBtn.addEventListener("click", setCountdown);
deleteCountdownBtn.addEventListener("click", deleteCountdown);
