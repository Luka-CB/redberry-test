import { createApp } from "vue";
import "./assets/styles/index.scss";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { createHead } from "@vueuse/head";

const head = createHead();

createApp(App).use(head).use(router).use(createPinia()).mount("#app");
