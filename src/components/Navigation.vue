<template>
  <nav :class="[route.name !== 'add' ? 'navigation' : 'add-blog-nav']">
    <section class="logo">
      <img :src="Logo" alt="logo" @click="handleHomeBtn" />
    </section>
    <section class="auth" v-if="route.name !== 'add'">
      <div class="authenticated" v-if="isAuth">
        <button class="add-btn" @click="handleAddBtn">დაამატე ბლოგი</button>
        <button class="logout-btn" @click="handleLogout">გამოსვლა</button>
      </div>
      <button class="auth-btn" @click="handleAuthBtn" v-else>შესვლა</button>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import Logo from "../assets/images/logo.png";
import { useAuth } from "../store/auth";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();

const authStore = useAuth();
const { isAuth } = storeToRefs(authStore);
const { toggleAuthModal, logout } = authStore;

const handleHomeBtn = () => router.push({ name: "home" });
const handleAddBtn = () => router.push({ name: "add" });

const handleAuthBtn = () => toggleAuthModal(true);
const handleLogout = () => {
  logout();
  router.push({ name: "home" });
};
</script>
