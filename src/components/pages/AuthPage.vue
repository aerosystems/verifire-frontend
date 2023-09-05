<template>
  <div class="form-outer">
    <router-view/>
  </div>
</template>

<script>

import {useReCaptcha} from 'vue-recaptcha-v3'
import router from "@/router";

export default {
  name: "AuthPage",
  setup() {
    document.title = "Auth";
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

    return {
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

<style lang="scss">

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
  background-color: #5e42a6;
}

.center-container {
  display: flex; /* Встановлюємо контейнер як гнучкий контейнер */
  align-items: center; /* Вирівнюємо елементи по вертикалі */
  justify-content: center; /* Вирівнюємо елементи по горизонталі */
  text-align: center; /* Вирівнюємо текст всередині контейнера */
}

.response {
  border-radius: 0.25em;
  border: solid 1px rgba(255, 255, 255, 0.15);
  font-family: "Courier New", monospace;
  font-size: 0.9em;
  margin: 0 0.25em;
  padding: 0.25em 0.65em;
}

.success {
  background: rgba(0, 255, 0, 0.38);
}

.failed {
  background: rgba(255, 0, 0, 0.38);
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