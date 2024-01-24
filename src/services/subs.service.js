import api from "@/services/api";

class SubsService {
    getSubscription() {
        return api
            .get('/subs/v1/subscriptions',
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
    }

    createInvoice(paymentMethod, kindSubscription, durationSubscription) {
        return api
            .post(`/subs/v1/invoices/${paymentMethod}`, {
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