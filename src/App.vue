<template>
  <div class="container">
    <Navigation />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
</script>
