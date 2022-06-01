import { createRouter, createWebHistory } from "vue-router";
import NotFoundPage from "@/views/NotFoundPage";
import MainPage from "@/views/MainPage";
import ProductPage from "@/views/ProductPage";
import SearchResultsPage from "@/views/SearchResultsPage";
import ProductFormsPage from "@/views/ProductFormsPage";
import ProductAnalogsPage from "@/views/ProductAnalogsPage";
import ProductSynonimsPage from "@/views/ProductSynonimsPage";
import PharmacyPage from "@/views/PharmacyPage";
import FavouritePage from "@/views/FavouritePage";

const routes = [
    {
        path: "/404",
        name: "notFound",
        component: NotFoundPage,
    },
    {
        path: "/:catchAll(.*)",
        redirect: "404",
    },
    {
        path: "/",
        name: "main",
        component: MainPage,
    },
    {
        path: "/search",
        name: "searchResults",
        component: SearchResultsPage,
    },
    {
        path: "/products/product-:id",
        name: "product",
        component: ProductPage,
    },
    {
        path: "/products/product-:id/forms",
        name: "productForms",
        component: ProductFormsPage,
    },
    {
        path: "/products/product-:id/analogs",
        name: "productAnalogs",
        component: ProductAnalogsPage,
    },
    {
        path: "/products/product-:id/synonims",
        name: "productSynonims",
        component: ProductSynonimsPage,
    },
    {
        path: "/pharmacies/pharmacy-:id",
        name: "pharmacy",
        component: PharmacyPage,
    },
    {
        path: "/favourite",
        name: "favourite",
        component: FavouritePage,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        document.getElementById("app").scrollIntoView({ behavior: "smooth" });
    },
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         return { x: 0, y: 0 };
    //     }
    // },
});

export default router;
