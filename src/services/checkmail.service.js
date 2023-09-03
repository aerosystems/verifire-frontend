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
    }

    inspect(data, recaptchaToken) {
        return api
            .post("/checkmail/v1/data/inspect",
                {
                    "data": data
                },
                {
                    headers: {
                        'X-Recaptcha-V3-Token': recaptchaToken
                    }
                }
            )
    }

    setFilter(data, recaptchaToken) {
        console.log({
            "name": data.name,
            "type": data.type,
            "coverage": "equals",
        });
        return api
            .post("/checkmail/v1/filters",
                {
                    "name": data.name,
                    "type": data.type,
                    "coverage": "equals",
                },
                {
                    headers: {
                        'X-Recaptcha-V3-Token': recaptchaToken
                    }
                }
            )
    }
}

export default new CheckmailService();