import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import AddBlog from "../pages/AddBlog.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/add",
    name: "add",
    component: AddBlog,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
