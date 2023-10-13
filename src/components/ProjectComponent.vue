<template>
  <section id="apikey" class="wrapper style3 spotlights">
    <section>
      <div class="content">
        <div class="inner">
          <h2>Your token, for give access to API:</h2>
          <section>
            <form>
              <div class="row">
                <div class="col-3">
                  <select class="form-control" v-model="project">
                    <option v-for="projectItem in projectListState" :key="projectItem.id" :value="projectItem">
                      {{ projectItem.name }}
                    </option>
                  </select>
                </div>
                <div class="col-3">
                  <pre><code>{{ project.token }}</code></pre>
                </div>
                <div class="col-2">
                  <a @click="copyToken(project.token)" class="button">
                    <font-awesome-icon icon="fa-copy"/>
                    Copy
                  </a>
                </div>
                <div class="col-2">
                  <a @click="delete(project.id)" class="button">
                    <font-awesome-icon icon="fa-trash"/>
                    Delete
                  </a>
                </div>
              </div>
            </form>
          </section>
          <h2>Add Project:</h2>
          <section>
            <form @submit.prevent="addProject">
              <div class="row">

                <div class="col-6">
                  <input v-model="projectName" type="text" placeholder="Input project name"/>
                </div>

                <div class="col-6">
                  <ul class="actions">
                    <li><input type="submit" value="Add" class="primary" :class="{'disabled': userRoleState !== 'startup'}"/></li>
                  </ul>
                </div>

                <div class="col-12">
                  <span v-show="addSuccessResponse" class="response success">{{ addSuccessResponse }}</span>
                  <span v-show="addErrorResponse" class="response failed">{{ addErrorResponse }}</span>
                </div>

              </div>
            </form>

<!--              <router-link to="/usage" target="_blank" class="button">Examples</router-link>-->

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
      projectName: '',
      addSuccessResponse: '',
      addErrorResponse: '',
    }
  },
  beforeMount() {
    this.$store.dispatch('project/setProjectList');
  },
  computed: {
    ...mapState({
      projectListState: state => state.project.projectList,
      projectState: state => state.project.project,
      userState: state => state.user.user,
      userRoleState: state => state.user.role,
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
    copyToken(data) {
      const el = document.createElement('textarea');
      el.value = data;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },
  },
}
</script>

<style lang="scss" scoped>
pre code {
  padding: 0.75em 1em;
}
</style>