<template>
<Slider/>
<Features/>
<ProductTabs/>
  <AboutUs/>
  <ContactUs/>
</template>

<script>
import Features from "../components/Features.vue";
import ProductsTab from "../components/ProductsTab.vue";
import AboutUs from "../components/AboutUs.vue";
import ContactUs from "../components/ContactUs.vue";

export default {
  name: "index",
  components: {ContactUs, AboutUs, ProductsTab, Features},
}
</script>

<style scoped>

</style>