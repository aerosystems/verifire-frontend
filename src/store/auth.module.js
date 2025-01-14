import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';

const initialState = {
    status: { loggedIn: false },
    user: null,
};

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        async login({ commit }, { email, password }) {
            try {
                const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
                commit('setUser', userCredential.user);
                return userCredential.user;
            } catch (error) {
                commit('clearUser');
                throw error;
            }
        },
        async logout({ commit }) {
            await signOut(getAuth());
            commit('clearUser');
        },
        async register({ commit }, { email, password }) {
            try {
                const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
                await sendEmailVerification(userCredential.user);
                commit('setUser', userCredential.user);
                return userCredential.user;
            } catch (error) {
                commit('clearUser');
                throw error;
            }
        },
        async recovery(_, email) {
            await sendPasswordResetEmail(getAuth(), email);
            return Promise.resolve();
        },
        async watchAuthState({ commit }) {
            return new Promise((resolve) => {
                onAuthStateChanged(getAuth(), (user) => {
                    if (user) {
                        commit('setUser', user);
                        resolve(user); // повертає користувача
                    } else {
                        commit('clearUser');
                        resolve(null); // повертає null
                    }
                });
            });
        },
    },
    mutations: {
        setUser(state, user) {
            state.status.loggedIn = true;
            state.user = {
                uid: user.uid,
                email: user.email,
                emailVerified: user.emailVerified,
                role: user.role,
            };
        },
        clearUser(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
    },
};
