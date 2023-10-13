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
                <div class="col-4">
                  <pre><code>{{ project.token }}</code></pre>
                </div>
                <div class="col-2">
                  <a @click="copyToken(project.token)" class="button">
                    <font-awesome-icon icon="fa-copy"/>
                    Copy
                  </a>
                </div>
                <div class="col-1">
                  <a @click="deleteProject(project.id)" class="button">
                    <font-awesome-icon icon="fa-trash"/>
                    Del
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
                    <li>
                      <a href="#" class="button primary" :class="{'disabled': userRoleState === 'startup'}" @click="addProject">
                        <font-awesome-icon icon="fa-add"/> Add
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-12">
                  <span v-show="addSuccessResponse" class="response success">{{ addSuccessResponse }}</span>
                  <span v-show="addErrorResponse" class="response failed">{{ addErrorResponse }}</span>
                </div>
              </div>
            </form>
          </section>
          <section>
            <h4>
              Look more in <router-link to="/usage" target="_blank">examples</router-link>
            </h4>
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
    deleteProject(id) {
      this.$store.dispatch('project/deleteProject', id);
    },
    addProject() {
      const project = {
        projectName: this.projectName,
        userId: this.userState.id,
      };
      this.$store.dispatch('project/addProject', project).then(
          response => {
            this.projectName = '';
            this.addSuccessResponse = 'Project ' + response.name + ' added successfully';
            setTimeout(() => {
              this.addSuccessResponse = '';
            }, 3000);
          },
          error => {
            this.addErrorResponse = error.response.data.message;
            setTimeout(() => {
              this.addErrorResponse = '';
            }, 3000);
          }
      );
    },
  },
}
</script>

<style lang="scss" scoped>
pre code {
  padding: 0.75em 1em;
}
</style>