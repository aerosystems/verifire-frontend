<template>
  <section class="wrapper style1 fade-up">
    <div class="inner">
      <h2>Get in touch</h2>
      <p>If you have any questions or suggestions, please contact us using the feedback form. Our team will
        definitely answer you</p>
      <div class="split style1">
        <section>
          <form method="post" action="#" id="sendmail">
            <input type="hidden" name="recaptchaSend" id="recaptchaSendMail"/>
            <div class="fields">
              <div class="field half">
                <label for="name">Name</label>
                <input type="text" name="name" id="name"/>
              </div>
              <div class="field half">
                <label for="email">Email</label>
                <input type="text" name="email" id="email"/>
              </div>
              <div class="field">
                <label for="message">Message</label>
                <textarea name="message" id="message" rows="5"></textarea>
              </div>
            </div>
            <ul class="actions">
              <li><a href="" class="button submit" id="sendMessage">Send Message</a></li>
              <li id="response"></li>
            </ul>
          </form>
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
export default {
  name: 'FeedbackComponent',
  setup() {

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>