import SubsService  from "@/services/subs.service";

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
                    commit('setSubscription', response.data.data);
                    return Promise.resolve(response.data.data);
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
            state.name = subscription.kind;
        }
    },
}