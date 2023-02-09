/* eslint-disable @typescript-eslint/no-non-null-assertion */
export {};

const days = document.querySelector("#days") as HTMLHeadingElement;
const hours = document.querySelector("#hours") as HTMLHeadingElement;
const minutes = document.querySelector("#minutes") as HTMLHeadingElement;
const seconds = document.querySelector("#seconds") as HTMLHeadingElement;
const countdownSelector = document.querySelector("#countdown-selector") as HTMLInputElement;

let newYear = new Date(`January 01 ${new Date().getFullYear() + 1} 00:00:00`);

const setCountdown = () => {
    newYear = new Date(countdownSelector.value);
};

const countdown = () => {
    const currentTime = new Date();
    const difference = newYear.valueOf() - currentTime.valueOf();
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

countdownSelector.addEventListener("change", setCountdown);
