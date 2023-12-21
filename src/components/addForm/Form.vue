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
        <button class="btn" type="submit">გამოქვეყნება</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import FormImage from "./FormImage.vue";
import RowOne from "./RowOne.vue";
import RowTwo from "./RowTwo.vue";
import RowThree from "./RowThree.vue";
import RowFour from "./RowFour.vue";
</script>
