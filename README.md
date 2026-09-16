# 🌦️ WeatherNow – Weather Information System

WeatherNow is a simple and responsive **Weather Information System** built using **HTML, CSS, and JavaScript**. It uses the **WeatherAPI** to fetch real-time weather information for a city entered by the user.

The project is designed to be beginner-friendly while demonstrating how JavaScript can interact with an external API and dynamically update a webpage.

## 🔗 Live Demo

👉 **Live Website:** https://darshil-parekh.github.io/Weather-Update-System-/

---

## ✨ Features

* 🌍 Search weather by city name
* 🌡️ Display current temperature
* 🌤️ Show current weather condition
* 💧 Display humidity
* 💨 Display wind speed
* 🌡️ Show feels-like temperature
* 📍 Display location information
* 🕒 Display local time of the searched location
* 🖼️ Weather condition icon
* ⚡ Real-time weather data from WeatherAPI
* 📱 Responsive design
* ❌ Error handling for invalid city names
* 🔄 Dynamic content update without refreshing the page

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### API

* WeatherAPI

### Development Tools

* Visual Studio Code
* Git
* GitHub

---

## 📂 Project Structure

```text
Weather-Update-System/
│
├── index.html
├── style.css
├── script.js
│
└── README.md
```

---

## ⚙️ How It Works

WeatherNow works by sending a request to the WeatherAPI whenever the user searches for a city.

### 1. User enters a city

The user enters a city name into the search box.

For example:

```text
London
```

### 2. JavaScript gets the input

JavaScript reads the city name entered by the user.

```javascript
const city = searchInput.value;
```

### 3. API request is sent

The application sends the city name and API key to WeatherAPI.

The request contains:

* API key
* City name
* Air quality option

### 4. API returns weather data

WeatherAPI returns the current weather information in JSON format.

The response contains information such as:

* Location
* Temperature
* Weather condition
* Humidity
* Wind speed
* Feels-like temperature
* Local time
* Weather icon

### 5. JavaScript processes the response

JavaScript receives the JSON response and extracts the required information.

```javascript
const data = await response.json();
```

### 6. Weather information is displayed

The extracted information is then inserted into the HTML elements using JavaScript DOM manipulation.

The webpage updates automatically without requiring a page refresh.

---

## 🔄 Application Flow

```text
User enters city
       ↓
JavaScript gets city name
       ↓
API request sent to WeatherAPI
       ↓
WeatherAPI processes request
       ↓
JSON weather data returned
       ↓
JavaScript reads the data
       ↓
DOM is updated
       ↓
Weather information displayed
```

---

## 🚀 How to Run the Project Locally

### Step 1 – Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/Darshil-Parekh/Weather-Update-System-.git
```

### Step 2 – Open the Project

Navigate into the project folder:

```bash
cd Weather-Update-System-
```

Open the folder in Visual Studio Code.

### Step 3 – Add Your API Key

Open:

```text
script.js
```

Add your WeatherAPI key to the API URL.

> **Important:** Avoid uploading a private API key to a public GitHub repository. For a production application, use a backend/server-side environment variable to protect the key.

### Step 4 – Run the Website

You can use the **Live Server** extension in VS Code.

Right-click:

```text
index.html
```

and select:

```text
Open with Live Server
```

The website will open in your browser.

---

## 🔑 API Used

This project uses **WeatherAPI** to retrieve current weather information.

Official website:

https://www.weatherapi.com/

The application uses the Current Weather API.

---

## 📸 Screenshots

You can add screenshots of the project here.

Example:

```markdown
![WeatherNow Home Page](screenshots/home.png)
```

You can create a folder like:

```text
screenshots/
├── home.png
└── weather-result.png
```

---

## 📚 What I Learned

While building this project, I practiced:

* JavaScript Fetch API
* Working with REST APIs
* JSON data
* Async/Await
* Promises
* DOM manipulation
* Event listeners
* Input handling
* Error handling
* Dynamic HTML updates
* Working with API responses
* Responsive web design

---

## 🔮 Future Improvements

Some features that can be added in the future:

* 📅 7-day weather forecast
* 🌧️ Hourly forecast
* 📍 Current location weather
* ⭐ Save favorite cities
* 🌙 Dark/Light mode
* 🌡️ Celsius/Fahrenheit switch
* 🌍 Multiple location support
* 📊 Weather charts
* 🌅 Sunrise and sunset information
* 📱 Progressive Web App (PWA) support

---

## 👨‍💻 Author

**Darshil Parekh**

B.E. IT Engineering Student

### GitHub

https://github.com/Darshil-Parekh

---

## 📄 License

This project is created for **learning and educational purposes**.

Feel free to explore, modify, and improve the project.

---

⭐ **If you found this project useful, consider giving the repository a star!**
