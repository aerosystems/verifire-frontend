<template>
  <section id="sidebar">
    <div class="inner">
      <nav>
        <ul>
          <li>
            <router-link to="/signin"><font-awesome-icon icon="sign-in-alt"/> Sign In</router-link>
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
export default {
  name: 'SidebarComponent',
  setup() {


    return {}
  },
  methods: {
    scrollToElement(targetId) {
      const el = document.getElementById(targetId.value);

      if (el) {
        el.scrollIntoView();
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>