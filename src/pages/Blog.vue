<template>
  <main class="blog-container">
    <Spinner v-if="isGetBlogLoading" />
    <div class="back-btn" @click="handleBackBtn">
      <ChevronLeftIcon />
    </div>
    <div class="blog">
      <div class="image">
        <img :src="blog.image" :alt="blog.title" />
      </div>
      <h4 class="author">{{ blog.author }}</h4>
      <div class="pub-date">
        <h6 class="date">{{ blog.publish_date }}</h6>
        <span>&#183;</span>
        <h6 class="email">{{ blog.email }}</h6>
      </div>
      <h2 class="title">{{ blog.title }}</h2>
      <div class="categories">
        <div
          class="category"
          v-for="category in blog.categories"
          :key="category.id"
          :style="{
            backgroundColor: category.background_color,
            color: category.text_color,
          }"
        >
          <span>{{ category.title }}</span>
        </div>
      </div>
      <p class="description">{{ blog.description }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBlog } from "../store/blog";
import { useRoute, useRouter } from "vue-router";
import Spinner from "../components/Spinner.vue";
import ChevronLeftIcon from "../components/svgs/ChevronLeftIcon.vue";

const route = useRoute();
const router = useRouter();

const blogStore = useBlog();
const { isGetBlogLoading, blog } = storeToRefs(blogStore);
const { getBlog } = blogStore;

const blogId = computed(() => route.params.blogId);

getBlog(+blogId.value);

const handleBackBtn = () => router.go(-1);
</script>
