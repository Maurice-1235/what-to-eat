// Composables
import { createRouter, createWebHistory } from "vue-router";
import RecommendView from "../views/RecommendView.vue";
import SuggestionView from "../views/SuggestionView.vue";
const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/recommend",
    name: "recommend",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: RecommendView,
  },
  {
    path: "/suggestion",
    name: "/suggestion",
    component: SuggestionView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
