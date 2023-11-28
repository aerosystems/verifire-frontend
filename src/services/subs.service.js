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
}

export default new SubsService();