<template>
  <main class="slider-wrapper">
    <section class="slider-header">
      <h1 class="title">მსგავსი სტატიები</h1>
      <div class="btns">
        <button
          class="left"
          @click="handleLeftBtn"
          :disabled="sliderCount === 0"
        >
          <ChevronLeftIcon fill="#E4E3EB" />
        </button>
        <button
          class="right"
          @click="handleRightBtn"
          :disabled="
            similarBlogs.length <= 3 ||
            sliderCount === (similarBlogs.length - 3) * cardWidth
          "
        >
          <ChevronRightIcon />
        </button>
      </div>
    </section>
    <section class="slider" ref="slider">
      <BlogCard
        v-for="blog in similarBlogs"
        :key="blog.id"
        :blog="blog"
        :routeName="route.name"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import ChevronLeftIcon from "./svgs/ChevronLeftIcon.vue";
import ChevronRightIcon from "../components/svgs/ChevronRight.vue";
import { useBlogs } from "../store/blogs";
import { storeToRefs } from "pinia";
import BlogCard from "./BlogCard.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const slider = ref<HTMLDivElement | null>(null);
const sliderCount = ref(0);

const blogsStore = useBlogs();
const { similarBlogs } = storeToRefs(blogsStore);

const cardWidth = 440;

const handleRightBtn = () => {
  if (slider.value) {
    slider.value.scrollBy({
      top: 0,
      left: cardWidth,
      behavior: "smooth",
    });
    sliderCount.value = sliderCount.value + cardWidth;
  }
};

const handleLeftBtn = () => {
  if (slider.value) {
    slider.value.scrollBy({
      top: 0,
      left: -cardWidth,
      behavior: "smooth",
    });
    sliderCount.value = sliderCount.value - cardWidth;
  }
};
</script>
