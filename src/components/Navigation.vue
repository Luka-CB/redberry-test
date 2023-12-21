<template>
  <nav :class="[route.name !== 'add' ? 'navigation' : 'add-blog-nav']">
    <section class="logo">
      <img :src="Logo" alt="logo" />
    </section>
    <section class="auth" v-if="route.name !== 'add'">
      <button class="auth-btn">შესვლა</button>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Logo from "../assets/images/logo.png";

const route = useRoute();
</script>
