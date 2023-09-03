<template>
  <div class="is-preload">
    <!-- Sidebar -->
    <sidebar-component/>

    <!-- Wrapper -->
    <div id="wrapper">

      <!-- Check -->
      <inspect-component/>

      <!-- Add domain to BLACKLIST -->
      <blacklist-component/>

      <!-- Add domain to WHITELIST -->
      <whitelist-component/>

      <!-- API -->
      <api-component/>

      <!-- What we do -->
      <about-component/>

      <!-- Donate -->
      <donate-component/>

      <!-- Get in touch -->
      <feedback-component/>
    </div>

    <!-- Footer -->
    <footer-component/>

  </div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import FeedbackComponent from "@/components/FeedbackComponent.vue";
import DonateComponent from "@/components/DonateComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";
import ApiComponent from "@/components/ApiComponent.vue";
import WhitelistComponent from "@/components/WhitelistComponent.vue";
import BlacklistComponent from "@/components/BlacklistComponent.vue";
import InspectComponent from "@/components/InspectComponent.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
import {useReCaptcha} from "vue-recaptcha-v3";

import '@/assets/css/fontawesome-all.min.css';
import '@/assets/css/noscript.css';
import '@/assets/css/main.css';

export default {
  name: "MainPage",
  components: {
    SidebarComponent,
    InspectComponent,
    BlacklistComponent,
    WhitelistComponent,
    ApiComponent,
    AboutComponent,
    DonateComponent,
    FeedbackComponent,
    FooterComponent
  },
  setup() {
    document.title = "Testmail";
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
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
  provide() {
    return {
      recaptchaLoaded: this.recaptcha
    }
  },
}
</script>

<style>
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

.custom-section {
  background-attachment: fixed;
  background-image: url("@/assets/css/images/intro.svg");
  background-position: top right;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.custom-section p {
  font-size: 1.25em;
}

@media screen and (max-width: 980px) {
  .custom-section p br {
    display: none;
  }
}

@media screen and (max-width: 736px) {
  .custom-section p {
    font-size: 1em;
  }
}

@media screen and (max-width: 1280px) {
  .custom-section {
    background-attachment: scroll;
  }
}
</style>