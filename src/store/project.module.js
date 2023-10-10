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
                    const projectList = response.data.data;
                    commit('setProjectList', projectList);
                    // Initialize "default" project
                    commit('setProject', projectList.find(project => project.name === 'default'));
                    return Promise.resolve(projectList);
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