<template>
  <main class="add-blog-container" @click="handleCloseDropdown">
    <Spinner v-if="isPostBlogLoading" />
    <SuccessModal v-if="isSuccessModalActive" />
    <div class="back-btn" @click="handleBackBtn">
      <ChevronLeftIcon />
    </div>
    <div class="add-form-wrapper">
      <h2 class="title">ბლოგის დამატება</h2>
      <AddForm />
    </div>
  </main>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import ChevronLeftIcon from "../components/svgs/ChevronLeftIcon.vue";
import AddForm from "../components/addForm/Form.vue";
import { useCategories } from "../store/categories";
import { useBlogs } from "../store/blogs";
import { useForm } from "../store/form";
import { storeToRefs } from "pinia";
import Spinner from "../components/Spinner.vue";
import SuccessModal from "../components/SuccessModal.vue";
import { useRouter } from "vue-router";
import { useAuth } from "../store/auth";

const router = useRouter();

const categoryStore = useCategories();
const { toggleCategoryDropdown, resetPickedCategories } = categoryStore;

const blogsStore = useBlogs();
const { isPostBlogLoading, isPostBlogSuccess, isSuccessModalActive } =
  storeToRefs(blogsStore);
const { toggleSuccessModal } = blogsStore;

const formStore = useForm();
const { resetForm } = formStore;

const authStore = useAuth();
const { isAuth } = storeToRefs(authStore);

const handleCloseDropdown = () => toggleCategoryDropdown(false);

watchEffect(() => {
  if (!isAuth.value) {
    router.push({ name: "home" });
  }
});

watchEffect(() => {
  if (isPostBlogSuccess.value) {
    toggleSuccessModal(true);
    resetForm();
    resetPickedCategories();
  }
});

const handleBackBtn = () => router.push({ name: "home" });
</script>
