import ProjectService from "@/services/project.service";

const initialState = {
    projectList: [],
}
export const project = {
    namespaced: true,
    state: initialState,
    actions: {
        setProject({ commit }, recaptchaToken) {
            return ProjectService.getProjects(recaptchaToken).then(
                function (response) {
                    commit('setProject', response.data.data);
                    return Promise.resolve(response.data.data);
                },
                function (error) {
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        setProject(state, projects) {
            state.projectList = projects;
        }
    }
}