<template>
  <section id="blacklist" class="wrapper style1 fullscreen fade-up custom-section">
    <div class="inner">
      <section>
        <h1>Add domain to BLACKLIST</h1>
        <form @submit.prevent="addDomainToBlacklist">
          <div class="row gtr-uniform">
            <div class="col-6 col-12-xsmall">
              <input v-model="blacklistInput" type="text" name="domain" placeholder="Input domain"/>
            </div>
            <div class="col-6 col-12-xsmall">
              <ul class="actions">
                <li><input type="submit" value="add to blacklist" class="primary"/>
                </li>
              </ul>
            </div>
            <div class="col-12 col-12-xsmall">
              <span v-show="blacklistSuccessResponse" class="response success">{{ blacklistSuccessResponse }}</span>
              <span v-show="blacklistErrorResponse" class="response failed">{{ blacklistErrorResponse }}</span>
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
  name: 'BlacklistComponent',
  setup() {
    return {}
  },
  data() {
    return {
      blacklistInput: '',
      blacklistSuccessResponse: '',
      blacklistErrorResponse: ''
    }
  },
  inject: ['recaptchaLoaded'],
  methods: {
    async addDomainToBlacklist() {
      let recaptchaToken = await this.recaptchaLoaded(undefined, undefined);
      this.blacklistSuccessResponse = '';
      this.blacklistErrorResponse = '';
      let data = {
        "name": this.blacklistInput,
        "type": "blacklist"
      }
      CheckmailService.setFilter(data, recaptchaToken).then(
          response => {
            console.log(response.data.message);
            this.blacklistSuccessResponse = response.data.message;
            setTimeout(() => {
              this.blacklistSuccessResponse = '';
            }, 5000);
          },
          error => {
            this.blacklistErrorResponse =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setTimeout(() => {
              this.blacklistErrorResponse = '';
            }, 5000);
          }
      )
    }
  }
}
</script>

<style scoped>

#blacklist {
  background-color: #b74e91;
}

</style>