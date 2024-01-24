<template>
  <div class="is-preload">
    <!-- Header -->
    <header-component :pageName=pageName :pagePath=pagePath />

    <!-- Error -->
    <error-component/>

    <!-- Wrapper -->
    <div id="wrapper" class="wrapper-generic">
      <router-view/>
    </div>

    <!-- Footer -->
    <footer-component class="footer"/>
  </div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ErrorComponent from "@/components/ErrorComponent.vue";

export default {
  name: "GenericPage",
  components: {
    ErrorComponent,
    HeaderComponent,
    FooterComponent
  },
  setup() {
    document.title = "Verifire";
  },
  props: {
    pageName: String,
    pagePath: String,
  },
}
</script>

<style lang="scss" scoped>
.is-preload {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.wrapper-generic {
  flex: 1 0 auto;
}

.footer {
  flex: 0 0 auto;
}
</style>