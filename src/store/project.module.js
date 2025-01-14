import ProjectService from "@/services/project.service";

const initialState = {
    project: {},
    projectList: [],
}
export const project = {
    namespaced: true,
    state: initialState,
    actions: {
        setProjectList({commit}) {
            return ProjectService.getProjects().then(
                function (response) {
                    const projectList = response.data;
                    commit('setProjectList', projectList);
                    // Initialize "default" project
                    commit('setProject', projectList.find(project => project.name === 'Default Project'));
                    return Promise.resolve(projectList);
                },
                function (error) {
                    return Promise.reject(error);
                }
            );
        },
        setProject({commit}, project) {
            commit('setProject', project);
        },
        addProject({commit}, {projectName, userUuid}) {
            return ProjectService.createProject(projectName, userUuid).then(
                function (response) {
                    commit('addToProjectList', response.data);
                    commit('setProject', response.data);
                    return Promise.resolve(response.data);
                },
                function (error) {
                    return Promise.reject(error);
                }
            );
        },
        deleteProject({commit}, projectId) {
            return ProjectService.deleteProject(projectId).then(
                function (response) {
                    commit('removeFromProjectList', projectId);
                    return Promise.resolve(response);
                },
                function (error) {
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        setProjectList(state, projects) {
            state.projectList = projects;
        },
        addToProjectList(state, project) {
            state.projectList.push(project);
        },
        removeFromProjectList(state, projectId) {
            if (state.project.id === projectId) {
                state.project = state.projectList.find(project => project.name === 'default');
            }
            state.projectList = state.projectList.filter(project => project.id !== projectId);
        },
        setProject(state, project) {
            state.project = project;
        }
    }
}