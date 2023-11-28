<template>
  <section id="subscription" class="wrapper style5 spotlights">
    <section>
      <div class="content">
        <div class="inner">
          <h2>Your subscription is #{{ subscriptionName }}</h2>
          <section>
            <h3>Is active to {{ formattedDate }}</h3>
          </section>
          <section>
            <button class="button primary small" @click="setSubscription">Upgrade subscription</button>
          </section>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import {mapState} from "vuex";
import moment from "moment";

export default {
  setup() {

    return {}
  },
  data() {
    return {}
  },
  beforeMount() {
    this.$store.dispatch('subscription/setSubscription');
  },
  computed: {
    ...mapState({
      subscriptionName: state => state.subscription.name,
      accessTime: state => state.subscription.accessTime,
    }),
    formattedDate() {
      return moment(this.accessTime).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
}
</script>

<style lang="scss" scoped>

</style>