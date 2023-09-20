import api from "./api";
import apiService from "./apiService";

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

    inspectPublic(data, recaptchaToken) {
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

    inspectPrivate(data, apiKey) {
        return apiService
            .post("/v1/data/inspect",
                {
                    "data": data
                },
                {
                    headers: {
                        'X-Api-Key': apiKey
                    }
                }
            )

    }

    setDomainReview(data, recaptchaToken) {
        return api
            .post("/checkmail/v1/domains/review",
                {
                    "name": data.name,
                    "type": data.type,
                },
                {
                    headers: {
                        'X-Recaptcha-V3-Token': recaptchaToken
                    }
                }
            )
    }

    setFilter(data, key) {
        return api
            .post("/checkmail/v1/filters",
                {
                    "name": data.name,
                    "type": data.type,
                    "coverage": "equals",
                },
                {
                    headers: {
                        'X-Api-Key': key
                    }
                }
            )
    }
}

export default new CheckmailService();