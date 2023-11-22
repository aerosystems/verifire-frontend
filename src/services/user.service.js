import api from "@/services/api";
class UserService {
    getUser() {
        return api
            .get('/auth/v1/user',
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
    }
}
export default new UserService();