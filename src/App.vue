<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import '@/assets/css/noscript.css';
import '@/assets/css/main.css';

export default {};
</script>

<style lang="scss">
html, body {
  height: 100%;
}

#app {
  height: 100%;
}

.container {
  height: 100%;
}
</style>