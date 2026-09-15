javascript
// ==========================================
// WEATHER API SETTINGS
// ==========================================

const API_KEY = "YOUR_NEW_API_KEY";

const BASE_URL = "https://api.weatherapi.com/v1/current.json";


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const searchForm = document.querySelector("#searchForm");

const cityInput = document.querySelector("#cityInput");

const weatherPanel = document.querySelector("#weatherPanel");

const status = document.querySelector("#status");

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

const locationButton = document.querySelector("#locationBtn");


// ==========================================
// SEARCH WEATHER
// ==========================================

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const city = cityInput.value.trim();


    if (city === "") {

        showError("Please enter a city name.");

        return;
    }


    getWeather(city);

});


// ==========================================
// GET WEATHER FROM API
// ==========================================

async function getWeather(city) {

    showLoading();


    const url =
        `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;


    try {

        const response = await fetch(url);


        if (!response.ok) {

            throw new Error("Unable to get weather data.");

        }


        const data = await response.json();


        if (data.error) {

            throw new Error(data.error.message);

        }


        displayWeather(data);


    }

    catch (error) {

        showError(error.message);

    }

}


// ==========================================
// DISPLAY WEATHER
// ==========================================

function displayWeather(data) {

    console.log(data);


    const location = data.location;

    const current = data.current;


    // ------------------------------------------
    // LOCATION
    // ------------------------------------------

    cityName.textContent =
        `${location.name}, ${location.country}`;


    // ------------------------------------------
    // DATE AND TIME
    // ------------------------------------------

    dateText.textContent =
        location.localtime;


    // ------------------------------------------
    // WEATHER CONDITION
    // ------------------------------------------

    description.textContent =
        current.condition.text;


    // ------------------------------------------
    // WEATHER ICON
    // ------------------------------------------

    weatherIcon.src =
        "https:" + current.condition.icon;


    weatherIcon.alt =
        current.condition.text;


    // ------------------------------------------
    // TEMPERATURE
    // ------------------------------------------

    temperature.textContent =
        Math.round(current.temp_c);


    degree.textContent =
        "°C";


    // ------------------------------------------
    // FEELS LIKE
    // ------------------------------------------

    feelsLike.textContent =
        `${Math.round(current.feelslike_c)}°C`;


    // ------------------------------------------
    // HUMIDITY
    // ------------------------------------------

    humidity.textContent =
        `${current.humidity}%`;


    // ------------------------------------------
    // WIND
    // ------------------------------------------

    wind.textContent =
        `${current.wind_kph} km/h`;


    // ------------------------------------------
    // PRESSURE
    // ------------------------------------------

    pressure.textContent =
        `${current.pressure_mb} hPa`;


    // ------------------------------------------
    // VISIBILITY
    // ------------------------------------------

    visibility.textContent =
        `${current.vis_km} km`;


    // ------------------------------------------
    // SHOW WEATHER PANEL
    // ------------------------------------------

    weatherPanel.classList.remove("hidden");


    // ------------------------------------------
    // CLEAR STATUS MESSAGE
    // ------------------------------------------

    status.textContent = "";

}


// ==========================================
// LOADING MESSAGE
// ==========================================

function showLoading() {

    status.textContent =
        "Loading weather...";

    status.classList.remove("error");


    weatherPanel.classList.add("hidden");

}


// ==========================================
// ERROR MESSAGE
// ==========================================

function showError(message) {

    status.textContent =
        message;

    status.classList.add("error");


    weatherPanel.classList.add("hidden");

}
