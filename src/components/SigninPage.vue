<template>
  <div class="form-outer">
    <div class="form-inner">
      <div>
        <div onclick="window.location.href ='/';" class="close"></div>
      </div>
      <Form :validation-schema="schema">
        <ul class="actions stacked">
          <li>
            <Field name="email" type="text" placeholder="Email"/>
          </li>
          <li>
            <Field name="password" type="password" placeholder="Password"/>
          </li>
          <li>
            <ErrorMessage name="username" class="error-feedback"/>
          </li>
        </ul>
      </Form>
      <div>
        <ul class="actions">
          <li id="sendLi">
            <button class="button submit primary" :disabled="loading">Next</button>
          </li>
          <li><a href="/signup" class="button">Sign In</a></li>
        </ul>
        <a href="/recovery">Forgot password?</a>
      </div>
    </div>
  </div>
</template>

<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import * as yup from "yup";

import '@/assets/css/fontawesome-all.min.css';
import '@/assets/css/noscript.css';
import '@/assets/css/custom.css';

export default {
  name: "SignPage",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  // computed: {
  //   loggedIn() {
  //     return this.$store.state.auth.status.loggedIn;
  //   },
  // },
  created() {
    if (this.loggedIn) {
      this.$router.push({name: "chat"});
    }
  },
  mounted() {
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
          () => {
            this.$router.push({name: "chat"});
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
  },
};
</script>

<style>
#message {
  text-align: center;
}
</style>