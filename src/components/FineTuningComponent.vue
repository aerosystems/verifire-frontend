<template>
  <section id="fine-tuning" class="wrapper style4 spotlights">
    <section>
      <div class="content">
        <div class="inner">
          <h2>Fine-tuning database:</h2>
          <section>
            <h3>Add domain to BLACKLIST</h3>
            <form @submit.prevent="addDomainToBlacklist">
              <div class="row gtr-uniform">
                <div class="col-10 col-12-xsmall">
                  <input v-model="blacklistInput" type="text" name="domain" placeholder="Input domain"/>
                </div>
                <div class="col-2 col-12-xsmall">
                  <ul class="actions">
                    <li><input type="submit" value="add" class="button"/>
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
          <section>
            <h3>Add domain to WHITELIST</h3>
            <form @submit.prevent="addDomainToWhitelist">
              <div class="row gtr-uniform">
                <div class="col-10 col-12-xsmall">
                  <input v-model="whitelistInput" type="text" name="domain" placeholder="Input domain"/>
                </div>
                <div class="col-2 col-12-xsmall">
                  <ul class="actions">
                    <li><input type="submit" value="add" class="button"/>
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
      </div>
    </section>
  </section>
</template>
<script>
import CheckmailService from "@/services/checkmail.service";
import {mapState} from "vuex";

export default {
  name: 'FineTuningComponent',
  setup() {
    return {}
  },
  data() {
    return {
      blacklistInput: '',
      blacklistSuccessResponse: '',
      blacklistErrorResponse: '',
      whitelistInput: '',
      whitelistSuccessResponse: '',
      whitelistErrorResponse: '',
    }
  },
  computed: {
    ...mapState({
      projectListState: state => state.project.projectList,
    })
  },
  methods: {
    async addDomainToBlacklist() {
      this.blacklistSuccessResponse = '';
      this.blacklistErrorResponse = '';
      let data = {
        "name": this.blacklistInput,
        "type": "blacklist"
      }
      let defaultProject = this.projectListState.find(project => project.name === "default");
      CheckmailService.setFilter(data, defaultProject.token).then(
          response => {
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
    },
    addDomainToWhitelist() {
      console.log('addDomainWhitelist');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>