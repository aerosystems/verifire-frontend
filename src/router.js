import {createWebHistory, createRouter} from "vue-router";
import MainPage from "./components/MainPage.vue";
import SigninPage from "./components/SigninPage.vue";
import SignupPage from "./components/SignupPage.vue";
import BillingPage from "@/components/BillingPage.vue";
import RecoveryPage from "@/components/RecoveryPage.vue";
import AuthService from "@/services/auth.service";

const routes = [
    {
        path: "/",
        name: "main",
        component: MainPage,
    },
    {
        path: "/billing",
        name: "billing",
        component: BillingPage,
    },
    {
        path: "/signin",
        name: "signin",
        component: SigninPage,
    },
    {
        path: "/signup",
        name: "signup",
        component: SignupPage,
    },
    {
        path: "/recovery",
        name: "recovery",
        component: RecoveryPage,
    },
    {
        path: "/logout",
        name: "logout",
        beforeEnter: (to, from, next) => {
            AuthService.logout()
            next({ name: "main" });
        },
    },
    {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: MainPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                el: to.hash,
                behavior: "smooth",
            };
        }
    },
});


export default router;