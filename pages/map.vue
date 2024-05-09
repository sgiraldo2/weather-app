<script setup>
const layers = [
  { name: 'All', component: 'MapComponent' },
  { name: 'Wind', component: 'MapWind' },
  { name: 'Temperature', component: 'MapTemperature' },
  { name: 'Precipitation', component: 'MapPrecipitation' },
];

const currentLayer = ref(0);
</script>

<template>
  <div>
    <div class="container-sm mt-3">
      <h1 class="text-center">Map Page</h1>
      <div class="d-flex justify-content-center">
        <button
          v-for="(layer, index) in layers"
          :key="index"
          @click="currentLayer = index"
          class="btn btn-primary mx-2"
          :class="{ active: currentLayer === index }"
        >
          {{ layer.name }}
        </button>
      </div>

      <MapComponent v-if="currentLayer == 0" />
      <MapWind v-else-if="currentLayer == 1" />
      <MapTemperature v-else-if="currentLayer == 2" />
      <MapPrecipitation v-else-if="currentLayer == 3" />
    </div>
  </div>
</template>
