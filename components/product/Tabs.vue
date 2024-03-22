<template>
    <section class="food_section layout_padding-bottom">
        <div class="container">
            <div class="heading_container heading_center">
                <h2>
                    منو محصولات
                </h2>
            </div>

            <Tabs nav-class="filters_menu" nav-item-active-class="active" :options="{ disableScrollBehavior: true }">
                <Tab v-for="(tabList, index) in products.data.tabList" :key="index" :name="tabList">
                    <div class="filters_content">
                        <div class="row grid">
                            <div v-for="product in products.data.tabPanel[index]" :key="product.id"
                                class="col-sm-6 col-lg-4">
                                <ProductCard :product="product" />
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs>

            <div class="btn-box">
                <a href="">
                    مشاهده بیشتر
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>
import {Tab, Tabs} from 'vue3-tabs-component'
import {ref} from "vue";

const {public: {apiBase}} = useRuntimeConfig();
// const products = ref([])
// products.value = await $fetch(`${apiBase}/products/products-tabs`)

const { data: products } = await useFetch(`${apiBase}/products/products-tabs`);
// console.log("products",products.value)
</script>