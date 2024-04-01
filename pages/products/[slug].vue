<template>
    <h1>Single Page Product</h1>
</template>

<script setup>
const route = useRoute();
const { public: { apiBase } } = useRuntimeConfig();

const { data: product } = await useFetch(`${apiBase}/products/${route.params.slug}`);
console.log(product.value);
</script>