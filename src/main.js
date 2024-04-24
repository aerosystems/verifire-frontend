import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import setupInterceptors from './services/interceptors';
import {FontAwesomeIcon} from './plugins/font-awesome';
import {VueReCaptcha} from 'vue-recaptcha-v3'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAlcFVx3742jNuWd5Qz16hSssL6kE8OOto",
    authDomain: "verifire-396021.firebaseapp.com",
    projectId: "verifire-396021",
    storageBucket: "verifire-396021.appspot.com",
    messagingSenderId: "811007978248",
    appId: "1:811007978248:web:76c8d055626b728f549abd"
};

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)
    .use(router)
    .use(store)
    .use(VueReCaptcha, {siteKey: '6LcDavUUAAAAAIZjUAUUa0Rjh-o1zKocXDRRdfjO'})
    .component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app");

setupInterceptors(store);