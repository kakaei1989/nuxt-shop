<template>
    <div class="card-body">
        <div v-if="errors.length > 0" class="alert alert-danger">
            <ul class="mb-0">
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </div>
        <div class="form_container">
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="cellphone" class="form-label">شماره موبایل</label>
                    <input v-model="cellphone" type="text" class="form-control" id="cellphone">
                </div>
                <button type="submit" class="btn btn-primary btn-auth">
                    ورود
                    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const emit = defineEmits(['showCheckOtpForm'])

const cellphone = ref(null)
const toast = useToast()
const errors = ref([]);
const loading = ref(false);

async function login() {
    if (cellphone.value == null) {
        toast.error("شماره موبایل الزامی است")
        return
    }

    const pattern = /^(\+98|0)?9\d{9}$/;
    if (!pattern.test(cellphone.value)) {
        toast.error("فرمت شماره موبایل معتبر نیست")
        return;
    }

    try {
        loading.value = true;
        errors.value = [];

        const data = await $fetch('/api/auth/login', {
            method: 'POST',
            body: { cellphone: cellphone.value }
        })

        toast.success("کد ورود برای شما ارسال شد");
        emit('showCheckOtpForm')
    } catch (error) {
        errors.value = Object.values(error.data.data.message).flat();
    } finally {
        loading.value = false;
    }

}
</script>