<template>
  <div class="add-form">
    <div class="upload-image">
      <span class="label">ატვირთეთ ფოტო</span>
      <FormImage />
    </div>
    <form @submit.prevent="handleSubmit">
      <RowOne :success="isPostBlogSuccess" />
      <RowTwo :success="isPostBlogSuccess" />
      <RowThree :success="isPostBlogSuccess" />
      <RowFour :success="isPostBlogSuccess" />
      <div class="submit-btn">
        <button class="btn" type="submit" :disabled="isDisabled">
          გამოქვეყნება
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import FormImage from "./FormImage.vue";
import RowOne from "./RowOne.vue";
import RowTwo from "./RowTwo.vue";
import RowThree from "./RowThree.vue";
import RowFour from "./RowFour.vue";
import { useForm } from "../../store/form";
import { storeToRefs } from "pinia";
import { useBlogs } from "../../store/blogs";

const formStore = useForm();
const { values, imageFile } = storeToRefs(formStore);
const { toggleImageError } = formStore;

const blogsStore = useBlogs();
const { isPostBlogSuccess } = storeToRefs(blogsStore);
const { postBlog } = blogsStore;

const isDisabled = ref(true);

watchEffect(() => {
  if (
    values.value.author.success.succOne &&
    values.value.author.success.succTwo &&
    values.value.author.success.succThree &&
    values.value.title.success &&
    values.value.description.success &&
    values.value.date.success &&
    values.value.categories.success
  ) {
    isDisabled.value = false;
  } else {
    isDisabled.value = true;
  }
});

const handleSubmit = () => {
  if (!imageFile.value.name) {
    toggleImageError(true);
    return;
  }

  const data = {
    title: values.value.title.value,
    description: values.value.description.value,
    image: imageFile.value.image as string,
    author: values.value.author.value,
    publish_date: values.value.date.value,
    categories: values.value.categories.value,
    email: values.value.email.value,
  };

  postBlog(data);
};
</script>
