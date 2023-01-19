const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

console.log(hourEl);

countdown = () => {
  const newYear = "1 Jan " + (new Date().getFullYear() + 1);
  const newYearDate = new Date(newYear);
  const currentDate = new Date();

  const totalSeconds = (newYearDate - currentDate) / 1000;

  const seconds = Math.floor(totalSeconds) % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const day = Math.floor(totalSeconds / 3600 / 24);

  dayEl.innerHTML = formatTime(day);
  hourEl.innerHTML = formatTime(hours);
  minuteEl.innerHTML = formatTime(minutes);
  secondEl.innerHTML = formatTime(seconds);

  if (seconds == 0) {
    return;
  }
};

setInterval(countdown, 1000);

formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};
