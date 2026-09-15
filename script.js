/*
  WeatherNow
  -----------
  1. Put your WeatherAPI key below.
  2. Open the project through a local server (VS Code Live Server is easiest).
*/

const API_KEY = "08e6c4182d6345278e4111545261509";
const PLACEHOLDER_KEYS = [
  "YOUR_WEATHERAPI_KEY",
  "PASTE_YOUR_REAL_WEATHERAPI_KEY_HERE"
];

const BASE_URL = "https://api.weatherapi.com/v1/current.json";
const FORECAST_URL = "https://api.weatherapi.com/v1/forecast.json";

const searchForm = document.querySelector("#searchForm");
const cityInput = document.querySelector("#cityInput");
const locationBtn = document.querySelector("#locationBtn");
const unitToggle = document.querySelector("#unitToggle");
const statusEl = document.querySelector("#status");
const weatherPanel = document.querySelector("#weatherPanel");

const cityName = document.querySelector("#cityName");
const dateText = document.querySelector("#dateText");
const description = document.querySelector("#description");
const weatherIcon = document.querySelector("#weatherIcon");
const temperature = document.querySelector("#temperature");
const degree = document.querySelector("#degree");
const feelsLike = document.querySelector("#feelsLike");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const pressure = document.querySelector("#pressure");
const visibility = document.querySelector("#visibility");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const forecast = document.querySelector("#forecast");
const forecastUnit = document.querySelector("#forecastUnit");

let unit = localStorage.getItem("weatherUnit") || "metric";

function setStatus(message = "", isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

function checkApiKey() {
  if (!API_KEY || PLACEHOLDER_KEYS.includes(API_KEY)) {
    throw new Error("Add the API key from weatherapi.com to API_KEY in script.js.");
  }
}

function formatTime(unixSeconds, timezoneOffset) {
  const date = new Date((unixSeconds + timezoneOffset) * 1000);
  return date.toUTCString().slice(17, 22);
}

function formatDate(unixSeconds, timezoneOffset) {
  const date = new Date((unixSeconds + timezoneOffset) * 1000);
  return date.toUTCString().slice(0, 16);
}

function convertWind(speed) {
  return unit === "metric"
    ? `${(speed * 3.6).toFixed(1)} km/h`
    : `${speed.toFixed(1)} mph`;
}

async function getWeather(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Unable to get current weather.");
  }

  return data;
}

async function getForecast(query) {
  const url =
    `${FORECAST_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}` +
    "&days=5&aqi=no&alerts=no";

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Unable to get the forecast.");
  }

  return data;
}

function displayCurrentWeather(data) {
  const weather = data.current;
  const location = data.location;

  cityName.textContent = `${location.name}, ${location.country}`;
  description.textContent = weather.condition.text;
  weatherIcon.src = `https:${weather.condition.icon}`;
  weatherIcon.alt = weather.condition.text;

  temperature.textContent = Math.round(unit === "metric" ? weather.temp_c : weather.temp_f);
  feelsLike.textContent = `${Math.round(unit === "metric" ? weather.feelslike_c : weather.feelslike_f)}°`;
  humidity.textContent = `${weather.humidity}%`;
  wind.textContent = unit === "metric"
    ? `${weather.wind_kph.toFixed(1)} km/h`
    : `${weather.wind_mph.toFixed(1)} mph`;
  pressure.textContent = `${Math.round(unit === "metric" ? weather.pressure_mb : weather.pressure_in)} ${unit === "metric" ? "hPa" : "in"}`;
  visibility.textContent = `${(unit === "metric" ? weather.vis_km : weather.vis_miles).toFixed(1)} ${unit === "metric" ? "km" : "mi"}`;

  dateText.textContent = location.localtime;
  sunrise.textContent = "Unavailable";
  sunset.textContent = "Unavailable";

  updateUnits();
}

function displayForecast(data) {
  /*
    The forecast endpoint returns readings every 3 hours.
    We select one reading around midday for each day.
  */
  const byDate = new Map();

  const days = data.forecast.forecastday;

  forecast.innerHTML = days.map(item => {
    const day = new Date(`${item.date}T12:00:00`).toLocaleDateString(undefined, { weekday: "short" });
    const temperature = unit === "metric" ? item.day.avgtemp_c : item.day.avgtemp_f;
    const icon = `https:${item.day.condition.icon}`;

    return `
      <article class="forecast-item">
        <div class="day">${day}</div>
        <img src="${icon}" alt="${item.day.condition.text}">
        <div class="temp">${Math.round(temperature)}°</div>
        <div class="desc">${item.day.condition.text}</div>
      </article>
    `;
  }).join("");
}

async function loadWeatherByCity(city) {
  checkApiKey();

  if (!city.trim()) {
    throw new Error("Please enter a city name.");
  }

  setStatus("Loading weather...");
  weatherPanel.classList.add("hidden");

  const [current, forecastData] = await Promise.all([
    getWeather(city),
    getForecast(city)
  ]);

  displayCurrentWeather(current);
  displayForecast(forecastData);

  weatherPanel.classList.remove("hidden");
  setStatus("");
  localStorage.setItem("lastCity", current.location.name);
}

async function loadWeatherByCoordinates(lat, lon) {
  checkApiKey();

  setStatus("Getting your location weather...");
  weatherPanel.classList.add("hidden");

  const query = `${lat},${lon}`;
  const [current, forecastData] = await Promise.all([
    getWeather(query),
    getForecast(query)
  ]);

  displayCurrentWeather(current);
  displayForecast(forecastData);

  weatherPanel.classList.remove("hidden");
  setStatus("");
  localStorage.setItem("lastCity", current.location.name);
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await loadWeatherByCity(cityInput.value);
  } catch (error) {
    setStatus(error.message, true);
  }
});

locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    setStatus("Geolocation is not supported by your browser.", true);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async position => {
      try {
        await loadWeatherByCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );
      } catch (error) {
        setStatus(error.message, true);
      }
    },
    () => {
      setStatus("Location permission was denied.", true);
    }
  );
});

unitToggle.addEventListener("click", async () => {
  unit = unit === "metric" ? "imperial" : "metric";
  localStorage.setItem("weatherUnit", unit);

  const lastCity = localStorage.getItem("lastCity");

  if (!lastCity) {
    updateUnits();
    return;
  }

  try {
    await loadWeatherByCity(lastCity);
  } catch (error) {
    setStatus(error.message, true);
  }
});

function updateUnits() {
  const symbol = unit === "metric" ? "°C" : "°F";
  degree.textContent = symbol;
  forecastUnit.textContent = symbol;
  unitToggle.textContent = unit === "metric" ? "Switch to °F" : "Switch to °C";
}

// Load the last searched city when the app opens.
const lastCity = localStorage.getItem("lastCity");
if (lastCity && API_KEY !== "YOUR_WEATHERAPI_KEY") {
  cityInput.value = lastCity;
  loadWeatherByCity(lastCity).catch(error => setStatus(error.message, true));
} else {
  updateUnits();
}
