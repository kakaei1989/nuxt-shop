<template>
    <Slider />

    <div>
        {{ counter.count }}
        <button @click="counter.increment(2)">Increment</button>
        <button @click="counter.decrement(1)">Decrement</button>
    </div>

    <Features />
    <ProductTabs />
    <AboutUs />
    <ContactUs />
</template>

<script setup>
import { useCounter } from "../store/counter";

const counter = useCounter();

</script>