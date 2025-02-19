import axios from "axios";
import { getAuth } from "firebase/auth";

class ProjectService {
    api = axios.create({
        baseURL: process.env.VUE_APP_PRJCT_SERVICE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    async getAccessToken() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error("User is not authenticated");
        }

        return await user.getIdToken();
    }

    async getProjects() {
        const accessToken = await this.getAccessToken();
        return this.api.get("/v1/projects", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    }

    async createProject(projectName, userUuid) {
        const accessToken = await this.getAccessToken();
        return this.api.post(
            "/v1/projects",
            {
                name: projectName,
                userUuid: userUuid,
            },
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
    }

    async deleteProject(projectId) {
        const accessToken = await this.getAccessToken();
        return this.api.delete(`/project/v1/projects/${projectId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    }
}

export default new ProjectService();
