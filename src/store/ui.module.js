const initState = {
    errorQueue: [],
}

export const ui = {
    namespaced: true,
    state: initState,
    actions: {
        addError({ commit }, error) {
            error.id = Math.random().toString(36).substr(2, 9);
            commit('addError', error)
            setTimeout(() => {
                commit('removeError', error)
            }, 5000)
        },
        removeError({ commit }, error) {
            commit('removeError', error)
        }
    },
    mutations: {
        addError(state, error) {
            state.errorQueue.push(error)
        },
        removeError(state, error) {
            console.log('removeError', error);
            state.errorQueue = state.errorQueue.filter(e => e.id !== error.id)
        }
    }
}