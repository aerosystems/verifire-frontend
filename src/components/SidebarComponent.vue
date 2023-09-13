<template>
  <section id="sidebar">
    <div class="inner">
      <nav>
        <ul v-if="userStatusState.loggedIn">
          <li v-if="userState" class="gradient-email">
            {{ userState.email }}
          </li>
          <li>
            <router-link to="/billing#apikey">API Key</router-link>
          </li>
          <li>
            <router-link to="/billing#fine-tuning">Fine-tuning</router-link>
          </li>
          <li>
            <router-link to="/billing#inspect">Inspect</router-link>
          </li>
          <li>
            <router-link to="/billing#donate">Donate</router-link>
          </li>
          <li>
            <router-link to="/auth/logout">
              Logout
              <font-awesome-icon icon="sign-in-alt"/>
            </router-link>
          </li>
        </ul>
        <ul v-else>
          <li>
            <router-link to="/auth/signin">
              <font-awesome-icon icon="sign-in-alt"/>
              Sign In
            </router-link>
          </li>
          <li>
            <router-link to="/#inspect">Inspect</router-link>
          </li>
          <li>
            <router-link to="/#blacklist">Add Blacklist</router-link>
          </li>
          <li>
            <router-link to="/#whitelist">Add Whitelist</router-link>
          </li>
          <li>
            <router-link to="/#api">API</router-link>
          </li>
          <li>
            <router-link to="/#whatwedo">What We Do</router-link>
          </li>
          <li>
            <router-link to="/#donate">Donate</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {mapState} from "vuex";

export default {
  name: 'SidebarComponent',
  components: {FontAwesomeIcon},
  computed: {
    ...mapState({
      userStatusState: state => state.auth.status,
      userState: state => state.user.user,
    })
  },
}
</script>

<style lang="scss" scoped>
.gradient-email {
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(to right, #5e42a6, #b74e91);
}
</style>