<template>
  <main class="home-container">
    <section class="banner">
      <h1 class="name">ბლოგი</h1>
      <img :src="BannerImage" alt="banner image" />
    </section>
    <section class="categories">
      <div
        class="category"
        v-for="cat in categories"
        :key="cat.id"
        :style="{
          backgroundColor: cat.background_color,
          color: cat.text_color,
        }"
      >
        <span>{{ cat.title }}</span>
      </div>
    </section>
    <section class="cards-wrapper">
      <div class="cards">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import BannerImage from "../assets/images/home-img.png";
import { useCategories } from "../store/categories";
import BlogCard from "../components/BlogCard.vue";

const { categories } = storeToRefs(useCategories());
const { getCategories } = useCategories();

getCategories();
</script>
