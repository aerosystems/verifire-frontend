<template>
  <section class="wrapper style1 fade-up">
    <div class="inner">
      <h2>Get in touch</h2>
      <p>If you have any questions or suggestions, please contact us using the feedback form. Our team will
        definitely answer you</p>
      <div class="split style1">
        <section>
          <Form @submit="sendFeedback" :validation-schema="schema" ref="feedbackForm">
            <div class="fields">
              <div class="field half">
                <label for="name">Name</label>
                <Field type="text" name="name"/>
                <ErrorMessage name="name" class="error-feedback"/>
              </div>
              <div class="field half">
                <label for="email">Email</label>
                <Field type="text" name="email"/>
                <ErrorMessage name="email" class="error-feedback"/>
              </div>
              <div class="field">
                <label for="message">Message</label>
                <Field as="textarea" name="message" rows="5"/>
                <ErrorMessage name="message" class="error-feedback"/>
              </div>
            </div>
            <ul class="actions">
              <li>
                <button class="button submit">Send Message</button>
              </li>
              <li>
                <span v-show="feedbackSuccessResponse" class="response success">{{ feedbackSuccessResponse }}</span>
                <span v-show="feedbackErrorResponse" class="response failed">{{ feedbackErrorResponse }}</span>
              </li>
            </ul>
          </Form>
        </section>
        <section>
          <ul class="contact">
            <li>
              <h3>Address</h3>
              <span>Dnipro, Ukraine</span>
            </li>
            <li>
              <h3>Email</h3>
              <a target="_blank" href="mailto:info@testmail.top">info@testmail.top</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import * as yup from "yup";
import FeedbackService from "@/services/feedback.service.js";

export default {
  name: 'FeedbackComponent',
  setup() {
    return {}
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup
          .string()
          .required("Name is required!")
          .min(3, "Must be at least 3 characters!")
          .max(128, "Must be maximum 128 characters!"),
      email: yup
          .string()
          .required("Email is required!")
          .email("Email must be valid!")
          .min(3, "Must be at least 3 characters!")
          .max(320, "Must be maximum 320 characters!"),
      message: yup
          .string()
          .required("Message is required!")
          .min(3, "Must be at least 3 characters!")
          .max(1024, "Must be maximum 1024 characters!"),
    });
    return {
      feedbackSuccessResponse: '',
      feedbackErrorResponse: '',
      schema
    }
  },
  inject: ['recaptchaLoaded'],
  methods: {
    async sendFeedback(letter) {
      let recaptchaToken = await this.recaptchaLoaded(undefined, undefined);
      this.feedbackSuccessResponse = '';
      this.feedbackErrorResponse = '';
      FeedbackService.send(letter, recaptchaToken)
          .then(response => {
            this.feedbackSuccessResponse = response.data.message;
            this.$refs.feedbackForm.resetForm();
            setInterval(() => {
              this.feedbackSuccessResponse = '';
            }, 5000);
          })
          .catch(error => {
            this.feedbackErrorResponse = error.response.data.message;
            setInterval(() => {
              this.feedbackErrorResponse = '';
            }, 5000);
          })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>