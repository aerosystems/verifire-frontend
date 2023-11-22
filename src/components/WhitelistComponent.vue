<template>
  <section id="whitelist" class="wrapper style4 fullscreen fade-up custom-section">
    <div class="inner">
      <section>
        <h1>Add domain to WHITELIST</h1>
        <form @submit.prevent="addDomainToWhitelist">
          <div class="row gtr-uniform">
            <div class="col-6 col-12-xsmall">
              <input v-model="whitelistInput" type="text" name="domain" placeholder="Input domain"/>
            </div>
            <div class="col-6 col-12-xsmall">
              <ul class="actions">
                <li><input type="submit" value="add to whitelist" class="primary"/>
                </li>
              </ul>
            </div>
            <div class="col-12 col-12-xsmall">
              <span v-show="whitelistSuccessResponse" class="response success">{{ whitelistSuccessResponse }}</span>
              <span v-show="whitelistErrorResponse" class="response failed">{{ whitelistErrorResponse }}</span>
            </div>
          </div>
        </form>
      </section>
    </div>
  </section>
</template>

<script>
import CheckmailService from "@/services/checkmail.service";
export default {
  name: 'WhitelistComponent',
  setup() {
    return {}
  },
  data() {
    return {
      whitelistInput: '',
      whitelistSuccessResponse: '',
      whitelistErrorResponse: ''
    }
  },
  inject: ['recaptchaLoaded'],
  methods: {
    async addDomainToWhitelist() {
      let recaptchaToken = await this.recaptchaLoaded(undefined, undefined);
      this.whitelistSuccessResponse = '';
      this.whitelistErrorResponse = '';
      let data = {
        "name": this.whitelistInput,
        "type": "whitelist"
      }
      CheckmailService.setDomainReview(data, recaptchaToken).then(
          response => {
            this.whitelistSuccessResponse = response.data.message;
            setTimeout(() => {
              this.whitelistSuccessResponse = '';
              this.whitelistInput = '';
            }, 5000);
          },
          error => {
            this.whitelistErrorResponse =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setTimeout(() => {
              this.whitelistErrorResponse = '';
              this.whitelistInput = '';
            }, 5000);
          }
      )
    }
  }
}
</script>

<style lang="scss" scoped>

</style>