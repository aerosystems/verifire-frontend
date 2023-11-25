<template>
  <section id="whatwedo" class="wrapper style6 fade-up">
    <div class="inner">
      <h2>What we do</h2>
      <p><a href="https://testmail.top/">Testmail.top</a> is a service for checking mail domains and addresses of
        temporary e-mail boxes, which allows you to get up-to-date information about the presence of email addresses
        and domains in the database of temporary mail domains. The <a href="https://testmail.top/">database of
          domains</a> contains the most up-to-date, extended list of temporary mailboxes, which are used for quick,
        short-term registration, which leads to the filling of the user base with ineffective, irrelevant temporary
        mailboxes. To check a mailing address for its presence in the spam databases of temporary, 10-minute email
        addresses, we use a unique technology that allows us to track the mailbox / domain and identify it as SPAM
        or tempmail, while excluding all checked and reliable email services such as Gmail, Yahoo, Yandex and others
        ...</p>
      <div class="features">
        <section>
          <span class="icon solid major"><font-awesome-icon icon="fa-code" /></span>
          <h3>Unique Lists</h3>
          <p>We have collected domains of both temporary mails and trust services from a million registrations
            around the world, which makes our database the most complete in the world</p>
        </section>
        <section>
          <span class="icon solid major"><font-awesome-icon icon="fa-lock" /></span>
          <h3>Deep Scan</h3>
          <p>Each undefined domain is analyzed and redefined in a matter of minutes, ensuring that it is identified
            on subsequent requests</p>
        </section>
        <section>
          <span class="icon solid major"><font-awesome-icon icon="fa-cog" /></span>
          <h3>Login Help</h3>
          <p>Thanks to our service, you can easily indicate to the client of your service a typo when entering your
            mail, which will significantly increase the number of confirmed registrations</p>
        </section>
        <section>
          <span class="icon solid major"><font-awesome-icon icon="fa-desktop" /></span>
          <h3>Quality of registrations</h3>
          <p>Undoubtedly, if your service provides a trial period on the basis of registration rights, people are
            expected to register from temporary mail services. Our task is to prevent this</p>
        </section>
        <section>
          <span class="icon solid major"><font-awesome-icon icon="fa-link" /></span>
          <h3>Declared war on 10-minute mails</h3>
          <p>The mission of our company is the complete elimination of temporary mail services, we believe in
            ourselves! Join us, together we are strong!</p>
        </section>
        <section>
          <span class="icon major"><font-awesome-icon icon="fa-gem" /></span>
          <h3>Statistics</h3>
          <p>We collect interesting infographics, the main indicators of the most intimate - <b>registration of your
            customers</b>, something but this is really the main indicator of the effectiveness of your marketing
          </p>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: 'AboutComponent',
  components: {FontAwesomeIcon},
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>

.wrapper.style6 .icon.major {
  color: #791f77;
}

.wrapper.style6-alt .icon.major {
  color: #641562;
}

</style>