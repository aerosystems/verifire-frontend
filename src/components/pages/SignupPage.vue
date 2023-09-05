<template>
  <div class="form-outer">
    <div class="form-inner">
      <div>
        <div @click="this.$router.push({name: 'main'});" class="close"></div>
      </div>
      <Form @submit="handleRegister" :validation-schema="schema">
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
            <Field name="rePassword" type="password" placeholder="Retype password"/>
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
              <router-link to="/signin" class="button">Sign In</router-link>
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
import {useReCaptcha} from 'vue-recaptcha-v3'
import * as yup from "yup";
import router from "@/router";

export default {
  name: "SignupPage",
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
      rePassword: yup
          .string()
          .required("Retype password is required!")
          .oneOf([yup.ref("password"), null], "Passwords must match!"),
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
    async handleRegister(user) {
      this.loading = true;

      let token = await this.recaptcha(undefined, undefined);

      this.$store.dispatch("auth/register", {user, token}).then(
          () => {
            router.push({name: "confirm"});
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
      document.documentElement.style.height = "100%";
      document.body.style.height = "100%";
      document.body.style.backgroundImage = "url('" + bg + "')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    },
  },
};
</script>

<style scoped>

form {
  margin: 0.5em 0 0.5em 0 !important;
}

ul {
  margin: 0 0 0.5em 0 !important;
}

.close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 32px;
  height: 32px;
  opacity: 0.5;
}

.close:hover {
  opacity: 1;
}

.close:before, .close:after {
  position: absolute;
  left: 20px;
  content: ' ';
  height: 20px;
  width: 2px;
  background-color: #fff;
}

.close:before {
  transform: rotate(45deg);
}

.close:after {
  transform: rotate(-45deg);
}

div.form-outer {
  padding-right: 700px;
  text-align: right;
  vertical-align: middle;
}

div.form-inner {
  text-align: center;
  position: absolute;
  top: 35%;
  display: inline-block;
  margin: auto;
  width: 500px;
  padding: 22px;
  border-radius: 3px;
  background-color: #b74e91;
}

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

@media screen and (min-width: 576px) {
  div.form-inner {
    width: 500px;
  }
}

@media screen and (max-width: 576px) {
  div.form-inner {
    width: -webkit-fill-available;
  }
}

</style>