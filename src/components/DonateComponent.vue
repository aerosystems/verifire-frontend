<template>
  <section id="donate" class="wrapper style2 spotlights">
    <section>
      <a href="https://www.paypal.com/donate?hosted_button_id=R8VQUPGB5THPG" class="image" id="qr-paypal"><img
          src="/images/donate-paypall-full.png" alt="Pay Pall Donate"/></a>
      <div class="content">
        <div class="inner">
          <section>
            <h2>Help us become better for you</h2>
            <form action="https://www.paypal.com/donate" method="post" target="_top">
              <input type="hidden" name="hosted_button_id" value="R8VQUPGB5THPG"/>
              <input type="image" src="/images/donate-logo-paypall.png" name="submit"
                     title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button"
                     id="donate-paypal"/>
              <!-- <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" /> -->
              <!-- <img alt="" border="0" src="https://www.paypal.com/en_UA/i/scr/pixel.gif" width="1" height="1" /> -->
            </form>
            <span onclick="location.href='https://send.monobank.ua/jar/6Z6wF8CZxB'" style="cursor: pointer;"><img
                src="/images/donate-logo-monobank.jpg" alt="Monobank Donate" id="donate-monobank"/></span>
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
  }
}
</script>

<style lang="scss" scoped>

</style>