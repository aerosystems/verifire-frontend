import {createWebHistory, createRouter} from "vue-router";
import MainPage from "./components/MainPage.vue";
import SignPage from "./components/SigninPage.vue";

const routes = [
    {
        path: "/",
        name: "main",
        component: MainPage,
    },
    {
        path: "/login",
        name: "login",
        component: SignPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;