<template>
  <div class="is-preload">
    <!-- Sidebar -->
    <sidebar-component/>

    <!-- Wrapper -->
    <div id="wrapper">

      <!-- Project -->
      <project-component/>

      <!-- Swagger -->
      <!--      <swagger-component/>-->

      <!-- Fine-tuning -->
      <fine-tuning-component/>

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
// import SwaggerComponent from "@/components/SwaggerComponent.vue";

export default {
  components: {
    FineTuningComponent,
    // SwaggerComponent,
    ProjectComponent,
    FooterComponent,
    SidebarComponent,
    DonateComponent
  },
  setup() {
    document.title = "Testmail";

    return {}
  },
  methods: {
    setUser() {
      this.$store.dispatch('user/setUser');
    }
  },
  beforeMount() {
    this.setUser();
  }
}
</script>

<style lang="scss" scoped>

</style>