<template>
  <section id="main" class="wrapper">
    <div class="inner">
      <h1 class="major">Payment is processing</h1>
      <p>Thank you for your contribution to the fight against temporary mail services. This motivates our team to
        develop new algorithms for finding and adding new domains to the blacklist of temporary mails.</p>
      <p>Your funds are used to pay for dedicated servers, protection against DDoS attacks, and also to maintain the
        performance of our infrastructure.</p>
    </div>
  </section>
</template>

<script>
import router from "@/router";

export default {
  setup() {


    return {}
  },
  mounted() {
    setTimeout(() => {
          router.push({name: "main"});
        }, 5000
    );
  }
}
</script>

<style lang="scss" scoped>

</style>