const initState = {
    errorQueue: [],
}

export const ui = {
    namespaced: true,
    state: initState,
    actions: {
        addError({ commit }, error) {
            commit('addError', error)
        },
        removeError({ commit }) {
            commit('removeError')
        }
    },
    mutations: {
        addError(state, error) {
            state.errorQueue.push(error)
        },
        removeError(state) {
            state.errorQueue.shift();
        }
    }
}