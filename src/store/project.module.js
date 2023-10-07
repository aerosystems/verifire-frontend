import ProjectService from "@/services/project.service";

const initialState = {
    project: {},
    projectList: [],
}
export const project = {
    namespaced: true,
    state: initialState,
    actions: {
        setProjectList({ commit }, recaptchaToken) {
            return ProjectService.getProjects(recaptchaToken).then(
                function (response) {
                    commit('setProjectList', response.data.data);
                    // Initialize "default" project
                    commit('setProject', response.data.data[0]);
                    return Promise.resolve(response.data.data);
                },
                function (error) {
                    return Promise.reject(error);
                }
            );
        },
        setProject({ commit }, project) {
            commit('setProject', project);
        },
    },
    mutations: {
        setProjectList(state, projects) {
            state.projectList = projects;
        },
        setProject(state, project) {
            state.project = project;
        }
    }
}