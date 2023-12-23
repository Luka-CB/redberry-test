<template>
  <div class="success-modal-bg">
    <div class="success-modal">
      <div class="close-btn" @click="handleCloseModal">
        <CloseIcon />
      </div>
      <div class="success-icon">
        <SuccessIcon />
      </div>
      <p class="text">ჩანაწერი წარმატებით დაემატა</p>
      <button class="modal-btn" @click="handleBtn">
        მთავარ გვერდზე დაბრუნება
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SuccessIcon from "./svgs/SuccessIcon.vue";
import CloseIcon from "./svgs/CloseIcon.vue";
import { useRouter } from "vue-router";
import { useBlogs } from "../store/blogs";

const router = useRouter();

const blogsStore = useBlogs();
const { resetPostBlog, toggleSuccessModal } = blogsStore;

const handleBtn = () => {
  router.push({ name: "home" });
  resetPostBlog();
  toggleSuccessModal(false);
};

const handleCloseModal = () => {
  resetPostBlog();
  toggleSuccessModal(false);
};
</script>
