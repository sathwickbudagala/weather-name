const apiKey = '792338a5c4dad047da382847c0133352'; // Replace with your actual OpenWeatherMap API key

const getWeatherButton = document.getElementById('getWeather');
const cityInput = document.getElementById('city');
const cityHeading = document.getElementById('city-heading');
const searchAgainButton = document.getElementById('searchAgain');
const clockDiv = document.getElementById('clock'); // The clock div
const loadingSpinner = document.getElementById('loading'); // The loading spinner

// Function to show the live clock
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  clockDiv.textContent = `Local Time: ${timeString}`;
}

// Get weather on button click
getWeatherButton.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    loadingSpinner.style.display = 'inline-block'; // Show loading spinner
    fetchWeather(city);
  } else {
    alert('Please enter a city name');
  }
});

// Reload page on "Search Again"
searchAgainButton.addEventListener('click', () => {
  window.location.reload();
});

// Fetch weather data
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === '404') {
      alert('City not found');
      return;
    }

    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const iconCode = data.weather[0].icon;

    cityHeading.textContent = city.toUpperCase();

    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('description').textContent = `Description: ${description}`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} m/s`;

    document.getElementById('weather-icon').innerHTML = `
      <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">
    `;

    searchAgainButton.style.display = 'inline-block';

    // Show the clock after the weather info is fetched
    clockDiv.style.display = 'block';

    // Update the clock immediately and then every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call to set the time

    // Hide the loading spinner
    loadingSpinner.style.display = 'none';

  } catch (error) {
    console.error('Error fetching weather:', error);
    loadingSpinner.style.display = 'none'; // Hide the loading spinner in case of an error
  }
}
