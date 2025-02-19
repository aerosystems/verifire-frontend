<template>
  <section id="inspect" class="wrapper style6 spotlights">
    <section>
      <div class="content">
        <div class="inner">
          <h2>Try to Inspect data:</h2>
          <section>
            <h3>A simple search that uses the selected API key</h3>
            <form @submit.prevent="inspect">
              <div class="row gtr-uniform">
                <div class="col-10 col-12-xsmall">
                  <input v-model="inspectInput" type="text" name="data" placeholder="Input email or domain"/>
                </div>
                <div class="col-2 col-12-xsmall">
                  <ul class="actions">
                    <li><input type="submit" value="inspect" class="button"/>
                    </li>
                  </ul>
                </div>
                <div class="col-12 col-12-xsmall">
              <span v-show="inspectSuccessMessage"
                    :class="['response', inspectSuccessClass]">{{ inspectSuccessMessage }}</span>
                  <span v-show="inspectErrorMessage" class="response failed">{{ inspectErrorMessage }}</span>
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
  data() {
    return {
      inspectInput: '',
      inspectSuccessMessage: '',
      inspectSuccessClass: 'success-undefined',
      inspectErrorMessage: '',
      inspectSuccessClasses: {
        'whitelist': 'success-whitelist',
        'blacklist': 'success-blacklist'
      }
    }
  },
  computed: {
    ...mapState({
      projectState: state => state.project.project,
    })
  },
  methods: {
    async inspect() {
      this.inspectSuccessMessage = '';
      this.inspectErrorMessage = '';
      CheckmailService.inspectPrivate(this.inspectInput, this.projectState.token).then(
          response => {
            const {message, domain} = response.data;
            this.inspectSuccessMessage = message;

            this.inspectSuccessClass = this.inspectSuccessClasses[domain.type];
            setTimeout(() => {
              this.inspectSuccessMessage = '';
            }, 5000);
          },
          error => {
            this.inspectErrorMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setTimeout(() => {
              this.inspectErrorMessage = '';
            }, 5000);
          }
      );
    }
  }
}
</script>

<style lang="scss" scoped>

</style>