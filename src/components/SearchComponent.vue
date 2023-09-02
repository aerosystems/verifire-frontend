<template>
  <section id="check" class="wrapper style1 fullscreen fade-up">
    <div class="inner">
      <div class="features">
        <section>
          <span class="icon solid major fa-lock"></span>
          <h3 id="blacklistCount">BLACKLIST: {{ blacklistCount }}</h3>
          <p></p>
        </section>
        <section>
          <span class="icon solid major fa-unlock"></span>
          <h3 id="whitelistCount">WHITELIST: {{ whitelistCount }}</h3>
          <p></p>
        </section>
      </div>
      <h1>Input Email or Domain</h1>
      <p>The check is carried out on the basis of temporary (10-minute) mails</p>
      <section>
        <form method="post" action="#" id="checkRequest">
          <input type="hidden" name="recaptchaCheck" id="recaptchaCheck"/>
          <div class="row gtr-uniform">

            <div class="col-6 col-12-xsmall">
              <input v-model="searchInput" type="text" placeholder="example@mail.com or mail.com"/>
            </div>

            <div class="col-6 col-12-xsmall">
              <ul class="actions">
                <li><input @click="check" type="submit" value="Check" class="primary"/></li>
              </ul>
            </div>

            <div class="col-12 col-12-xsmall">
              <span v-if="searchResponse" class="response success">{{ searchResponse }}</span>
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
      searchResponse: '',
      recaptchaToken: '',
    }
  },
  async mounted() {
    this.recaptchaToken = await this.recaptcha(undefined, undefined)
    this.getListCount();
  },
  inject: ['recaptcha'],
  methods: {
    getListCount() {
      CheckmailService.getCount(this.recaptchaToken).then(
          async response => {
            const targetBlacklistCount = response.blacklist;
            const targetWhitelistCount = response.whitelist;

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
          },
          error => {
            console.log(error);
          }
      );
    },
    check() {
      CheckmailService.check(this.searchInput, this.recaptchaToken).then(
          response => {
            this.searchResponse = response.message;
          },
          error => {
            this.searchResponse = error.response.data.message;
          }
      );
    }
  },
}
</script>

<style scoped>
.response {
  border-radius: 0.25em;
  border: solid 1px rgba(255, 255, 255, 0.15);
  font-family: "Courier New", monospace;
  font-size: 0.9em;
  margin: 0 0.25em;
  padding: 0.25em 0.65em;
}

.success {
  background: rgba(183, 255, 0, 0.38);
}

.failed {
  background: rgba(255, 0, 0, 0.38);
}
</style>