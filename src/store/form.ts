import { defineStore } from "pinia";

interface imageFileIFace {
  lastModified?: number;
  lastModifiedDate?: any;
  name?: string;
  size?: number;
  type?: string;
  webkitrelativePath?: string;
}

interface authorIFace {
  value: string;
  errors: {
    errOne: boolean;
    errTwo: boolean;
    errThree: boolean;
  };
  success: {
    succOne: boolean;
    succTwo: boolean;
    succThree: boolean;
  };
}

interface titleIFace {
  value: string;
  error: boolean;
  success: boolean;
}

interface descriptionIFace {
  value: string;
  error: boolean;
  success: boolean;
}

interface dateIFace {
  value: string;
  error: boolean;
  success: boolean;
}

interface categoriesIFace {
  value: number[];
  error: boolean;
  success: boolean;
}

interface emailIFace {
  value: string;
  error: string;
  success: boolean;
}

interface stateIFace {
  imageFile: imageFileIFace;
  values: {
    author: authorIFace;
    title: titleIFace;
    description: descriptionIFace;
    date: dateIFace;
    categories: categoriesIFace;
    email: emailIFace;
  };
}

const values = {
  author: {
    value: "",
    errors: {
      errOne: false,
      errTwo: false,
      errThree: false,
    },
    success: {
      succOne: false,
      succTwo: false,
      succThree: false,
    },
  },
  title: {
    value: "",
    error: false,
    success: false,
  },
  description: {
    value: "",
    error: false,
    success: false,
  },
  date: {
    value: "",
    error: false,
    success: false,
  },
  categories: {
    value: [],
    error: false,
    success: false,
  },
  email: {
    value: "",
    error: "",
    success: false,
  },
};

const imageFileFromStorage = localStorage.getItem("imageFile")
  ? JSON.parse(localStorage.getItem("imageFile") || "")
  : {};

const formValuesFromStorage = localStorage.getItem("values")
  ? JSON.parse(localStorage.getItem("values") || "")
  : values;

export const useForm = defineStore("form", {
  state: (): stateIFace => ({
    imageFile: imageFileFromStorage as imageFileIFace,
    values: formValuesFromStorage,
  }),
  actions: {
    setImageFile(file: imageFileIFace) {
      this.imageFile = file;
      localStorage.setItem("imageFile", JSON.stringify(this.imageFile));
    },
    removeImageFile() {
      this.imageFile = {};
    },
    setAuthor(vals: authorIFace) {
      this.values.author.value = vals.value;
      this.values.author.errors = vals.errors;
      this.values.author.success = vals.success;

      localStorage.setItem("values", JSON.stringify(this.values));
    },
    setTitle(vals: titleIFace) {
      this.values.title.value = vals.value;
      this.values.title.error = vals.error;
      this.values.title.success = vals.success;

      localStorage.setItem("values", JSON.stringify(this.values));
    },

    setDescription(vals: descriptionIFace) {
      this.values.description.value = vals.value;
      this.values.description.error = vals.error;
      this.values.description.success = vals.success;

      localStorage.setItem("values", JSON.stringify(this.values));
    },

    setDate(vals: dateIFace) {
      this.values.date.value = vals.value;
      this.values.date.error = vals.error;
      this.values.date.success = vals.success;

      localStorage.setItem("values", JSON.stringify(this.values));
    },

    setCategories(vals: categoriesIFace) {
      this.values.categories.value = vals.value;
      this.values.categories.error = vals.error;
      this.values.categories.success = vals.success;

      localStorage.setItem("values", JSON.stringify(this.values));
    },

    setEmail(vals: emailIFace) {
      this.values.email.value = vals.value;
      this.values.email.error = vals.error;
      this.values.email.success = vals.success;

      localStorage.setItem("values", JSON.stringify(this.values));
    },
  },
});
