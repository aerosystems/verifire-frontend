<template>
  <section id="api" class="wrapper style2 spotlights">
    <section>
      <div class="content" id="api-check">
        <div class="inner">
          <h2>API: Check Domain/Email mailbox address</h2>
          <p>
            URL: <code style="word-wrap: break-word;">https://api.testmail.top/domain/check</code>
            <br>
            Method: <code>GET</code>
            <br>
            Example request: <code style="word-wrap: break-word;">https://api.testmail.top/domain/check/data=example@mail.com&ip=8.8.8.8</code>
            <br>
            Headers: <code>Authorization: Bearer XXXXXXXXXX.XXXXXXXXXX.XXXXXXXXXX</code>
          </p>
          <h3>Parameters of request</h3>
          <div class="table-wrapper">
            <table class="alt">
              <thead>
              <tr>
                <th>Parameter</th>
                <th>Description</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>data</td>
                <td>Domain or full Email address</td>
              </tr>
              <tr>
                <td>ip</td>
                <td>Optional parameter. The IP address of the client that sends the request to your resource is
                  required for a more detailed display of statistics
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <h3>Headers of request</h3>
          <div class="table-wrapper">
            <table class="alt">
              <thead>
              <tr>
                <th>Header</th>
                <th>Description</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Authorization</td>
                <td>Bearer authentication, your unique <a href="https://jwt.io/" target="_blank">JWT</a> token,
                  which is an API key, you can get by <a href="/signin">Registering</a> in your <a href="/project">Personal
                    Account</a></td>
              </tr>
              </tbody>
            </table>
          </div>

          <ul class="actions">
            <li><a href="/example" class="primary button">More details</a></li>
            <li><a href="/signin" class="button">Get API key</a></li>
          </ul>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'ApiComponent',
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>