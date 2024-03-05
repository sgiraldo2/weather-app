<script setup>
useSeoMeta({
  title: 'Weather App',
  description: 'Group 1 METR 100 Final Project',
  ogTitle: 'Weather App',
  ogDescription: 'Group 1 METR 100 Final Project',
  ogImage: '/favicon.png',
  ogUrl: 'https://weather.santiago.works',
  twitterTitle: 'Weather App',
  twitterDescription: 'Group 1 METR 100 Final Project',
  twitterImage: '/favicon.png',
  twitterCard: 'summary_large_image',
});

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico',
    },
  ],
});
</script>

<template>
  <div>
    <Navbar />
    <div class="navbar-padding">
      <NuxtPage />
    </div>
  </div>
</template>

<style>
/* Global colors - UNL Colors */
:root {
  /* --bs-body-bg: #212121 !important; */
  --unl-scarlet: #D00000 !important;
  --unl-cream: #F5F1E7 !important;
  --unl-gray: #C7C8CA !important;
  --unl-lighter-cream: #FFFFFB !important;
  --unl-navy: #001226 !important;
  --unl-cerulean: #249AB5 !important;
  --unl-green: #BCCB2A !important;
  --unl-orange: #F58A1F !important;
  --unl-lapis: #005D84 !important;
  --unl-yellow: #FFD74F !important;
  --unl-purple: #A5228D !important;
  --navbar-height: 52px !important;
}

@media (prefers-color-scheme: dark) {
  :root {
    --unl-lighter-cream: #242424 !important;
  }
}

.bg-unl-scarlet {
  background-color: var(--unl-scarlet) !important;
}
.bg-unl-cream {
  background-color: var(--unl-cream) !important;
}
.bg-unl-gray {
  background-color: var(--unl-gray) !important;
}
.bg-unl-lighter-cream {
  background-color: var(--unl-lighter-cream) !important;
}
.bg-unl-navy {
  background-color: var(--unl-navy) !important;
}
.bg-unl-cerulean {
  background-color: var(--unl-cerulean) !important;
}
.bg-unl-green {
  background-color: var(--unl-green) !important;
}
.bg-unl-lapis {
  background-color: var(--unl-lapis) !important;
}
.bg-unl-yellow {
  background-color: var(--unl-yellow) !important;
}
.bg-unl-purple {
  background-color: var(--unl-purple) !important;
}

.navbar-padding {
  padding-top: var(--navbar-height); /* Default for desktop */
}
</style>
