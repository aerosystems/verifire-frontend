import {createWebHistory, createRouter} from "vue-router";
import store from "@/store";
import MainPage from "./components/pages/MainPage.vue";
import BillingPage from "@/components/pages/BillingPage.vue";
import AuthPage from "@/components/pages/AuthPage.vue";
import UsagePage from "@/components/pages/UsagePage.vue";
import SignupForm from "@/components/auth/SignupForm.vue";
import SigninForm from "@/components/auth/SigninForm.vue";
import RecoveryForm from "@/components/auth/RecoveryForm.vue";
import SignupConfirm from "@/components/auth/SignupConfirm.vue";
import RecoveryConfirm from "@/components/auth/RecoveryConfirm.vue";
import DeprecatedUsagePage from "@/components/pages/DeprecatedUsagePage.vue";
import GenericPage from "@/components/pages/GenericPage.vue";
import DonateSuccessComponent from "@/components/DonateSuccessComponent.vue";
import DonateFailureComponent from "@/components/DonateFailureComponent.vue";
import DonateCancelComponent from "@/components/DonateCancelComponent.vue";
import CheckoutComponent from "@/components/CheckoutDefault.vue";
import CheckoutStartup from "@/components/CheckoutStartup.vue";

const routes = [
    {
        path: "/",
        name: "main",
        component: MainPage,
        beforeEnter: (to, from, next) => {
            store.dispatch('auth/loggedIn').then(result => {
                if (!result) next();
                next({name: "billing"});
            });
        }
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
        beforeEnter: (to, from, next) => {
            store.dispatch('auth/loggedIn').then(result => {
                if (result) next();
                next({name: "auth-signin"});
            });
        }
    },
    {
        path: "/usage",
        name: "usage",
        component: UsagePage,
    },
    {
        path: "/deprecated",
        name: "deprecated",
        component: DeprecatedUsagePage,
    },
    {
      path: "/donate",
      name: "donate",
      component: GenericPage,
        children: [
            {
                path: "",
                name: "donate-default",
                beforeEnter: (to, from, next) => {
                    next({name: "main"});
                },
            },
            {
                path: "success",
                name: "donate-success",
                component: DonateSuccessComponent,
            },
            {
                path: "failure",
                name: "donate-failure",
                component: DonateFailureComponent,
            },
            {
                path: "cancel",
                name: "donate-cancel",
                component: DonateCancelComponent,
            }
            ]
    },
    {
        path: "/checkout",
        name: "checkout",
        component: GenericPage,
        children: [
            {
                path: "",
                name: "checkout-default",
                component: CheckoutComponent,
            },
            {
                path: "startup",
                name: "checkout-startup",
                component: CheckoutStartup,
            },
            {
                path: "business",
                name: "checkout-business",
                component: CheckoutComponent,
            }
        ]
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