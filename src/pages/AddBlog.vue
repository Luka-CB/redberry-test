<template>
  <main class="add-blog-container" @click="handleCloseDropdown">
    <div class="back-btn">
      <ChevronLeftIcon />
    </div>
    <div class="add-form-wrapper">
      <h2 class="title">ბლოგის დამატება</h2>
      <AddForm />
    </div>
  </main>
</template>

<script setup lang="ts">
import ChevronLeftIcon from "../components/svgs/ChevronLeftIcon.vue";
import AddForm from "../components/addForm/Form.vue";
import { useCategories } from "../store/categories";

const categoryStore = useCategories();
const { toggleCategoryDropdown } = categoryStore;

const handleCloseDropdown = () => toggleCategoryDropdown(false);
</script>
