<template>
  <header id="header">
    <router-link to="/" class="title">Testmail</router-link>
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link :to="pagePath" class="active">{{pageName}}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  setup() {
    return {}
  },
  props: {
    pageName: String,
    pagePath: String,
  },
}
</script>

<style lang="scss" scoped>

</style>