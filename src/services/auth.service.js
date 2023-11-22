import api from "./api";
import TokenService from "./token.service";

class AuthService {
    login({email, password}, token) {
        return api
            .post("/auth/v1/sign-in", {
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
                }
            );
    }

    logout() {
        if (TokenService.getLocalAccessToken() != null) {
            return api
                .post("/auth/v1/sign-out", {}, {
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

    register({email, password}, token) {
        return api
            .post("/auth/v1/sign-up",
                {
                    email,
                    password
                },
                {
                    headers: {
                        'X-Recaptcha-V3-Token': token
                    }
                });
    }

    recovery({email, password}, token) {
        return api
            .post("/auth/v1/reset-password",
                {
                    email,
                    password
                },
                {
                    headers: {
                        'X-Recaptcha-V3-Token': token
                    }
                });
    }

    confirm({code}, token) {
        return api
            .post("/auth/v1/confirm",
                {
                    code
                },
                {
                    headers: {
                        'X-Recaptcha-V3-Token': token
                    }
                });
    }
}

export default new AuthService();