<template>
  <section class="wrapper style3 spotlights">
    <section>
      <div class="content">
        <div class="inner">
          <h2>Your token, for give access to API:</h2>
          <section>
            <div v-for="project in projectListState" :key="project.id" class="row">
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
              <router-link to="/usage" target="_blank" class="button">Examples of using</router-link>
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
      projects: [],
    }
  },
  beforeMount() {
    this.$store.dispatch('project/setProject');
  },
  computed: {
    ...mapState({
      projectListState: state => state.project.projectList,
    })
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
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
}
</style>