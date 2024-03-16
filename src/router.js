import {createWebHistory, createRouter} from "vue-router";
import store from "@/store";
import MainPage from "@/pages/MainPage.vue";
import BillingPage from "@/pages/BillingPage.vue";
import AuthPage from "@/pages/AuthPage.vue";
import UsagePage from "@/pages/UsagePage.vue";
import SignupForm from "@/components/auth/SignupForm.vue";
import SigninForm from "@/components/auth/SigninForm.vue";
import RecoveryForm from "@/components/auth/RecoveryForm.vue";
import SignupConfirm from "@/components/auth/SignupConfirm.vue";
import RecoveryConfirm from "@/components/auth/RecoveryConfirm.vue";
import DeprecatedUsagePage from "@/pages/DeprecatedUsagePage.vue";
import GenericPage from "@/pages/GenericPage.vue";
import PaymentComponent from "@/components/PaymentComponent.vue";
import PaymentSuccessComponent from "@/components/PaymentSuccessComponent.vue";
import PaymentFailureComponent from "@/components/PaymentFailureComponent.vue";
import PaymentCancelComponent from "@/components/PaymentCancelComponent.vue";
import CheckoutComponent from "@/components/CheckoutComponent.vue";
import CheckoutSubscriptionComponent from "@/components/CheckoutSubscriptionComponent.vue";

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
        props: {pageName: "Donate", pagePath: "/donate"},
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
                component: PaymentSuccessComponent,
            },
            {
                path: "failure",
                name: "donate-failure",
                component: PaymentFailureComponent,
            },
            {
                path: "cancel",
                name: "donate-cancel",
                component: PaymentCancelComponent,
            }
        ]
    },
    {
        path: "/payment",
        name: "payment",
        component: GenericPage,
        props: {pageName: "Payment", pagePath: "/payment"},
        children: [
            {
                path: "",
                name: "payment-default",
                component: PaymentComponent,
            },
            {
                path: "success",
                name: "payment-success",
                component: PaymentSuccessComponent,
            },
            {
                path: "failure",
                name: "payment-failure",
                component: PaymentFailureComponent,
            },
            {
                path: "cancel",
                name: "payment-cancel",
                component: PaymentCancelComponent,
            }
        ]
    },
    {
        path: "/checkout",
        name: "checkout",
        component: GenericPage,
        props: {pageName: "Checkout", pagePath: "/checkout"},
        children: [
            {
                path: "",
                name: "checkout-default",
                component: CheckoutComponent,
            },
            {
                path: "/checkout/:subscriptionKind",
                name: "checkout-subscription",
                component: CheckoutSubscriptionComponent,
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