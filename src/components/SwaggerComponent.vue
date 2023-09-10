<template>
  <div class="swagger" id="swagger"></div>
</template>

<script>
import swaggerui from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

export default {
  name: "SwaggerComponent",
  mounted() {
    const spec = require('@/assets/swagger/swagger.json');
    swaggerui({
      spec: spec,
      dom_id: '#swagger'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>