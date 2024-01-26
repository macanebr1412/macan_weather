const apiKey = "eb9a6e27489224d3bf83655a56b6ce80";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error-message");
let weatherHeight = weather.scrollHeight;
let errorHeight = error.scrollHeight;
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    weather.style.maxHeight = null;
    error.style.maxHeight = errorHeight + "px";
  } else {
    weather.style.maxHeight = weatherHeight + "px";
    error.style.maxHeight = null;
  }
  var data = await response.json();
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "assets/image/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "assets/image/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "assets/image/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "assets/image/drizzle.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "assets/image/snow.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "assets/image/mist.png";
  }
  weather.classList.remove("d-none");
}
searchBtn.addEventListener("click", function () {
  checkWeather(searchBox.value);
});

checkWeather("rasht");

let ws = new WebSocket("wss://stream.binance.com:9443/ws/etheur@trade");
let stockPrice = document.getElementById("p1");
ws.onmessage = function (evt) {
  let stockObject = JSON.parse(evt.data);
  stockPrice.innerHTML = parseFloat(stockObject.p).toFixed(2);
  console.log(stockObject.p);
};
