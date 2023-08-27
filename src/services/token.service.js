import jwt_decode from "jwt-decode";
class TokenService {
    isRefreshTokenExpired() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.refreshToken) {
            const decoded = jwt_decode(user.refreshToken);
            return decoded.exp * 1000 < Date.now();

        }
        return true;
    }
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refreshToken;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.accessToken;
    }

    updateLocalAccessToken(accessToken) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.accessToken = accessToken;
        localStorage.setItem("user", JSON.stringify(user));
    }

    updateLocalRefreshToken(refreshToken) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.refreshToken = refreshToken;
        localStorage.setItem("user", JSON.stringify(user));
    }
    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("user");
    }
}

export default new TokenService();