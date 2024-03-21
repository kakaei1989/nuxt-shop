<template>
<Slider/>
<Features/>
<ProductTabs/>
  <AboutUs/>
</template>

<script>
import Features from "../components/Features.vue";
import ProductsTab from "../components/ProductsTab.vue";
import AboutUs from "../components/AboutUs.vue";

export default {
  name: "index",
  components: {AboutUs, ProductsTab, Features},
}
</script>

<style scoped>

</style>