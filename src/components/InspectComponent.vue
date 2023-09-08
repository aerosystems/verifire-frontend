<template>
  <section id="inspect" class="wrapper style1 fullscreen fade-up custom-section">
    <div class="inner">
      <div class="features">
        <section>
          <span class="icon solid major fa-lock"></span>
          <h3>BLACKLIST: {{ blacklistCount }}</h3>
          <p></p>
        </section>
        <section>
          <span class="icon solid major fa-unlock"></span>
          <h3>WHITELIST: {{ whitelistCount }}</h3>
          <p></p>
        </section>
      </div>
      <h1>Input Email or Domain</h1>
      <p>The check is carried out on the basis of temporary (10-minute) mails</p>
      <section>
        <form @submit.prevent="inspect">
          <div class="row gtr-uniform">

            <div class="col-6 col-12-xsmall">
              <input v-model="searchInput" type="text" placeholder="example@mail.com or mail.com"/>
            </div>

            <div class="col-6 col-12-xsmall">
              <ul class="actions">
                <li><input type="submit" value="Check" class="primary"/></li>
              </ul>
            </div>

            <div class="col-12 col-12-xsmall">
              <span v-show="searchSuccessResponse" class="response success">{{ searchSuccessResponse }}</span>
              <span v-show="searchErrorResponse" class="response failed">{{ searchErrorResponse }}</span>
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
  name: 'SearchComponent',
  setup() {
    return {}
  },
  data() {
    return {
      blacklistCount: 0,
      whitelistCount: 0,
      searchInput: '',
      searchSuccessResponse: '',
      searchErrorResponse: ''
    }
  },
  mounted() {
    this.getListCount();
  },
  inject: ['recaptchaLoaded'],
  methods: {
    async getListCount() {
      let recaptchaToken = await this.recaptchaLoaded(undefined, undefined);
      CheckmailService.getCount(recaptchaToken).then(
          async response => {
            const targetBlacklistCount = response.data.data.blacklist;
            const targetWhitelistCount = response.data.data.whitelist;

            // Функція для асинхронного збільшення blacklistCount
            const increaseBlacklistCount = async () => {
              while (this.blacklistCount < targetBlacklistCount) {
                await new Promise(resolve => setTimeout(resolve, 1));
                if (this.blacklistCount + 1234 > targetBlacklistCount) {
                  this.blacklistCount = targetBlacklistCount;
                  break;
                }
                this.blacklistCount += 1234;
              }
            };

            // Функція для асинхронного збільшення whitelistCount
            const increaseWhitelistCount = async () => {
              while (this.whitelistCount < targetWhitelistCount) {
                await new Promise(resolve => setTimeout(resolve, 1));
                if (this.whitelistCount + 1234 > targetWhitelistCount) {
                  this.whitelistCount = targetWhitelistCount;
                  break;
                }
                this.whitelistCount += 1234;
              }
            };

            // Запускаємо обидві функції асинхронно
            await Promise.all([increaseBlacklistCount(), increaseWhitelistCount()]);
          }
      );
    },
    async inspect() {
      let recaptchaToken = await this.recaptchaLoaded(undefined, undefined);
      this.searchSuccessResponse = '';
      this.searchErrorResponse = '';

      CheckmailService.inspect(this.searchInput, recaptchaToken).then(
          response => {
            this.searchSuccessResponse = response.data.message;
            setTimeout(() => {
              this.searchSuccessResponse = '';
            }, 5000);
          },
          error => {
            this.searchErrorResponse =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setTimeout(() => {
              this.searchErrorResponse = '';
            }, 5000);
          }
      );
    }
  }
}
</script>

<style lang="scss" scoped>

</style>