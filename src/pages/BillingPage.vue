<template>
  <div class="is-preload">
    <!-- Sidebar -->
    <sidebar-component/>

    <!-- Wrapper -->
    <div id="wrapper">
      <!-- Error -->
      <error-component/>

      <!-- Subscription -->
      <subscription-component/>

      <!-- Project -->
      <project-component/>

      <!-- Swagger -->
      <!--      <swagger-component/>-->

      <!-- Statistics -->
      <statistics-component/>

      <!-- Fine-tuning -->
      <fine-tuning-component/>

      <!-- Inspect -->
      <inspect-billing-component/>

      <!-- Donate -->
      <donate-component/>
    </div>

    <!-- Footer -->
    <footer-component/>

  </div>

</template>

<script>
import DonateComponent from "@/components/DonateComponent.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import ProjectComponent from "@/components/ProjectComponent.vue";
import FineTuningComponent from "@/components/FineTuningComponent.vue";
import InspectBillingComponent from "@/components/InspectBillingComponent.vue";
import StatisticsComponent from "@/components/StatisticsComponent.vue";
import SubscriptionComponent from "@/components/SubscriptionComponent.vue";
import ErrorComponent from "@/components/ErrorComponent.vue";
// import SwaggerComponent from "@/components/SwaggerComponent.vue";

export default {
  components: {
    InspectBillingComponent,
    SubscriptionComponent,
    StatisticsComponent,
    FineTuningComponent,
    // SwaggerComponent,
    ProjectComponent,
    FooterComponent,
    SidebarComponent,
    DonateComponent,
    ErrorComponent
  },
  setup() {
    document.title = "Verifire";

    return {}
  },
}
</script>

<style lang="scss" scoped>

</style>