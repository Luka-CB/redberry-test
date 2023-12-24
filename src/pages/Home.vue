<template>
  <main class="home-container">
    <section class="banner">
      <h1 class="name">ბლოგი</h1>
      <img :src="BannerImage" alt="banner image" />
    </section>
    <section class="categories">
      <div
        v-for="cat in categories"
        :key="cat.id"
        :class="[
          categoryIdsForFilter.includes(cat.id)
            ? 'category-active'
            : 'category',
        ]"
        :style="{
          backgroundColor: cat.background_color,
          color: cat.text_color,
        }"
        @click="handlePickCategoryForFilter(cat.id)"
      >
        <span>{{ cat.title }}</span>
      </div>
    </section>
    <section class="cards-wrapper">
      <Spinner v-if="isGetBlogsLoading" />
      <div class="cards">
        <BlogCard
          v-for="blog in categoryIdsForFilter.length > 0 ||
          filteredBlogs.length > 0
            ? filteredBlogs
            : blogs"
          :key="blog.id"
          :blog="blog"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { storeToRefs } from "pinia";
import BannerImage from "../assets/images/home-img.png";
import { useCategories } from "../store/categories";
import BlogCard from "../components/BlogCard.vue";
import { useBlogs } from "../store/blogs";
import Spinner from "../components/Spinner.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const categoriesStore = useCategories();
const { categories } = storeToRefs(categoriesStore);
const { getCategories } = categoriesStore;

const blogsStore = useBlogs();
const { blogs, filteredBlogs, isGetBlogsLoading, categoryIdsForFilter } =
  storeToRefs(blogsStore);
const {
  getBlogs,
  setCategoryIdsForFilter,
  setCategoryIdsForFilterWithUrlVal,
  removeFilter,
} = blogsStore;

getCategories();
getBlogs();

watchEffect(() => {
  setCategoryIdsForFilterWithUrlVal(categoryIdsForFilter.value);
});

const query = route.query;

watchEffect(() => {
  if (!query.category) {
    removeFilter();
  }
});

const handlePickCategoryForFilter = (catId: number) => {
  setCategoryIdsForFilter(catId);
  router.push({
    name: "home",
    query: { category: "1" },
  });
};
</script>
