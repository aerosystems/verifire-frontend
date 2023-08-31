import AuthService from '../services/auth.service';
import TokenService from "@/services/token.service";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, {user, token}) {
            console.log(user, token);
            return AuthService.login(user, token)
                .then(
                function (user) {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                function (error) {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            if (TokenService.getLocalAccessToken() != null) {
                return AuthService.logout().then(
                    function (response) {
                        commit('logout');
                        return Promise.resolve(response.data);
                    },
                    function (error) {
                        commit('logout');
                        return Promise.reject(error);
                    }
                );
            }
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                function (response) {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                function (error) {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        },
        updateTokens({ commit }, accessToken, refreshToken) {
            commit('updateTokens', accessToken, refreshToken);
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
        updateTokens(state, accessToken, refreshToken) {
            state.status.loggedIn = true;
            state.user = { ...state.user, accessToken: accessToken, refreshToken: refreshToken };
        }
    }
};