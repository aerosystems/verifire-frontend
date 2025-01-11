import axios from "axios";
import {getAuth} from "firebase/auth";

class SubscriptionService {
    api = axios.create({
        baseURL: process.env.VUE_APP_SBS_SERVICE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    async getAccessToken() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error("User is not authenticated");
        }

        return await user.getIdToken();
    }

    async getSubscription() {
        const accessToken = await this.getAccessToken();
        return this.api
            .get('/v1/subscriptions',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
    }

    async createInvoice(paymentMethod, kindSubscription, durationSubscription) {
        const accessToken = await this.getAccessToken();
        return this.api
            .post(`/v1/invoices/${paymentMethod}`, {
                kindSubscription: kindSubscription,
                durationSubscription: durationSubscription
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
    }

    getSubscriptionName(subscriptionKind) {
        switch (subscriptionKind) {
            case 'business':
                return 'Business';
            case 'startup':
                return 'Startup';
            default:
                return undefined;
        }
    }
}

export default new SubscriptionService();