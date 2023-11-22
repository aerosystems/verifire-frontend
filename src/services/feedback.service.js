import api from "@/services/api";

class FeedbackService {
    send(data, recaptchaToken) {
        return api
            .post("/mail/v1/feedback",
                {
                    "name": data.name,
                    "email": data.email,
                    "message": data.message
                },
                {
                    headers: {
                        'X-Recaptcha-V3-Token': recaptchaToken
                    }
                })
    }
}

export default new FeedbackService();