<template>
  <div class="container">
    <Navigation />
    <router-view />

    <LoginModal v-if="isAuthModalActive" />
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import Navigation from "./components/Navigation.vue";
import LoginModal from "./components/LoginModal.vue";
import { useAuth } from "./store/auth";
import { storeToRefs } from "pinia";

const authStore = useAuth();
const { isAuthModalActive } = storeToRefs(authStore);

watchEffect(() => {
  if (isAuthModalActive.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
});
</script>
