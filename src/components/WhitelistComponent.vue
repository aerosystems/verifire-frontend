<template>
  <section id="whitelist" class="wrapper style1 fullscreen fade-up">
    <div class="inner">
      <section>
        <h1>Add domain to WHITELIST</h1>
        <form method="post" action="#" id="addWhitelistRequest">
          <input type="hidden" name="recaptchaAdd" id="recaptchaAddWhitelist"/>
          <input type="hidden" name="type" value="whitelist"/>
          <div class="row gtr-uniform">
            <div class="col-6 col-12-xsmall">
              <input type="text" name="domain" id="domainWhitelist" value="" placeholder="Input domain"/>
            </div>
            <div class="col-6 col-12-xsmall">
              <ul class="actions">
                <li><input type="submit" value="add to whitelist" id="interactionAddWhitelist" class="primary"/>
                </li>
              </ul>
            </div>
            <div class="col-12 col-12-xsmall" id="addWhitelistResponse">
            </div>
          </div>
        </form>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WhitelistComponent',
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>