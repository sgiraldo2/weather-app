<template>
  <div class="map-wrap">
    <div id="map" class="map" ref="mapContainer"></div>
    <!-- Placeholder for popup or information display -->
    <div v-for="popup in popups" :key="popup.id" class="popup" :style="{ top: popup.y + 'px', left: popup.x + 'px' }">
      {{ popup.content }}
    </div>
  </div>
  <!-- <div id="time-info">
    <span id="time-text">{{ timeText }}</span>
    <button @click="togglePlay">{{ playButtonText }}</button>
    <input type="range" v-model="currentTime" @input="updateAnimationTime" :min="startTime" :max="endTime" step="1" />
  </div> -->
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { Map, MapStyle, config, NavigationControl } from '@maptiler/sdk';
import { WindLayer, TemperatureLayer, RadarLayer, PrecipitationLayer } from '@maptiler/weather';
// import { WindLayer, TemperatureLayer, PrecipitationLayer, PressureLayer, RadarLayer } from '@maptiler/weather';

import '@maptiler/sdk/dist/maptiler-sdk.css';

const myConfig = useRuntimeConfig();

const mapContainer = ref(null);

onMounted(() => {
  config.apiKey = myConfig.public.MAPTILER_API_KEY;
  // const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };
  const initialState = { lng: -96.702599, lat: 40.813618, zoom: 4 };


  const map = new Map({
    container: mapContainer.value,
    style: MapStyle.SATELLITE,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom,
  });


  const windLayer = new WindLayer();
  const tempLayer = new TemperatureLayer();
  const radarLayer = new RadarLayer({ colorramp: 'clouds' });
  const precipLayer = new PrecipitationLayer({ visibility: 'none' }); // Hidden layer for data only

  map.on('load', () => {
    map.addLayer(windLayer);
    map.addLayer(tempLayer, 'Place labels');
    map.addLayer(radarLayer);
    map.addLayer(precipLayer);
    // setupPopups(map); // Define this function based on your popup logic
  });
});

// function setupPopups(map) {
//   map.on('click', (event) => {
//     const coordinates = event.lngLat;
//     const weatherData = getWeatherDataAtPoint(coordinates); // Define this function to fetch data
//     popups.push({
//       id: Date.now(), // Simple ID generation
//       x: event.point.x,
//       y: event.point.y,
//       content: `Temperature: ${weatherData.temperature}°C`,
//     });
//   });
// }

// function getWeatherDataAtPoint(coordinates) {
//   // Implementation to fetch weather data at a specific point
//   return {
//     temperature: 25, // Placeholder
//   };
// }
</script>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh - (77px + var(--navbar-height))); /* calculate height of the screen minus the heading */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
/* Additional CSS here */
.popup {
  position: absolute;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
</style>
