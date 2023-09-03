import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import setupInterceptors from './services/interceptors';
import { FontAwesomeIcon } from './plugins/font-awesome';
import { VueReCaptcha } from 'vue-recaptcha-v3'

const app = createApp(App)
    .use(router)
    .use(store)
    .use(VueReCaptcha, { siteKey: '6LcDavUUAAAAAIZjUAUUa0Rjh-o1zKocXDRRdfjO' })
    .component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app");

setupInterceptors(store);