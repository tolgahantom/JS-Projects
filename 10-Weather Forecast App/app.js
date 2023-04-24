const apiKey = "4baa431909fbd40a78724fa0e52a8164";
const daysInWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// 2-10-18-26-34 is the 5 day

findDay = (day) => {
  let date = new Date(day);
  return date.getDay();
};

showUI = (data) => {
  document.querySelector(".list").innerHTML = "";
  document
    .querySelector(".weather-container")
    .querySelector(".city").innerHTML = data.city.name;
  const list = data.list;
  for (let i = 1; i < 39; i = i + 8) {
    let liTag = `
    <li class="list-item">
      <span class="day">${daysInWeek[findDay(list[i].dt_txt)]}</span>
      <span class="degree">
        <p class="degree-num">${parseInt(list[i].main.temp)}&#176;</p>
        <i degree-image">
          <img src="https://openweathermap.org/img/wn/${
            list[i].weather[0].icon
          }.png"/>
        </i>
      </span>
    </li>
  `;
    document.querySelector(".list").innerHTML += liTag;
  }
};

getForecast = async (cityName) => {
  document
    .querySelector(".weather-container")
    .querySelector(".city").innerHTML = "";
  document.querySelector(".list").innerHTML = "";

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert("City not found");
        document.querySelector(".close-icon").click();
        return;
      }
      showUI(data);
    });
};

document.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();
  if (document.querySelector("#search-bar").value == "") {
    alert("You have to write city name");
    return;
  }
  document.querySelector(".weather-container").classList.add("active");
  document.querySelector(".search-bar-container").style.display = "none";
  getForecast(document.querySelector("#search-bar").value);
  document.querySelector("#search-bar").value = "";
});
document.querySelector(".close-icon").addEventListener("click", () => {
  document.querySelector(".weather-container").classList.remove("active");
  document.querySelector(".search-bar-container").style.display = "block";
});
