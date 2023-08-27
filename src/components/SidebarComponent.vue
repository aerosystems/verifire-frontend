<template>
  <section id="sidebar">
    <div class="inner">
      <nav>
        <ul>
          <li id='enter'></li>
          <li>
            <router-link to="/#check">Check</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/', hash: '#addWhitelist' }">Add Blacklist</router-link>
          </li>
          <li><a href="#addWhitelist">Add Whitelist</a></li>
          <li><a href="#api">API</a></li>
          <li><a href="#whatwedo">What We Do</a></li>
          <li><a href="#donate">Donate</a></li>
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
  }
}
</script>

<style lang="scss" scoped>

</style>