import api from "./api";
class CheckmailService {

    getCount(recaptchaToken) {
        return api
            .post("/checkmail/v1/domains/count",
                {},
                {
                headers: {
                    'X-Recaptcha-V3-Token': recaptchaToken
                }
            })
            .then(
                (response) => {
                    return response.data.data;
                },
                (error) => {
                    return Promise.reject(error);
                }
            )
    }
}

export default new CheckmailService();