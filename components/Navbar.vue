<script setup></script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top border-bottom border-4 navbar-style bg-unl-lighter-cream pt-2 pb-0">
    <div class="container-fluid d-flex justify-content-between px-5">
      <!-- Logo on the left -->
      <NuxtLink to="/" class="navbar-brand fs-3">Weather App</NuxtLink>
      <div class="d-flex align-items-center">
        <NuxtLink to="/map" class="navbar-brand px-3 bi bi-map fs-3"></NuxtLink>
        <NuxtLink to="/radar" class="navbar-brand px-3 bi bi-radar fs-3"></NuxtLink>
        <NuxtLink to="/my-location" class="navbar-brand px-3 bi bi-crosshair fs-3"></NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-style {
  min-height: var(--navbar-height) !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  border-color: var(--unl-scarlet) !important;
}
</style>
