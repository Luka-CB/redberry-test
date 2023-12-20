<template>
  <nav class="navigation">
    <section class="logo">
      <img :src="Logo" alt="logo" />
    </section>
    <section class="auth">
      <button class="auth-btn">შესვლა</button>
    </section>
  </nav>
</template>

<script setup lang="ts">
import Logo from "../assets/images/logo.png";
</script>
