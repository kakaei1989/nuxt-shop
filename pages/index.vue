<template>
<Slider/>
<Features/>
<ProductsTab/>
</template>

<script>
import Features from "../components/Features.vue";
import ProductsTab from "../components/ProductsTab.vue";

export default {
  name: "index",
  components: {ProductsTab, Features},
}
</script>

<style scoped>

</style>