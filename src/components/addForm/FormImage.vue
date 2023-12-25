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
    :class="[
      errMsg
        ? 'drop-area-error'
        : isDropZoneActive
        ? 'drop-area-active'
        : 'drop-area',
    ]"
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
    <p class="err-msg" v-if="errMsg">{{ errMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import ChooseImgIcon from "../svgs/ChooseImgIcon.vue";
import CloseIcon from "../svgs/CloseIcon.vue";
import ChosenImgIcon from "../svgs/ChosenImgIcon.vue";
import { ref, watchEffect } from "vue";
import { useForm } from "../../store/form";
import { storeToRefs } from "pinia";

const isDropZoneActive = ref(false);
const errMsg = ref("");

const formStore = useForm();
const { imageFile } = storeToRefs(formStore);
const { setImageFile, removeImageFile } = formStore;

const toggleDropZone = () => {
  isDropZoneActive.value = !isDropZoneActive.value;
};

const handleDrop = (e: any) => {
  const file = e.dataTransfer.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    if (file.type.startsWith("image/")) {
      setImageFile({
        name: file.name,
        image: reader.result as string,
      });
    } else {
      errMsg.value = "მხოლოდ ფოტოს ატვირთვა არის შესაძლებელი!";
    }
  };

  reader.readAsDataURL(file);
};

const handleInputFile = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    const file = target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageFile({
        name: file.name,
        image: reader.result as string,
      });
    };

    reader.readAsDataURL(file);
  }
};

const handleRemoveImageFile = () => removeImageFile();

watchEffect(() => {
  if (imageFile.value.image) {
    errMsg.value = "";
  }
});
</script>
