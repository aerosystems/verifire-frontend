<template>
  <!-- Wrapper -->
  <div id="wrapper">

    <!-- Main -->
    <section id="main" class="wrapper">
      <div class="inner">
        <h1 class="major">How to protect your site from temporary mails using <a href="https://api.testmail.top"
                                                                                 target="_blank">api.testmail.top</a>?
        </h1>
        <span class="image fit"><img src="../assets/images/example.png"
                                     alt="How to protect web site fro disposable mail services"/></span>
        <p>So, below there will be a boring description of the API, while you have enthusiasm, remember the main thing:
          the main response parameter is <code>"result":</code>, if this parameter is <code>true</code> - feel free to
          skip this EMAIL for registration, if <code>false</code>, then take your time - tell the user "Register with
          temporary mails are prohibited<s> by resource policy</s>".</p>
        <p>Also, you have a trump card up your sleeve - this is the <code>"error":</code>, parameter: if everything goes
          well, then it is always <code>0</code>, if the user makes mistakes, then this parameter takes <a
              href="https://testmail.top/example#errors">numerical values</a>, you can, if you wish, set him on the
          right path, prompting him to check the correctness of the EMAIL input</p>
      </div>
    </section>

    <!-- API -->
    <section id="api" class="wrapper style2 spotlights">
      <div class="inner">
        <h2>API: Check Domain/Email mailbox address</h2>
        <p>
          URL: <code style="word-wrap: break-word;">https://api.testmail.top/domain/check</code>
          <br>
          Method: <code>GET</code>
          <br>
          Example request: <code style="word-wrap: break-word;">https://api.testmail.top/domain/check/data=example@mail.com&ip=8.8.8.8</code>
          <br>
          Headers: <code style="word-wrap: break-word;">Authorization: Bearer XXXXXXXXXX.XXXXXXXXXX.XXXXXXXXXX</code>
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
              <td>Optional parameter. The IP address of the client that sends the request to your resource is required
                for a more detailed display of statistics
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
              <td>Bearer authentication, your unique <a href="https://jwt.io/" target="_blank">JWT</a> token, which is
                an API key, you can get by <a href="/signin">Registering</a> in your <a href="/project">Personal
                  Account</a></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- API - End -->

    <!-- Practice  -->

    <section id="letspractice" class="wrapper style2 spotlights">
      <div class="inner">
        <h2>Let's get down to practice</h2>
        <p>Let's look at the requests to <a href="https://api.testmail.top" target="_blank">api.testmail.top</a> by
          examples. To try to send from a request to check a deliberately false domain/email, taken from one of the most
          popular temporary mail services <a href="https://temp-mail.org/" target="_blank">temp-mail.org</a>, from the
          console</p>
        <h4>cURL request:</h4>
        <pre>
					<code>curl --location --request GET 'https://api.testmail.top/domain/check?data=fovah86335@990ys.com&ip=154.115.9.195' \<br>
--header 'Authorization: Bearer XXXXXXXXXX.XXXXXXXXXX.XXXXXXXXXX'
					</code>
				</pre>
        <h4>cURL response:</h4>
        <pre>
					<code>{
    "error": 0,
    "result": false,
    "message": "This domain is in Blacklist"
}
					</code>
				</pre>
        <p>The response received <code>"result": false</code> - which means that this user CANNOT be allowed to register
        </p>
        <hr>
        <p>Now, let's try to send a request for domain/email verification using PHP. As in the previous example, there
          is nothing difficult, now, for example, let's send 100% <a href="https://gmail.com" target="_blank">GMAIL</a>trust
          mail. On my own I recommend setting the CURLOPT_TIMEOUT parameter to 3 seconds, although a regular request
          takes a split second - this will protect your registration from crashing if the <a
              href="https://api.testmail.top" target="_blank">api.testmail.top</a> server is unavailable</p>
        <h4>PHP - cURL request:</h4>
        <pre>
					<code>&lt;&#63;php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.testmail.top/domain/check?data=typicaluser@gmail.com&ip=154.115.9.195',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 3,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer XXXXXXXXXX.XXXXXXXXXX.XXXXXXXXXX'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
					</code>
				</pre>
        <h4>PHP - cURL response:</h4>
        <pre>
					<code>{
    "error": 0,
    "result": true,
    "message": "This domain is in Whitelist"
}
					</code>
				</pre>
        <p>In response, we received <code>"result": true</code> - this means that this user MAY be allowed to register
        </p>
      </div>
    </section>

    <!-- Practice - END -->

    <!-- Exceptions  -->
    <section id="exceptions" class="wrapper style2 spotlights">
      <div class="inner">
        <h2>Great, now let's dive a little deeper into the capabilities of <a href="https://api.testmail.top">api.testmail.top</a>,
          consider a few exceptions:</h2>

        <p>In the two previous examples, we looked at typical mails that represent BLACKLIST (temporary mails contained
          in our database) and WHITELIST (such as <a href="https://gmail.com" target="_blank">GMAIL</a>, <a
              href="https://yahoo.com" target="_blank">YAHOO</a> or <a href="https://outlook.live.com"
                                                                       target="_blank">OUTLOOK</a> for example ...). But
          what to do in a non-standard situation?</p>
        <ol>
          <li>
            <h4>The mail domain has the "UNKNOWN" status so far</h4>
            <p>The user sends mail of his personal <s>or corporate</s> domain, for example <code>admin@gmail.com</code>,
              in this case the answer will be as follows:</p>
            <pre>
								<code>{
"error": 0,
"result": true,
"unknown": true,
"message": "Unknown domain. We will classify this domain shortly"
}
								</code>
							</pre>
            <p>In response, we received <code>"result": true</code> - which means that this user MAY be allowed to
              register, since we do not yet know exactly what kind of domain it is, and we cannot "scatter" our clients.
              After that, the domain will be sent for verification, it must be defined, so that when you repeat the
              request, you can already answer exactly whether it belongs to any of the lists.</p>
          </li>
          <li>
            <h4>User made a (syntactic) error while entering mail in the registration form</h4>
            <p>For example <code>admin@;gmail.com</code>, in this case the answer will be as follows:</p>
            <pre>
								<code>{
    "error": 31,
    "result": false,
    "message": "Invalid email address"
}
								</code>
							</pre>
            <p>In response, we received <code>"result": false</code>- which means that this user CANNOT be allowed to
              register. In this case, you need to handle the error <code>"error": 31</code> - which will prompt your
              user to check the correctness of the email address entered by him</p>
          </li>
          <li>
            <h4>Or is his mail domain not capable of receiving mail at all?</h4>
            <p>For example <code>admin@gmail1.com</code>, in this case the answer will be as follows:</p>
            <pre>
								<code>{
    "error": 36,
    "result": false,
    "message": "No mail server is attached to this domain"
}
								</code>
							</pre>
            <p>In response, we received <code>"result": false</code>- which means that this user CANNOT be allowed to
              register. In this case, you need to handle the error <code>"error": 36</code> - which will prompt your
              user to check the correctness of the email address entered by him</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Exceptions - END  -->

    <!-- Errors  -->
    <section id="errors" class="wrapper style2 spotlights">
      <div class="inner">
        <h2>In any incomprehensible situation, just tell the user to check the correct spelling of EMAIL</h2>
        <p>This is necessary so that there is no false expectation on the part of the user of the final stage of
          registration - confirmation of mail</p>

        <div class="table-wrapper">
          <table class="alt">
            <thead>
            <tr>
              <th>Error code<br><code>"error":</code></th>
              <th>Description<br><code>"message":</code></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>31</td>
              <td>"Invalid email address" - syntax error in writing mailbox address</td>
            </tr>
            <tr>
              <td>33</td>
              <td>"Invalid domain" - syntax error in writing mailbox address</td>
            </tr>
            <tr>
              <td>34</td>
              <td>"Typo! This domain 1 level does not exist" - no such domain exists</td>
            </tr>
            <tr>
              <td>36</td>
              <td>"No mail server is attached to this domain" - mailbox domain is unable to receive emails</td>
            </tr>
            <tr>
              <td>37</td>
              <td>"Incoming data is too long" - too long string</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <!-- Errors - END -->

  </div>
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>