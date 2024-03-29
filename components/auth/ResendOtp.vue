<template>
    <ClientOnly>
        <div class="d-flex align-items-center">
            <div v-if="!showResendOtp" class="mt-3 me-3" style="direction: ltr;">
                <vue-countdown :time="6 * 1000" v-slot="{ minutes, seconds }" @end="onCountdownEnd"
                    :transform="transformSlotProps">
                    {{ minutes }} : {{ seconds }}
                </vue-countdown>
            </div>

            <button v-else class="btn btn-dark">
                ارسال دوباره
            </button>
        </div>
    </ClientOnly>
</template>

<script setup>
import VueCountdown from '@chenfengyuan/vue-countdown';

const showResendOtp = ref(false);

function onCountdownEnd() {
    showResendOtp.value = true;
}

function transformSlotProps(props) {
    const formattedProps = {};

    Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
    });

    return formattedProps;
}
</script>