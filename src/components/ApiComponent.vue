<template>
  <section id="api" class="wrapper style5 spotlights">
    <section>
      <div class="content" id="api-check">
        <div class="inner">
          <h2>API: Check Domain/Email mailbox address</h2>
          <p>
            Endpoint: <code style="word-wrap: break-word;">https://api.verifire.dev/v1/data/inspect</code>
            <br>
            Method: <code>POST</code>
            <br>
            Headers: <code>X-Api-Key: XXXXXXXXXX</code>
            <br>
            Parameter content type: <code>application/json</code>
            <br>
            Example JSON request body:
            <code style="word-wrap: break-word;">
              {"data": "example@mail.com", "clientIp": "8.8.8.8"}
            </code>
          </p>
          <h3>Parameters of request(body)</h3>
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
                <td>clientIp</td>
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
                <td>X-Api-Key</td>
                <td>API key. You can get after <a href="/signin">Registering</a> and login in your <a href="/billing">Personal
                    Account</a></td>
              </tr>
              </tbody>
            </table>
          </div>

          <ul class="actions">
            <li><a href="/usage" class="primary button">More details</a></li>
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