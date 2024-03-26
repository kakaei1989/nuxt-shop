<template>
    <section class="auth_section book_section">
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4 offset-md-4">
                    <div class="card">
                        <AuthCheckOtp v-if="showOtpForm" />
                        <AuthLogin v-else @show-check-otp-form="() => showOtpForm = true" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
definePageMeta({
    middleware: 'guest'
})

const showOtpForm = ref(false);

</script>