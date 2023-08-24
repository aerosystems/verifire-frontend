import api from "./api";
import TokenService from "./token.service";

class AuthService {
    login({username, password}) {
        return api
            .post("/v1/user/login", {
                username,
                password
            })
            .then((response) => {
                if (response.data.data.accessToken) {
                    TokenService.setUser(response.data.data);
                }
                return response.data.data;
            });
    }

    logout() {
        return api
            .post("/v1/user/logout", {}, {
                headers: {
                    Authorization: 'Bearer ' + TokenService.getLocalAccessToken()
                }
            })
            .then(
                function (response) {
                    TokenService.removeUser();
                    return response.data.data;
                }
            );
    }

    register({username, email, password}) {
        return api
            .post("/v1/user/register", {
                username,
                email,
                password
            });
    }
}

export default new AuthService();