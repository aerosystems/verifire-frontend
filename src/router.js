import {createWebHistory, createRouter} from "vue-router";
import MainPage from "./components/pages/MainPage.vue";
import BillingPage from "@/components/pages/BillingPage.vue";
import AuthPage from "@/components/pages/AuthPage.vue";
import SignupForm from "@/components/auth/SignupForm.vue";
import SigninForm from "@/components/auth/SigninForm.vue";
import RecoveryForm from "@/components/auth/RecoveryForm.vue";
import SignupConfirm from "@/components/auth/SignupConfirm.vue";
import RecoveryConfirm from "@/components/auth/RecoveryConfirm.vue";
import store from "@/store";

const routes = [
    {
        path: "/",
        name: "main",
        component: MainPage,
    },
    {
        path: "/auth",
        name: "auth",
        component: AuthPage,
        children: [
            {
                path: "",
                name: "auth-default",
                beforeEnter: (to, from, next) => {
                    store.dispatch('auth/logout').then(() => {
                        next({name: "main"});
                    });
                },
            },
            {
                path: "signin",
                name: "auth-signin",
                component: SigninForm,
            },
            {
                path: "signup",
                name: "auth-signup",
                children: [
                    {
                        path: "",
                        name: "auth-signup-default",
                        component: SignupForm,
                    },
                    {
                        path: "confirm",
                        name: "auth-signup-confirm",
                        component: SignupConfirm,
                    }
                ]
            },
            {
                path: "logout",
                name: "logout",
                beforeEnter: (to, from, next) => {
                    store.dispatch('auth/logout').then(() => {
                        next({name: "main"});
                    });
                },
            },
            {
                path: "recovery",
                name: "auth-recovery",
                children: [
                    {
                        path: "",
                        name: "auth-recovery-default",
                        component: RecoveryForm,
                    },
                    {
                        path: "confirm",
                        name: "auth-recovery-confirm",
                        component: RecoveryConfirm,
                    }
                ]
            },
        ]
    },
    {
        path: "/billing",
        name: "billing",
        component: BillingPage,
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
            if (to.hash) return {el: to.hash, behavior: "smooth"};
        }
    },
});


export default router;