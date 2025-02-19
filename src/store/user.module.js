import AuthService from "@/services/auth.service";

const initialState = {
    user: null,
}

export const user = {
    namespaced: true,
    state: initialState,
    actions: {
        setUser({ commit }) {
            return AuthService.getUser().then(
                function (response) {
                    commit('setUser', response.data.data);
                    return Promise.resolve(response.data.data);
                },
                function (error) {
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
}