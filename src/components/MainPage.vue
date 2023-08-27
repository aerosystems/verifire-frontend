<template>
  <div class="is-preload">
    <!-- Sidebar -->
    <sidebar-component/>

    <!-- Wrapper -->
    <div id="wrapper">

      <!-- Check -->
      <search-component/>

      <!-- Add domain to BLACKLIST -->
      <blacklist-component/>

      <!-- Add domain to WHITELIST -->
      <whitelist-component/>

      <!-- API -->
      <api-component/>

      <!-- What we do -->
      <about-component/>

      <!-- Donate -->
      <donate-component/>

      <!-- Get in touch -->
      <feedback-component/>
    </div>

    <!-- Footer -->
    <footer-component/>

  </div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import FeedbackComponent from "@/components/FeedbackComponent.vue";
import DonateComponent from "@/components/DonateComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";
import ApiComponent from "@/components/ApiComponent.vue";
import WhitelistComponent from "@/components/WhitelistComponent.vue";
import BlacklistComponent from "@/components/BlacklistComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";

export default {
  name: "MainPage",
  components: {
    SidebarComponent,
    SearchComponent,
    BlacklistComponent,
    WhitelistComponent, ApiComponent, AboutComponent, DonateComponent, FeedbackComponent, FooterComponent
  },
  setup() {

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>