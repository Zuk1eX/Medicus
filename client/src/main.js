import { createApp, nextTick } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import YmapPlugin from "vue-yandex-maps";
// import ymapPlugin from 'vue-yandex-maps';

const app = createApp(App).use(store).use(router);

app.directive("focus", {
    mounted(el) {
        nextTick(() => {
            if (!el.value) {
                el.focus();
            }
        });
    },
})
    .directive("scroll", {
        mounted(el, binding) {
            el.addEventListener("scroll", binding.value);
        },
    })
    .directive("intersection", {
        mounted(element, binding) {
            const options = {
                rootMargin: "0px 0px 350px 0px",
                threshold: 0.8,
            };
            const callback = (entries, observer) => {
                if (entries[0].isIntersecting) {
                    binding.value();
                }
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(element);
        },
    });

// app.use(ymapPlugin, 
//     {
//     apiKey: "30eedcae-a789-4950-b5d2-40515dd82261",
//     lang: "ru_RU",
//     coordorder: "latlong",
//     version: "2.1",
// }
// );

app.config.unwrapInjectedRef = true;
app.mount("#app");
