import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage";
import ProductPage from "@/views/ProductPage";
import SearchResultsPage from "@/views/SearchResultsPage";
import ProductFormsPage from "@/views/ProductFormsPage";
import ProductAnalogsPage from "@/views/ProductAnalogsPage";
import ProductSynonimsPage from "@/views/ProductSynonimsPage";

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
  {
    path: "/products/product-:id/forms",
    name: "ProductForms",
    component: ProductFormsPage,
  },
  {
    path: "/products/product-:id/analogs",
    name: "ProductAnalogs",
    component: ProductAnalogsPage,
  },
  {
    path: "/products/product-:id/synonims",
    name: "ProductSynonims",
    component: ProductSynonimsPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
