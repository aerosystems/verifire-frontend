<template>
  <div class="form-inner">
    <div>
      <div @click="this.$router.push({name: 'main'});" class="close"></div>
    </div>
    <div>
      <code>Enter the 6-Digit Code from Your Email</code>
    </div>
    <Form @submit="handleConfirm" :validation-schema="schema">
      <ul class="actions stacked">
        <li>
          <Field name="code" type="text" placeholder="Code"/>
          <ErrorMessage name="code" class="response failed"/>
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
            <router-link to="/auth/signup" class="button">Back</router-link>
          </li>
          <li>
            <button class="button submit primary" :disabled="loading">Next</button>
          </li>
        </ul>
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
  name: "SignupConfirm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    document.title = "Confirm Sign Up";
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
      code: yup
          .string()
          .required("Code is required!")
          .min(6, "Must be at least 6 characters!")
          .max(6, "Must be maximum 6 characters!")
          .matches(/^[0-9]+$/, "Must be only digits!")
    });
    return {
      loading: false,
      errorResponse: "",
      successResponse: "",
      schema,
    };
  },
  methods: {
    async handleConfirm(data) {
      this.loading = true;

      let token = await this.recaptcha(undefined, undefined);

      this.$store.dispatch("auth/confirm", {data, token}).then(
          () => {
            router.push({name: "auth-signin"});
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
    },
  },
};
</script>

<style lang="scss" scoped>
div.form-inner {
  background-color: #b74e91;
}
</style>