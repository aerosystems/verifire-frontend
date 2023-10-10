<template>
  <div class="wrapper-custom">
    <ul class="actions stacked">
      <li v-for="(error, index) in errorQueue" :key="index">
        <button class="button primary fit" @click="removeError(error)">
          {{ error?.response?.data?.message || error?.message || error }}
        </button>
      </li>
      </ul>
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
  methods: {
    removeError(error) {
      this.$store.commit('ui/removeError', error)
    }
  }
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