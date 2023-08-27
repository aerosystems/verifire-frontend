<template>
  <section id="addBlacklist" class="wrapper style1 fullscreen fade-up">
    <div class="inner">
      <section>
        <h1>Add domain to BLACKLIST</h1>
        <form method="post" action="#" id="addBlacklistRequest">
          <input type="hidden" name="recaptchaAdd" id="recaptchaAddBlacklist"/>
          <input type="hidden" name="type" value="blacklist"/>
          <div class="row gtr-uniform">
            <div class="col-6 col-12-xsmall">
              <input type="text" name="domain" id="domainBlacklist" value="" placeholder="Input domain"/>
            </div>
            <div class="col-6 col-12-xsmall">
              <ul class="actions">
                <li><input type="submit" value="add to blacklist" id="interactionAddBlacklist" class="primary"/>
                </li>
              </ul>
            </div>
            <div class="col-12 col-12-xsmall" id="addBlacklistResponse">
            </div>
          </div>
        </form>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BlacklistComponent',
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>