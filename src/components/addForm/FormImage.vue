<template>
  <div class="chosen-file" v-if="imageFile.name">
    <div class="col1">
      <ChosenImgIcon />
      <h3 class="file-name">{{ imageFile.name }}</h3>
    </div>
    <CloseIcon @click="handleRemoveImageFile" />
  </div>
  <div
    v-else
    @dragenter.prevent="toggleDropZone"
    @dragleave.prevent="toggleDropZone"
    @dragover.prevent
    @drop.prevent="handleDrop"
    :class="[isDropZoneActive ? 'drop-area-active' : 'drop-area']"
  >
    <ChooseImgIcon />
    <div class="text">
      <span>ჩააგდეთ ფაილი აქ ან</span>
      <label for="fileInput">აირჩიეთ ფაილი</label>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        hidden
        @change="handleInputFile($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChooseImgIcon from "../svgs/ChooseImgIcon.vue";
import CloseIcon from "../svgs/CloseIcon.vue";
import ChosenImgIcon from "../svgs/ChosenImgIcon.vue";
import { ref } from "vue";
import { useForm } from "../../store/form";
import { storeToRefs } from "pinia";

const isDropZoneActive = ref(false);

const formStore = useForm();
const { imageFile } = storeToRefs(formStore);
const { setImageFile, removeImageFile } = formStore;

const toggleDropZone = () => {
  isDropZoneActive.value = !isDropZoneActive.value;
};

const handleDrop = (e: any) => {
  setImageFile(e.dataTransfer.files[0]);
};

const handleInputFile = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    imageFile.value = target.files[0];
    setImageFile(target.files[0]);
  }
};

const handleRemoveImageFile = () => removeImageFile();
</script>
