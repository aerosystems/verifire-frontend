import AuthService from '@/services/auth.service';

import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {status: {loggedIn: true}, user} : {status: {loggedIn: false}, user: null};

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}, {user}) {
            return signInWithEmailAndPassword(getAuth(), user.email, user.password)
                .then((userCredential) => {
                    commit('loginSuccess', userCredential.user);
                    return Promise.resolve(userCredential.user);
                }, (error) => {
                    commit('loginFailure');
                    return Promise.reject(error);
                });
        },
        logout({commit}) {
            signOut(getAuth())
                .then(() => {
                        commit('logout');
                    },
                    (error) => {
                        commit('logout');
                        return Promise.reject(error);
                    }
                );
        },
        register({commit}, {user}) {
            return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
                .then((userCredential) => {
                    sendEmailVerification(userCredential.user)
                        .then(() => {
                                commit('registerSuccess');
                                return Promise.resolve(userCredential.user);
                            },
                            (error) => {
                                commit('registerFailure');
                                return Promise.reject(error);
                            }
                        );
                }, (error) => {
                    commit('registerFailure');
                    return Promise.reject(error);
                });
        },
        recovery({commit}, {user, token}) {
            return AuthService.recovery(user, token).then(
                function (response) {
                    commit('recoverySuccess');
                    return Promise.resolve(response.data);
                },
                function (error) {
                    commit('recoveryFailure');
                    return Promise.reject(error);
                }
            );
        },
        confirm({commit}, {data, token}) {
            return AuthService.confirm(data, token).then(
                function (response) {
                    commit('confirmSuccess');
                    return Promise.resolve(response.data);
                },
                function (error) {
                    commit('confirmFailure');
                    return Promise.reject(error);
                });
        },
        updateTokens({commit}, accessToken, refreshToken) {
            commit('updateTokens', accessToken, refreshToken);
        },
        loggedIn({state}) {
            return Promise.resolve(state.status.loggedIn);
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
            localStorage.setItem("accessToken", user.accessToken);
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
        recoverySuccess(state) {
            state.status.loggedIn = false;
        },
        recoveryFailure(state) {
            state.status.loggedIn = false;
        },
        confirmSuccess(state) {
            state.status.loggedIn = false;
        },
        confirmFailure(state) {
            state.status.loggedIn = false;
        },
        updateTokens(state, accessToken, refreshToken) {
            state.status.loggedIn = true;
            state.user = {...state.user, accessToken: accessToken, refreshToken: refreshToken};
        }
    }
};