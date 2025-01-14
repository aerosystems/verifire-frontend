<template>
  <section id="main" class="wrapper">
    <div class="inner">
      <h1 class="major">Please, choose duration for {{ this.getSubscriptionName() }}</h1>
      <div class="row">
        <ul class="actions">
          <li>
            <a class="button primary" @click="redirectToCheckout(this.subscriptionType, '12m')">Annually</a>
          </li>
          <li>
            <a class="button" @click="redirectToCheckout(this.subscriptionType, '1m')">Monthly</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import SubsService from "@/services/subscription.service";
import store from "@/store";
import router from "@/router";

export default {
  setup() {
    return {}
  },
  data() {
    return {
      subscriptionName: "",
      subscriptionType: "",
    }
  },
  beforeMount() {
    this.subscriptionName = this.getSubscriptionName();
    this.subscriptionType = this.$route.params.subscriptionKind;
  },
  methods: {
    redirectToCheckout(subscriptionType, subscriptionDuration) {
      SubsService.createInvoice('monobank', subscriptionType, subscriptionDuration).then(
          response => {
            window.location.href = response.data.data.paymentUrl;
          },
          error => {
            store.dispatch('ui/addError', error);
          }
      );
    },
    getSubscriptionName() {
      if (SubsService.getSubscriptionName(this.$route.params.subscriptionKind)) {
        return SubsService.getSubscriptionName(this.$route.params.subscriptionKind);
      }
      router.push("/checkout");
    }
  },

}
</script>

<style lang="scss" scoped>

</style>