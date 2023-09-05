<template>
  <div class="form-inner">
    <div>
      <div @click="this.$router.push({name: 'main'});" class="close"></div>
    </div>
    <Form @submit="handleRegister" :validation-schema="schema">
      <ul class="actions stacked">
        <li>
          <Field name="email" type="text" placeholder="Email"/>
          <ErrorMessage name="email" class="response failed"/>
        </li>
        <li>
          <Field name="password" type="password" placeholder="Password"/>
          <ErrorMessage name="password" class="response failed"/>
        </li>
        <li>
          <Field name="rePassword" type="password" placeholder="Retype password"/>
          <ErrorMessage name="rePassword" class="response failed"/>
        </li>
        <li>
          <div v-show="errorResponse" class="response failed">
            {{ errorResponse }}
          </div>
          <div v-show="successResponse" class="response success">
            {{ successResponse }}
          </div>
        </li>
      </ul>
      <div class="center-container">
        <ul class="actions">
          <li>
            <router-link to="/auth/signin" class="button">Sign In</router-link>
          </li>
          <li>
            <button class="button submit primary" :disabled="loading">Next</button>
          </li>
        </ul>
      </div>
      <div class="center-container">
        <router-link to="/auth/recovery">Forgot password?</router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import {useReCaptcha} from 'vue-recaptcha-v3'
import * as yup from "yup";
import router from "@/router";

export default {
  name: "SignupForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    document.title = "Sign Up";
    const {executeRecaptcha, recaptchaLoaded} = useReCaptcha();
    const recaptcha = async () => {
      // (optional) Wait until recaptcha has been loaded.
      await recaptchaLoaded();

      // Execute reCAPTCHA with action "login".
      return await executeRecaptcha('login');
    }

    return {
      recaptcha
    }
  },
  data() {
    const schema = yup.object().shape({
      email: yup
          .string()
          .required("Email is required!")
          .email("Email must be valid!")
          .min(3, "Must be at least 3 characters!")
          .max(320, "Must be maximum 320 characters!"),
      password: yup
          .string()
          .required("Password is required!")
          .matches(
              /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.?-])[A-Za-z\d!@#$%^&*.?-]+$/,
              "Password must contain at least one uppercase letter, one digit, and one special character."
          )
          .min(8, "Must be at least 8 characters!")
          .max(128, "Must be maximum 128 characters!"),
      rePassword: yup
          .string()
          .required("Retype password is required!")
          .oneOf([yup.ref("password")], "Passwords must match!"),
    });
    return {
      loading: false,
      errorResponse: "",
      successResponse: "",
      schema,
    };
  },
  methods: {
    async handleRegister(user) {
      this.loading = true;

      let token = await this.recaptcha(undefined, undefined);

      user.role = "startup";

      this.$store.dispatch("auth/register", {user, token}).then(
          () => {
            router.push({name: "signup-confirm"});
          },
          (error) => {
            this.loading = false;
            this.errorResponse =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setInterval(() => {
              this.errorResponse = "";
            }, 3000);
          }
      );
    }
  },
};
</script>

<style lang="scss" scoped>
div.form-inner {
  background-color: #b74e91;
}
</style>