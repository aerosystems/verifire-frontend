import axios from "axios";

class SubsService {
    api = axios.create({
        baseURL: process.env.VUE_APP_SUBSCRIPTION_SERVICE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });
    getSubscription() {
        return this.api
            .get('/v1/subscriptions',
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
    }

    createInvoice(paymentMethod, kindSubscription, durationSubscription) {
        return this.api
            .post(`/v1/invoices/${paymentMethod}`, {
                kindSubscription: kindSubscription,
                durationSubscription: durationSubscription
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
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

export default new SubsService();