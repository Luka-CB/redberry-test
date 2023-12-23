<template>
  <div class="row3">
    <div class="input-box">
      <label for="date">გამოყენების თარიღი *</label>
      <input
        type="date"
        v-model="date"
        :class="{
          inputError: values.date.error,
          inputSuccess: values.date.success,
        }"
      />
    </div>
    <div class="category-wrapper" @click.stop>
      <label>კატეგორია *</label>
      <div
        :class="[
          values.categories.error
            ? 'inputError'
            : values.categories.success
            ? 'inputSuccess'
            : 'category-input',
        ]"
      >
        <div class="picked-categories" v-if="pickedCategories.length > 0">
          <div
            class="category"
            v-for="pkdCat in pickedCategories"
            :key="pkdCat.id"
            :style="{
              backgroundColor: pkdCat.background_color,
              color: pkdCat.text_color,
            }"
          >
            <span>{{ pkdCat.title }}</span>
            <CloseIconLight @click="handleRemovePickedCategory(pkdCat.id)" />
          </div>
        </div>
        <span class="placeholder" v-else>აირჩიეთ კატეგორია</span>
        <div class="drop-down-btn" @click.stop="handleDropdown">
          <ChevronDownIcon />
        </div>

        <div class="dropdown" v-if="isCategoryDropdownActive" @click.stop>
          <div
            class="category"
            v-for="cat in categories"
            :key="cat.id"
            :style="{
              backgroundColor: cat.background_color,
              color: cat.text_color,
            }"
            @click="handlePickCategory(cat)"
          >
            <span>{{ cat.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { catIFace, useCategories } from "../../store/categories";
import ChevronDownIcon from "../svgs/ChevronDownIcon.vue";
import CloseIconLight from "../svgs/CloseIconLight.vue";
import { useForm } from "../../store/form";

const props = defineProps(["success"]);

const formStore = useForm();
const { values } = storeToRefs(formStore);
const { setDate, setCategories } = formStore;

const date = ref(values.value.date.value || "");

watchEffect(() => {
  if (props.success) {
    date.value = "";
  }
});

watchEffect(() => {
  if (date.value) {
    setDate({
      value: date.value,
      error: false,
      success: true,
    });
  } else {
    setDate({
      value: date.value,
      error: false,
      success: false,
    });
  }
});

const categoryStore = useCategories();
const { categories, isCategoryDropdownActive, pickedCategories } =
  storeToRefs(categoryStore);
const {
  getCategories,
  toggleCategoryDropdown,
  setPickedCategories,
  removePickedCategory,
} = categoryStore;

const handleDropdown = () => {
  toggleCategoryDropdown();
  getCategories();
};

const handlePickCategory = (cat: catIFace) => {
  setPickedCategories(cat);
};

const handleRemovePickedCategory = (catId: number) => {
  removePickedCategory(catId);
};

watchEffect(() => {
  if (pickedCategories.value.length > 0) {
    const catIds = pickedCategories.value.map((cat) => cat.id);
    setCategories({
      value: catIds,
      error: false,
      success: true,
    });
  } else {
    setCategories({
      value: [],
      error: false,
      success: false,
    });
  }
});
</script>
