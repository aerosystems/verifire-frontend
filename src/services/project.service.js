import api from "./api";
class ProjectService {
    getProjects(recaptchaToken) {
        return api
            .get("/project/v1/projects",
                {
                    headers: {
                        'X-Recaptcha-V3-Token': recaptchaToken
                    }
                });
    }

    createProject(projectName, userId) {
        return api
            .post("/project/v1/projects",
                {
                    name: projectName,
                    userId: userId
                },
                {
                    headers: {Authorization: 'Bearer ' + localStorage.getItem('accessToken')}
                    }
                );
    }

    deleteProject(projectId) {
        return api
            .delete("/project/v1/projects/" + projectId,
                {
                    headers: {Authorization: 'Bearer ' + localStorage.getItem('accessToken')}
                    }
                );
    }
}

export default new ProjectService();