import SubsService  from "@/services/subscription.service";

const initialState = {
    subscription: null,
    name: '',
    accessTime: '',
}

export const subscription = {
    namespaced: true,
    state: initialState,
    actions: {
        setSubscription({ commit }) {
            return SubsService.getSubscription().then(
                function (response) {
                    commit('setSubscription', response.data);
                    return Promise.resolve(response.data);
                },
                function (error) {
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        setSubscription(state, subscription) {
            state.subscription = subscription;
            state.accessTime = subscription.accessTime;
            state.name = subscription.name;
        }
    },
}