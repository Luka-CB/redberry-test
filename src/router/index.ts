import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import AddBlog from "../pages/AddBlog.vue";
import Blog from "../pages/Blog.vue";

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
  {
    path: "/blog/:blogId",
    name: "blog",
    component: Blog,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
