<template>
  <!-- food section -->
  <section class="food_section layout_padding-bottom">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>
          منوی محصولات
        </h2>
      </div>
      <Tabs v-if="!!products&&products.data"  nav-class="filters_menu"
             nav-item-active-class="active"
             :options="{disableScrollBehavior: true}">
        <Tab
             v-for="(tabList,index) in products.data.tabList" :key="index" :name="tabList"
             ></Tab>
      </Tabs>
      <ul class="filters_menu">
        <li class="active">برگر</li>
        <li>پیتزا</li>
        <li>پیش غذا و سالاد</li>
      </ul>

      <div class="filters_content">
        <div class="row grid">
          <div class="col-sm-6 col-lg-4">
            <div class="box">
              <div>
                <div class="img-box">
                  <img src="/images/b1.jpg" alt="">
                </div>
                <div class="detail-box">
                  <h5>
                    لورم ایپسوم متن
                  </h5>
                  <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                    گرافیک است.
                  </p>
                  <div class="options">
                    <h6>
                      <del>45,000</del>
                      34,000
                      <span>تومان</span>
                    </h6>
                    <a href="">
                      <i class="bi bi-cart-fill text-white fs-5"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <a href="">
          مشاهده بیشتر
        </a>
      </div>
    </div>
  </section>
  <!-- end food section -->
</template>

<script setup>
import {Tab, Tabs} from 'vue3-tabs-component'
import {ref} from "vue";

const {public: {apiBase}} = useRuntimeConfig();
const products = ref([])
products.value = await $fetch(`${apiBase}/products/products-tabs`)
</script>