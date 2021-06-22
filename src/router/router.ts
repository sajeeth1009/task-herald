import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Landing from "../views/Landing.vue";
import TaskBoard from "../views/TaskBoard.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/taskboard",
    name: "TaskBoard",
    component: TaskBoard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
