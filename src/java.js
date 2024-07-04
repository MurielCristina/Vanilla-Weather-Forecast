// Search Engine
function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#form-text");
  let h2 = document.querySelector("h2");

  let filterTemperature = document.querySelector(
    ".data-showcase-temperature-container-number"
  );
  let filterConditions = document.querySelector("#conditions");
  let filterHumidity = document.querySelector("#humidity");
  let filterWind = document.querySelector("#wind");
  let filterEmoji = document.querySelector(
    "#data-showcase-temperature-container-emoji"
  );
  let filterNow = document.querySelector(".date-and-hour");

  //API
  function filter(response) {
    let dataCity = response.data.city;
    let dataCountry = response.data.country;
    let dataTemperature = Math.round(response.data.temperature.current);
    let dataCondition = response.data.condition.description;
    let dataHumidity = response.data.temperature.humidity;
    let dataWind = response.data.wind.speed;
    let dataEmoji = response.data.condition.icon_url;
    let now = new Date(response.data.time * 1000);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[now.getDay()];
    let hour = now.getHours();
    let minute = now.getMinutes().toString().padStart(2, 0);
    let currentDateAndHour = `${day} ${hour}:${minute}`;

    h2.innerHTML = `${dataCity}, ${dataCountry}`;
    filterTemperature.innerHTML = dataTemperature;
    filterConditions.innerHTML = dataCondition;
    filterHumidity.innerHTML = `${dataHumidity}%`;
    filterWind.innerHTML = `${dataWind}km/h`;
    filterEmoji.innerHTML = `<img src="${response.data.condition.icon_url}"data-showcase-temperature-container-emoji" />`;
    filterNow.innerHTML = currentDateAndHour;

    getForecast(dataCity);
  }
  let apikEY = "73050fa355794447f81ab5349190dotd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchCity.value}&key=${apikEY}&units=metric`;
  axios.get(apiUrl).then(filter);
}

function displayforecast(response) {
  console.log(response.data);
  let forecast = document.querySelector("#week-forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  forecastHtml = ``;

  days.forEach(function (days) {
    forecastHtml += `<div class="one-day">
    <p class="week-forecast-date">${days}</p>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png" 
    class="week-forecast-emoji">
    <p class="week-forecast-temp">
      <span id="week-forecast-temp-max"><strong>22º</strong></span>
      <span id="week-forecast-temp-min">16º</span>
    </p>
  </div>`;
  });

  forecast.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "73050fa355794447f81ab5349190dotd";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayforecast);
}

let searchInput = document.querySelector(".form");
searchInput.addEventListener("submit", search);
getForecast("Panama");
