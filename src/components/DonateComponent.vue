<template>
  <section id="donate" class="wrapper style2 spotlights">
    <section>
      <a href="https://www.paypal.com/donate?hosted_button_id=R8VQUPGB5THPG" class="image full-filling">
        <img :src="require('@/assets/images/donate-paypal-full.png')" alt="PayPal Donate" data-position="center center" class="full-width-image"/>
      </a>
      <div class="content">
        <div class="inner">
          <section>
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
          </section>
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
      window.location.href = 'https://send.monobank.ua/jar/6Z6wF8CZxB';
    }
  }
}
</script>

<style scoped>

.full-filling {
  position: relative;
  display: block;
}

.full-width-image {
  width: 100%;
}

.elem-as-link {
  cursor: pointer;
}
</style>