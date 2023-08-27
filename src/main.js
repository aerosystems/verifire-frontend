import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import setupInterceptors from './services/interceptors';
import { FontAwesomeIcon } from './plugins/font-awesome';

const app = createApp(App)
    .use(router)
    .use(store)
    .component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app");

setupInterceptors(store);