<template>
  <div class="row1">
    <div class="input-box">
      <label for="author">ავტორი *</label>
      <input
        type="text"
        name="author"
        id="author"
        placeholder="შეიყვანეთ ავტორი"
        v-model="author"
        :class="{
          inputError:
            values.author.errors.errOne ||
            values.author.errors.errTwo ||
            values.author.errors.errThree,
          inputSuccess:
            values.author.success.succOne &&
            values.author.success.succTwo &&
            values.author.success.succThree,
        }"
      />
      <ul>
        <li
          :class="{
            error: values.author.errors.errOne,
            success: values.author.success.succOne,
            none:
              values.author.success.succOne &&
              values.author.success.succTwo &&
              values.author.success.succThree,
          }"
        >
          მინიმუმ 4 სიმბოლო
        </li>
        <li
          :class="{
            error: values.author.errors.errTwo,
            success: values.author.success.succTwo,
            none:
              values.author.success.succOne &&
              values.author.success.succTwo &&
              values.author.success.succThree,
          }"
        >
          მინიმუმ ორი სიტყვა
        </li>
        <li
          :class="{
            error: values.author.errors.errThree,
            success: values.author.success.succThree,
            none:
              values.author.success.succOne &&
              values.author.success.succTwo &&
              values.author.success.succThree,
          }"
        >
          მხოლოდ ქართული სიმბოლოები
        </li>
      </ul>
    </div>
    <div class="input-box">
      <label for="title">სათაური *</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="შეიყვანეთ სათაური"
        v-model="title"
        :class="{
          inputError: values.title.error,
          inputSuccess: values.title.success,
        }"
      />
      <span
        class="validation"
        :class="{
          error: values.title.error,
          success: values.title.success,
          none: values.title.success,
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
const { setAuthor, setTitle } = formStore;

const author = ref(values.value.author.value || "");
const authorError = ref({ errOne: false, errTwo: false, errThree: false });
const authorSuccess = ref({ succOne: false, succTwo: false, succThree: false });

const title = ref(values.value.title.value || "");
const titleError = ref(false);
const titleSuccess = ref(false);

const minTwoWords = /^\S+(\s+\S+){1,}$/;
const onlyGeoLetters = /^[ა-ჰ\s]+$/;

watchEffect(() => {
  if (props.success) {
    author.value = "";
    title.value = "";
  }
});

watchEffect(() => {
  if (author.value && author.value.length < 4) {
    authorError.value.errOne = true;
  }

  if (author.value && author.value.length >= 4) {
    authorSuccess.value.succOne = true;
  } else {
    authorSuccess.value.succOne = false;
  }

  if (author.value && !minTwoWords.test(author.value)) {
    authorError.value.errTwo = true;
  }

  if (author.value && minTwoWords.test(author.value)) {
    authorSuccess.value.succTwo = true;
  } else {
    authorSuccess.value.succTwo = false;
  }

  if (author.value && !onlyGeoLetters.test(author.value)) {
    authorError.value.errThree = true;
  }

  if (author.value && onlyGeoLetters.test(author.value)) {
    authorSuccess.value.succThree = true;
  } else {
    authorSuccess.value.succThree = false;
  }

  setAuthor({
    errors: authorError.value,
    success: authorSuccess.value,
    value: author.value,
  });
});

watchEffect(() => {
  if (title.value && title.value.length < 4) {
    titleError.value = true;
  }

  if (title.value && title.value.length >= 4) {
    titleSuccess.value = true;
  } else {
    titleSuccess.value = false;
  }

  setTitle({
    value: title.value,
    error: titleError.value,
    success: titleSuccess.value,
  });
});
</script>
