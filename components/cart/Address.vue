<template>
    <template v-if="addresses?.length != 0">
        <div>
            انتخاب آدرس
        </div>
        <select @change="(el) => emit('setAddressId', el.target.value)" style="width: 200px;" class="form-select ms-3"
            aria-label="Default select example">
            <option value=""> انتخاب آدرس </option>
            <option v-for="address in addresses" :key="address.id" :value="address.id"> {{ address.title }} </option>
        </select>
    </template>
    <NuxtLink v-else to="/profile/addresses" class="btn btn-primary">
        ایجاد آدرس
    </NuxtLink>
</template>

<script setup>

const emit = defineEmits(['setAddressId']);

const { data: addresses } = await useFetch('/api/cart/addresses');
</script>