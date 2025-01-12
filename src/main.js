import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import setupInterceptors from './services/interceptors';
import {FontAwesomeIcon} from './plugins/font-awesome';
import {VueReCaptcha} from 'vue-recaptcha-v3';
import {loadFirebaseConfig} from "./firebase";

const app = createApp(App)
    .use(router)
    .use(store)
    .use(VueReCaptcha, {siteKey: process.env.VUE_APP_RECAPTCHA_V3_SITE_KEY})
    .component("font-awesome-icon", FontAwesomeIcon);

    // setupInterceptors(store);
    loadFirebaseConfig()
    .finally(function () {
        app.mount('#app')
    })