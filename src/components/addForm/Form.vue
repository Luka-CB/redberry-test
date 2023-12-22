<template>
  <div class="add-form">
    <div class="upload-image">
      <span class="label">ატვირთეთ ფოტო</span>
      <FormImage />
    </div>
    <form>
      <RowOne />
      <RowTwo />
      <RowThree />
      <RowFour />
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

const formStore = useForm();
const { values } = storeToRefs(formStore);
const {} = formStore;

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
</script>
