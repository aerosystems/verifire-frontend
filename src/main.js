import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import setupInterceptors from './services/interceptors';

const app = createApp(App)
    .use(router)
    .use(store)

app.mount("#app");

setupInterceptors(store);