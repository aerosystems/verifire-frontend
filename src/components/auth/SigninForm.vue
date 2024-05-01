<template>
  <div class="form-inner">
    <div>
      <div @click="this.$router.push({name: 'main'});" class="close"></div>
    </div>
    <Form ref="formSignIn" @submit="handleLogin" :validation-schema="schema">
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
            <router-link to="/auth/signup" class="button">Sign Up</router-link>
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
import * as yup from "yup";
import router from "@/router";

export default {
  name: "SigninForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    document.title = "Sign In";
  },
  data() {
    const schema = yup.object().shape({
      email: yup
          .string()
          .required("Email is required")
          .email("Email must be valid")
          .min(3, "Must be at least 3 characters")
          .max(320, "Must be maximum 320 characters"),
      password: yup
          .string()
          .required("Password is required")
          .matches(
              /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.?-])[A-Za-z\d!@#$%^&*.?-]+$/,
              "Password must contain at least one uppercase letter, one digit, and one special character."
          )
          .min(8, "Must be at least 8 characters")
          .max(128, "Must be maximum 128 characters"),
    });
    return {
      loading: false,
      errorResponse: "",
      successResponse: "",
      schema,
    };
  },
  methods: {
    async handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", {user}).then(
          () => {
            this.loading = false;
            router.push({name: "billing"});
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
  background-color: #5e42a6;
}
</style>