import axios from "axios";

class ProjectService {
    api = axios.create({
        baseURL: process.env.VUE_APP_PROJECT_SERVICE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    getProjects() {
        return this.api
            .get("/v1/projects",
                {
                    headers: {Authorization: 'Bearer ' + localStorage.getItem('accessToken')}
                });
    }

    createProject(projectName, userUuid) {
        return this.api
            .post("/v1/projects",
                {
                    name: projectName,
                    userUuid: userUuid
                },
                {
                    headers: {Authorization: 'Bearer ' + localStorage.getItem('accessToken')}
                }
            );
    }

    deleteProject(projectId) {
        return this.api
            .delete("/project/v1/projects/" + projectId,
                {
                    headers: {Authorization: 'Bearer ' + localStorage.getItem('accessToken')}
                }
            );
    }
}

export default new ProjectService();