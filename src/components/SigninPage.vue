<template>
  <div class="form-outer">
    <div class="form-inner">
      <div>
        <div @click="this.$router.push({name: 'main'});" class="close"></div>
      </div>
      <Form @submit="handleLogin" :validation-schema="schema">
        <ul class="actions stacked">
          <li>
            <Field name="email" type="text" placeholder="Email"/>
            <ErrorMessage name="email" class="error-feedback"/>
          </li>
          <li>
            <Field name="password" type="password" placeholder="Password"/>
            <ErrorMessage name="password" class="error-feedback"/>
          </li>
          <li>
            <div v-if="message" class="error-feedback">
              {{ message }}
            </div>

          </li>
        </ul>
        <div class="center-container">
          <ul class="actions">
            <li>
              <button class="button submit primary" :disabled="loading">Next</button>
            </li>
            <li>
              <router-link to="/signup" class="button">Sign Up</router-link>
            </li>
          </ul>
        </div>
        <div class="center-container">
          <router-link to="/recovery">Forgot password?</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import * as yup from "yup";
import router from "@/router";

import '@/assets/css/fontawesome-all.min.css';
import '@/assets/css/noscript.css';
import '@/assets/css/custom.css';

export default {
  name: "SigninPage",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  beforeRouteEnter(to, from, next) {
    next((component) => {
      component.setBackground();
    });
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
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      router.push({name: "billing"});
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
          () => {
            router.push({name: "billing"});
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
    setBackground() {
      let todayDay = new Date().getDate();
      let bg = require("@/assets/images/background/img" + todayDay + ".jpg");
      document.body.style.backgroundImage = "url('" + bg + "')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    },
  },
};
</script>

<style>
.center-container {
  display: flex; /* Встановлюємо контейнер як гнучкий контейнер */
  align-items: center; /* Вирівнюємо елементи по вертикалі */
  justify-content: center; /* Вирівнюємо елементи по горизонталі */
  text-align: center; /* Вирівнюємо текст всередині контейнера */
}

.error-feedback {
  background: rgba(255, 0, 0, 0.38);
  border-radius: 0.25em;
  border: solid 1px rgba(255, 255, 255, 0.15);
  font-family: "Courier New", monospace;
  font-size: 0.9em;
  margin: 0 0.25em;
  padding: 0.25em 0.65em;
}
</style>