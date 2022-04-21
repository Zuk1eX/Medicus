import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage";
import ProductPage from "@/views/ProductPage";
import SearchResultsPage from "@/views/SearchResultsPage";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/products/search",
    component: SearchResultsPage,
  },
  {
    path: "/products/product-:id",
    component: ProductPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
