class RecaptchaService {
    getLocalRecaptchaToken() {
        const recaptcha = JSON.parse(localStorage.getItem("recaptcha"));
        return recaptcha?.token;
    }

    setLocalRecaptchaToken(recaptcha) {
        localStorage.setItem("recaptcha", JSON.stringify(recaptcha));
    }
}

export default new RecaptchaService();