<template>
  <nav :class="[route.name !== 'add' ? 'navigation' : 'add-blog-nav']">
    <section class="logo">
      <img :src="Logo" alt="logo" @click="handleHomeBtn" />
    </section>
    <section class="auth" v-if="route.name !== 'add'">
      <button class="auth-btn">შესვლა</button>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import Logo from "../assets/images/logo.png";

const route = useRoute();
const router = useRouter();

const handleHomeBtn = () => router.push({ name: "home" });
</script>
