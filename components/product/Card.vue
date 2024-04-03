<template>
    <div class="box">
        <div>
            <div class="img-box">
                <img src="/images/preloader.png" v-img="props.product.primary_image" alt="">
            </div>
            <div class="detail-box">
                <h5>
                    <NuxtLink :to="`/products/${props.product.slug}`">{{ props.product.name }}</NuxtLink>
                </h5>
                <p>
                    {{ props.product.description }}
                </p>
                <div class="options">
                    <h6 v-if="props.product.is_sale">
                        <del>{{ numberFormat(props.product.price) }}</del>
                        {{ numberFormat(props.product.sale_price) }}
                        <span>تومان</span>
                    </h6>
                    <h6 v-else>
                        {{ numberFormat(props.product.price) }}
                        <span>تومان</span>
                    </h6>

                    <button @click="addToCart(props.product)">
                        <i class="bi bi-cart-fill text-white fs-5"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from "../../store/cart"

const props = defineProps(['product']);
const cart = useCartStore();

function addToCart(product) {
    cart.remove(product.id);
    cart.addToCart(product, 1);
}

</script>