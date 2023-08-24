import axiosInstance from "./api";
import TokenService from "./token.service";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== "/login" && err.response) {
                if (!TokenService.getLocalRefreshToken()) {
                    store.dispatch('auth/logout');
                    store.dispatch('ui/resetState');
                    return Promise.reject(err);
                }
                if (TokenService.isRefreshTokenExpired()) {
                    store.dispatch('auth/logout');
                    store.dispatch('ui/resetState');
                    return Promise.reject(err);
                }
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await axiosInstance.post("/v1/tokens/refresh", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        }, {});

                        const {accessToken, refreshToken} = rs.data.data;

                        store.dispatch('auth/updateTokens', accessToken, refreshToken);
                        TokenService.updateLocalAccessToken(accessToken);
                        TokenService.updateLocalRefreshToken(refreshToken);

                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    );
};

export default setup;