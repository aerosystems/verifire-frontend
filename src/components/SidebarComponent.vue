<template>
  <section id="sidebar">
    <div class="inner">
      <nav>
        <ul>
          <li>
            <router-link to="/auth/signin"><font-awesome-icon icon="sign-in-alt"/> Sign In</router-link>
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

export default {
  name: 'SidebarComponent',
  components: {FontAwesomeIcon},
  setup() {


    return {}
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>

</style>