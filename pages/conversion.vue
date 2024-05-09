<script setup></script>

<template>
  <div class="app-container">
    <h1 class="app-title">Weather Conversion Tool</h1>

    <!-- Temperature Conversion -->
    <div class="conversion-card">
      <h2>🌡️ Temperature Conversion</h2>
      <div class="input-group">
        <input v-model="tempValue" @input="convertTemperature" type="number" placeholder="Enter temperature" class="input-field">
        <select v-model="tempUnit" class="select-field">
          <option value="F">°F</option>
          <option value="C">°C</option>
        </select>
      </div>
      <div class="output">
        <span>Converted Temperature: </span>
        <span class="output-value">{{ convertedTemp.toFixed(2) }} °{{ tempUnit === 'F' ? 'C' : 'F' }}</span>
      </div>
    </div>

    <!-- Pressure Conversion -->
    <div class="conversion-card">
      <h2>📏 Pressure Conversion</h2>
      <div class="input-group">
        <input v-model="pressureValue" @input="convertPressure" type="number" placeholder="Enter pressure" class="input-field">
        <select v-model="pressureUnit" class="select-field">
          <option value="inHg">inHg</option>
          <option value="mb">mb</option>
        </select>
      </div>
      <div class="output">
        <span>Converted Pressure: </span>
        <span class="output-value">{{ convertedPressure.toFixed(2) }} {{ pressureUnit === 'inHg' ? 'mb' : 'inHg' }}</span>
      </div>
    </div>

    <!-- Speed Conversion -->
    <div class="conversion-card">
      <h2> 💨💨 Wind Speed Conversion</h2>
      <div class="input-group">
        <input v-model="speedValue" @input="convertSpeed" type="number" placeholder="Enter speed" class="input-field">
        <select v-model="speedUnit" class="select-field">
          <option value="MPH">MPH</option>
          <option value="KPH">KPH</option>
        </select>
      </div>
      <div class="output">
        <span>Converted Speed: </span>
        <span class="output-value">{{ convertedSpeed.toFixed(2) }} {{ speedUnit === 'MPH' ? 'KPH' : 'MPH' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tempValue: 0,
      tempUnit: 'F',
      pressureValue: 0,
      pressureUnit: 'inHg',
      speedValue: 0,
      speedUnit: 'MPH',
      convertedTemp: 0,
      convertedPressure: 0,
      convertedSpeed: 0,
    };
  },
  methods: {
    convertTemperature() {
      if (this.tempUnit === 'F') {
        this.convertedTemp = ((this.tempValue - 32) * 5) / 9;
      } else {
        this.convertedTemp = (this.tempValue * 9) / 5 + 32;
      }
    },
    convertPressure() {
      if (this.pressureUnit === 'inHg') {
        this.convertedPressure = this.pressureValue * 33.8639;
      } else {
        this.convertedPressure = this.pressureValue / 33.8639;
      }
    },
    convertSpeed() {
      if (this.speedUnit === 'MPH') {
        this.convertedSpeed = this.speedValue * 1.60934;
      } else {
        this.convertedSpeed = this.speedValue / 1.60934;
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
}

.app-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #0A74DA;
}

.conversion-card {
  background: linear-gradient(to bottom right, #28a745, #28a745);
  border: 1px solid #B0BEC5;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
}

.conversion-card:hover {
  transform: translateY(-2px);
  box-shadow: 2px 8px 12px rgba(0, 0, 0, 0.2);
}

.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.input-field, .select-field {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #B0BEC5;
  margin-right: 10px;
  transition: border-color 0.2s, background-color 0.2s;
}

.input-field:hover, .select-field:hover {
  border-color: #0A74DA;
  background-color: #3C3C3C;
}

.output {
  font-size: 2.1rem;
  color: #3C3C3C;
}

.output-value {
  font-weight: bold;
  color: #0A74DA;
}
</style>
