<script setup></script>

<template>
  <div class="container">
    <h1 class="header">Weather Forecast</h1>
    
    <!-- Search bar and buttons -->
    <div class="input-group">
      <input
        v-model="locationInput"
        @keyup.enter="fetchForecastByLocation"
        class="input"
        placeholder="Enter a location"
      />
      <button class="button primary" @click="fetchForecastByLocation">Get Forecast</button>
      <button class="button secondary" @click="useUserLocation">Use Current Location</button>
    </div>

    <!-- Display forecast information -->
    <div v-if="forecastData && forecastData.length > 0" class="forecast-info">
      <div v-for="day in forecastData" :key="day.datetime" class="forecast-box">
        <div class="forecast-date">
          {{ new Date(day.datetime).toLocaleDateString() }}
        </div>
        <div class="forecast-weather">
          <i class="forecast-icon">🌡️</i>
          <span class="forecast-text">{{ day.tempmax }}°F / {{ day.tempmin }}°F</span>
        </div>
        <div class="forecast-weather">
          <i class="forecast-icon">☁️</i>
          <span class="forecast-text">{{ day.conditions }}</span>
        </div>
        <div class="forecast-weather">
          <i class="forecast-icon">💨</i>
          <span class="forecast-text">{{ day.windspeed }} mph</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const locationInput = ref('');
const forecastData = ref([]);

const config = useRuntimeConfig();

// API key for Visual Crossing
const apiKey = config.public.VISUAL_CROSSING_API_KEY;

// Function to adjust dates for timezones
const adjustDateForTimezone = (dateString) => {
  const date = new Date(dateString);
  // Adjust date for the user's timezone
  const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
  return new Date(date.getTime() + userTimezoneOffset);
};

// Fetch forecast data based on user input location
const fetchForecastByLocation = async () => {
  try {
    const location = encodeURIComponent(locationInput.value);
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=days&key=${apiKey}&contentType=json`
    );
    if (response.ok) {
      const data = await response.json();
      // Adjust dates for timezone differences
      forecastData.value = data.days.map(day => ({
        ...day,
        datetime: adjustDateForTimezone(day.datetime),
      }));
    } else {
      console.error('Error fetching forecast data:', response.statusText);
      alert('Unable to fetch forecast data. Please check your location or try again later.');
    }
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    alert('Unable to fetch forecast data. Please check your location or try again later.');
  }
};

// Use the user's current location to fetch forecast data
const useUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      try {
        const location = `${latitude},${longitude}`;
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=days&key=${apiKey}&contentType=json`
        );
        if (response.ok) {
          const data = await response.json();
          // Adjust dates for timezone differences
          forecastData.value = data.days.map(day => ({
            ...day,
            datetime: adjustDateForTimezone(day.datetime),
          }));
        } else {
          console.error('Error fetching forecast data:', response.statusText);
          alert('Unable to fetch forecast data. Please check your location or try again later.');
        }
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        alert('Unable to fetch forecast data. Please check your location or try again later.');
      }
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
    alert('Geolocation is not supported by this browser.');
  }
};

// Fetch forecast data automatically when the page loads
onMounted(() => {
  useUserLocation();
});
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
  color: #ffffff;
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

/* Forecast info */
.forecast-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

/* Forecast box */
.forecast-box {
  background-color: #4e5f37;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Forecast date */
.forecast-date {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Forecast weather */
.forecast-weather {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

/* Forecast icon */
.forecast-icon {
  display: block;
  font-size: 24px;
  color: #333;
}

/* Forecast text */
.forecast-text {
  font-size: 20px;
}
</style>


