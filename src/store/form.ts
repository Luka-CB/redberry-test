import { defineStore } from "pinia";

interface imageFileIFace {
  lastModified?: number;
  lastModifiedDate?: any;
  name?: string;
  size?: number;
  type?: string;
  webkitrelativePath?: string;
}

interface stateIFace {
  imageFile: imageFileIFace;
}

const imageFileFromStorage = localStorage.getItem("imageFile")
  ? JSON.parse(localStorage.getItem("imageFile") || "")
  : {};

export const useForm = defineStore("form", {
  state: (): stateIFace => ({
    imageFile: imageFileFromStorage as imageFileIFace,
  }),
  actions: {
    setImageFile(file: imageFileIFace) {
      this.imageFile = file;
      localStorage.setItem("imageFile", JSON.stringify(this.imageFile));
    },
    removeImageFile() {
      this.imageFile = {};
    },
  },
});
