<template>
  <div class="wrapper-custom">
    <div v-for="(error, index) in errorQueue" :key="index">
      <a class="button primary custom">{{error}}</a>
      </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'ErrorComponent',
  setup() {
    return {}
  },
  computed: {
    ...mapState({
      errorQueue: state => state.ui.errorQueue,
    })
  },
}
</script>

<style lang="scss" scoped>
.wrapper-custom {
  position: fixed;
  z-index: 9999;
  text-align: right;
  top: 4em;
  right: 1em;
}
</style>