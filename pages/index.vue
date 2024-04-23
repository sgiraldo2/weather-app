<script setup></script>


<template>
  <div class="container">
    <h1 class="header">Weather Dashboard</h1>
    
    <!-- Search bar and buttons -->
    <div class="input-group">
      <input
        v-model="locationInput"
        @keyup.enter="fetchWeatherByLocation"
        class="input"
        placeholder="Enter a location"
      />
      <button class="button primary" @click="fetchWeatherByLocation">Get Weather</button>
      <button class="button secondary" @click="useUserLocation">Use Current Location</button>
    </div>

    <!-- Display weather information -->
    <div v-if="weatherData && weatherData.currentConditions" class="weather-info">
      <div class="weather-box">
        <i class="weather-icon">Temperature 🌡️</i>
        <span class="weather-text">{{ weatherData.currentConditions.temp }}°F</span>
      </div>
      <div class="weather-box">
        <i class="weather-icon">Conditions ☁️</i>
        <span class="weather-text">{{ weatherData.currentConditions.conditions }}</span>
      </div>
      <div class="weather-box">
        <i class="weather-icon">Wind Speed 💨</i>
        <span class="weather-text">{{ weatherData.currentConditions.windspeed }} mph</span>
      </div>
      <div class="weather-box">
        <i class="weather-icon">Wind Direction 💨</i>
        <span class="weather-text">{{ weatherData.currentConditions.winddir}}˚</span>
      </div>
      <div class="weather-box">
        <i class="weather-icon">Humidity 💧</i>
        <span class="weather-text">{{ weatherData.currentConditions.humidity }}%</span>
      </div>
      <div class="weather-box">
        <i class="weather-icon">Dew Point 🌡️</i>
        <span class="weather-text">{{ weatherData.currentConditions.dew}}°F</span>
      </div>
      <div class="weather-box">
        <i class="weather-icon">Feels Like Temperature 🌡️</i>
        <span class="weather-text">{{ weatherData.currentConditions.feelslike}}°F</span>
      </div>
      <div class="weather-box">
        <i class="weather-icon">Pressure ⬇️</i>
        <span class="weather-text">{{ weatherData.currentConditions.pressure}} mb</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const locationInput = ref('');
const weatherData = ref(null);

const config = useRuntimeConfig();

// API key for Visual Crossing
const apiKey = config.public.VISUAL_CROSSING_API_KEY;

// Fetch weather data based on user input location
const fetchWeatherByLocation = async () => {
  try {
    const location = encodeURIComponent(locationInput.value);
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=${apiKey}&contentType=json`,
      {
        method: 'GET',
        headers: {},
      }
    );
    if (response.ok) {
      const data = await response.json();
      weatherData.value = data;
    } else {
      console.error('Error fetching weather data:', response.statusText);
      alert('Unable to fetch weather data. Please check your location or try again later.');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Unable to fetch weather data. Please check your location or try again later.');
  }
};

// Use the user's current location to fetch weather data
const useUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      try {
        const location = `${latitude},${longitude}`;
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=${apiKey}&contentType=json`,
          {
            method: 'GET',
            headers: {},
          }
        );
        if (response.ok) {
          const data = await response.json();
          weatherData.value = data;
        } else {
          console.error('Error fetching weather data:', response.statusText);
          alert('Unable to fetch weather data. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Unable to fetch weather data. Please try again later.');
      }
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
    alert('Geolocation is not supported by this browser.');
  }
};



</script>

<style>
/* Container */
.container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Header */
.header {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #f9efef;
  margin-bottom: 20px;
}

/* Input group */
.input-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

/* Input */
.input {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  flex-grow: 1;
}

/* Buttons */
.button {
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.button.primary {
  background-color: #007bff;
  color: white;
}

.button.secondary {
  background-color: #28a745;
  color: white;
}

.button:hover {
  opacity: 0.9;
}

/* Weather info */
.weather-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-items: center;
}

/* Weather box */
.weather-box {
  background-color: #4e5f37;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Weather icon */
.weather-icon {
  display: block;
  font-size: 24px;
  margin-bottom: 5px;
}

/* Weather text */
.weather-text {
  font-size: 20px;
  font-weight: bold;
}


</style>
