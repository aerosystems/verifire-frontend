<template>
  <section id="check" class="wrapper style1 fullscreen fade-up">
    <div class="inner">
      <div class="features">
        <section>
          <span class="icon solid major fa-lock"></span>
          <h3 id="blacklistCount">BLACKLIST: 0</h3>
          <p></p>
        </section>
        <section>
          <span class="icon solid major fa-unlock"></span>
          <h3 id="whitelistCount">WHITELIST: 0</h3>
          <p></p>
        </section>
      </div>
      <h1>Input Email or Domain</h1>
      <p>The check is carried out on the basis of temporary (10-minute) mails</p>
      <section>
        <form method="post" action="#" id="checkRequest">
          <input type="hidden" name="recaptchaCheck" id="recaptchaCheck"/>
          <div class="row gtr-uniform">

            <div class="col-6 col-12-xsmall">
              <input type="text" name="data" id="dataDomain" value="" placeholder="example@mail.com or mail.com"/>
            </div>

            <div class="col-6 col-12-xsmall">
              <ul class="actions">
                <li><input type="submit" value="Check" id="interactionCheck" class="primary"/></li>
              </ul>
            </div>

            <div class="col-12 col-12-xsmall" id="checkResponse">
            </div>

          </div>
        </form>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SearchComponent',
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>