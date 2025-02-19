<template>
  <section id="main" class="wrapper">
    <div class="inner">
      <h1 class="major">Please, choose subscription</h1>
      <table>
        <thead>
        <tr>
          <th></th>
          <th>Business</th>
          <th>Startup</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Amount of Projects</td>
          <td>✅ Unlimited</td>
          <td>😕 Only one</td>
        </tr>
        <tr>
          <td>Requests</td>
          <td>✅ Unlimited</td>
          <td>😕 300/month</td>
        </tr>
        <tr>
          <td>Custom Filters</td>
          <td>✅ Unlimited</td>
          <td>❌ Nothing</td>
        </tr>
        <tr>
          <td>Support</td>
          <td>✅ 24/7</td>
          <td>❌ Nothing</td>
        </tr>
        <tr>
          <td>Price per Month</td>
          <td>$10</td>
          <td>$5</td>
        </tr>
        <tr>
          <td>Price per Year</td>
          <td><s>$120</s> $100</td>
          <td><s>$60</s> $50</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td></td>
          <td>
            <router-link to="/checkout/business" class="button primary small">Chose</router-link>
          </td>
          <td>
            <router-link to="/checkout/startup" class="button small">Chose</router-link>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  setup() {
    return {}
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>

</style>