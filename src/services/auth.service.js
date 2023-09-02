import api from "./api";
import TokenService from "./token.service";

class AuthService {
    login({email, password}, token) {
        return api
            .post("/auth/v1/user/login", {
                email,
                password
            }, {
                    headers: {
                        'X-Recaptcha-V3-Token': token
                    }
                })
            .then(
                (response) => {
                    if (response.data.data.accessToken) {
                        TokenService.setUser(response.data.data);
                    }
                    return response.data.data;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
    }

    logout() {
        if (TokenService.getLocalAccessToken() != null) {
            return api
                .post("/auth/v1/user/logout", {}, {
                    headers: {
                        Authorization: 'Bearer ' + TokenService.getLocalAccessToken()
                    }
                })
                .then(
                    function (response) {
                        TokenService.removeUser();
                        return response.data.data;
                    }
                )
                .catch(
                    function (error) {
                        TokenService.removeUser();
                        return Promise.reject(error);
                    }
                );
        }
    }

    register({email, password}) {
        return api
            .post("/auth/v1/user/register", {
                email,
                password
            });
    }
}

export default new AuthService();