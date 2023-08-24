import {createWebHistory, createRouter} from "vue-router";
import MainPage from "./components/MainPage.vue";
import SigninPage from "./components/SigninPage.vue";
import SignupPage from "./components/SignupPage.vue";
import BillingPage from "@/components/BillingPage.vue";
import RecoveryPage from "@/components/RecoveryPage.vue";

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
        path: "/:catchAll(.*)",
        name: "notFound",
        component: MainPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;