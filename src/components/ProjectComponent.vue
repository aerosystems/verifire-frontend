<template>
  <section id="apikey" class="wrapper style3 spotlights">
    <section>
      <div class="content">
        <div class="inner">
          <h2>Your token, for give access to API:</h2>
          <section>
            <form>
              <div class="row">
                <div class="col-6">
                  <select class="form-control" v-model="project">
                    <option v-for="projectItem in projectListState" :key="projectItem.id" :value="projectItem">
                      {{ projectItem.name }}
                    </option>
                  </select>
                </div>
                <div class="col-6">
                  <router-link to="/usage" target="_blank" class="button">Examples of using</router-link>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-10">
                <pre><code>{{ project.token }}</code></pre>
              </div>
              <div class="col-2">
                <button @click="copyToken(project.token)" class="button">
                  <font-awesome-icon icon="fa-copy"/>
                  Copy
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import {mapState} from "vuex";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  components: {FontAwesomeIcon},
  setup() {
    return {}
  },
  data() {
    return {
      project: {},
    }
  },
  beforeMount() {
    this.$store.dispatch('project/setProjectList');
  },
  computed: {
    ...mapState({
      projectListState: state => state.project.projectList,
      projectState: state => state.project.project,
    })
  },
  watch: {
    projectState: {
      handler() {
        this.project = this.projectState;
      },
      immediate: true,
    },
    project: {
      handler() {
        this.$store.dispatch('project/setProject', this.project);
      },
      deep: true,
    },
  },
  methods: {
    copyToken(token) {
      const el = document.createElement('textarea');
      el.value = token;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },
  },
}
</script>

<style lang="scss" scoped>

</style>