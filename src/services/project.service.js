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
}

export default new ProjectService();