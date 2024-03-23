<template>
    <section class="auth_section book_section">
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4 offset-md-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="form_container">
                                <form @submit.prevent="login">
                                    <div class="mb-3">
                                        <label for="cellphone" class="form-label">شماره موبایل</label>
                                        <input v-model="cellphone" type="text" class="form-control" id="cellphone">
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-auth">ورود</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useToast } from "vue-toastification";

const cellphone = ref(null)
const toast = useToast()

function login() {
    if (cellphone.value == null) {
        toast.error("شماره موبایل الزامی است")
        return
    }

    const pattern = /^(\+98|0)?9\d{9}$/;
    if (!pattern.test(cellphone.value)) {
        toast.error("فرمت شماره موبایل معتبر نیست")
        return;
    }

    console.log(cellphone.value);

}

</script>