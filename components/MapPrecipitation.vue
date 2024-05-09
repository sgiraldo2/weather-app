<template>
  <div class="map-wrap">
    <div id="map" class="map" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Map, MapStyle, config } from '@maptiler/sdk';
import { WindLayer, TemperatureLayer, RadarLayer, PrecipitationLayer } from '@maptiler/weather';

import '@maptiler/sdk/dist/maptiler-sdk.css';

const myConfig = useRuntimeConfig();

const mapContainer = ref(null);

onMounted(() => {
  config.apiKey = myConfig.public.MAPTILER_API_KEY;
  // const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };
  const initialState = { lng: -96.702599, lat: 40.813618, zoom: 3 };

  const map = new Map({
    container: mapContainer.value,
    style: MapStyle.SATELLITE,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom,
  });

  // const windLayer = new WindLayer();
  // const tempLayer = new TemperatureLayer();
  // const radarLayer = new RadarLayer({ colorramp: 'clouds' });
  const precipLayer = new PrecipitationLayer({ visibility: 'none' }); // Hidden layer for data only

  map.on('load', () => {
    // map.addLayer(windLayer);
    // map.addLayer(tempLayer, 'Place labels');
    // map.addLayer(radarLayer);
    map.addLayer(precipLayer);
  });
});
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
</style>
