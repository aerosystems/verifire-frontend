<template>
  <section id="subscription" class="wrapper style5 spotlights">
    <section>
      <div class="content">
        <div class="inner">
          <h2>Your subscription {{ isSubscriptionActive ? 'is #' + subscriptionName  : '#' + subscriptionName + ' was expired' }}</h2>
          <section>
            <h3> {{isSubscriptionActive ? 'Is active to '+ formattedDate : 'Was active to ' + formattedDate}}</h3>
          </section>
          <section>
            <router-link to="/checkout" class="button primary small">Upgrade subscription</router-link>
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
    },
    isSubscriptionActive() {
      return this.accessTime > Date.now();
    }
  },
}
</script>

<style lang="scss" scoped>

</style>