import { createApp, nextTick } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import YmapPlugin from "vue-yandex-maps";

const app = createApp(App).use(store).use(router);

app.directive("focus", {
    mounted(el) {
        nextTick(() => {
            if (!el.value) {
                el.focus();
            }
        });
    },
}).directive("scroll", {
    mounted(el, binding) {
        el.addEventListener("scroll", binding.value);
    },
});

app.use(YmapPlugin, {
    apiKey: "30eedcae-a789-4950-b5d2-40515dd82261",
    lang: "ru_RU",
    coordorder: "latlong",
    version: "2.1",
});

app.config.unwrapInjectedRef = true;
app.mount("#app");
