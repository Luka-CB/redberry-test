<template>
  <div class="row2">
    <div class="input-box">
      <label for="description">აღწერა *</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        placeholder="შეიყვანეთ აღწერა"
        v-model="description"
        :class="{
          inputError: values.description.error,
          inputSuccess: values.description.success,
        }"
      ></textarea>
      <span
        class="validation"
        :class="{
          error: values.description.error,
          success: values.description.success,
        }"
        >მინიმუმ 4 სიმბოლო</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useForm } from "../../store/form";
import { storeToRefs } from "pinia";

const props = defineProps(["success"]);

const formStore = useForm();
const { values } = storeToRefs(formStore);
const { setDescription } = formStore;

const description = ref(values.value.description.value || "");
const descError = ref(false);
const descSuccess = ref(false);

watchEffect(() => {
  if (props.success) {
    description.value = "";
  }
});

const minFourSymbols = /^\S.{3,}(?:\s\S.{1,})*$/;

watchEffect(() => {
  if (description.value && !minFourSymbols.test(description.value)) {
    descError.value = true;
  } else {
    descError.value = false;
  }

  if (description.value && minFourSymbols.test(description.value)) {
    descSuccess.value = true;
  } else {
    descSuccess.value = false;
  }

  setDescription({
    value: description.value,
    error: descError.value,
    success: descSuccess.value,
  });
});
</script>
