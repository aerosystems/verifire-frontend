import TokenService from "@/services/token.service";
import axios from "axios";

class CheckmailService {
    api = axios.create({
        baseURL: process.env.VUE_APP_CHECKMAIL_SERVICE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    apiPublic = axios.create({
        baseURL: process.env.VUE_APP_CHECKMAIL_SERVICE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    getCount(recaptchaToken) {
        return this.api
            .post("/v1/domains/count",
                {},
                {
                    headers: {
                        'X-Recaptcha-V3-Token': recaptchaToken
                    }
                })
    }

    inspectPublic(data, recaptchaToken) {
        return this.api
            .post("/v1/data/inspect",
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
        return this.apiPublic
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
        return this.api
            .post("/v1/domains/review",
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
        return this.api
            .post("/v1/filters",
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