import api from "./api";
import apiPublic from "./api.public";
import TokenService from "@/services/token.service";

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
        return apiPublic
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

    setFilter(data, projectToken) {
        return api
            .post("/checkmail/v1/filters",
                {
                    "name": data.name,
                    "type": data.type,
                    "coverage": "equals",
                    "projectToken": projectToken,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + TokenService.getLocalAccessToken()
                    }
                }
            )
    }
}

export default new CheckmailService();