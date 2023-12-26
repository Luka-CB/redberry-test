<template>
  <div class="card">
    <div class="image">
      <img :src="blog.image" :alt="blog.title" />
    </div>
    <h4 class="author">{{ blog.author }}</h4>
    <span class="date">{{ blog.publish_date }}</span>
    <h2 class="title">
      {{
        blog.title?.length <= 64
          ? blog.title
          : blog.title?.substring(0, 64) + "..."
      }}
    </h2>
    <div class="card-categories">
      <div
        class="category"
        v-for="category in blog.categories"
        :key="category.id"
        :style="{
          backgroundColor: category.background_color,
          color: category.text_color,
        }"
      >
        {{ category.title }}
      </div>
    </div>
    <p class="description">
      {{
        blog.description?.length <= 86
          ? blog.description
          : blog.description?.substring(0, 86) + "..."
      }}
    </p>
    <div class="link">
      <router-link :to="{ name: 'blog', params: { blogId: blog.id } }"
        >სრულად ნახვა</router-link
      >
      <ArrowIcon />
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from "../components/svgs/ArrowIcon.vue";
import { getBlogIFace } from "../store/blogs";

const { blog } = defineProps<{ blog: getBlogIFace }>();
</script>
