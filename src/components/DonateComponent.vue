<template>
  <section id="donate" class="wrapper style2 spotlights">
    <section>
      <a href="https://www.paypal.com/donate?hosted_button_id=R8VQUPGB5THPG" class="image">
        <img :src="require('@/assets/images/donate-paypal.png')" alt="PayPal Donate" data-position="center center"/>
      </a>
      <div class="content">
        <div class="inner">
          <h2>Help us become better for you</h2>
          <form action="https://www.paypal.com/donate" method="post" target="_top">
            <input type="hidden" name="hosted_button_id" value="R8VQUPGB5THPG"/>
            <input type="image" :src="require('@/assets/images/donate-logo-paypal.png')" name="submit"
                   title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button"
                   id="donate-paypal"/>
          </form>
          <span @click="this.redirectToMonobank" class="elem-as-link">
              <img :src="require('@/assets/images/donate-logo-monobank.jpg')" alt="Monobank Donate"/>
            </span>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'DonateComponent',
  setup() {


    return {}
  },
  methods: {
    redirectToMonobank() {
      window.location.href = 'https://send.monobank.ua/jar/35w3wDBesR';
    }
  }
}
</script>

<style scoped>




</style>