<template>
    <section class="profile_section layout_padding">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-lg-3">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <NuxtLink to="/profile">اطلاعات کاربر</NuxtLink>
                        </li>
                        <li class="list-group-item">
                            <NuxtLink href="/profile/addresses">آدرس ها</NuxtLink>
                        </li>
                        <li class="list-group-item">
                            <NuxtLink to="/profile/orders">سفارشات</NuxtLink>
                        </li>
                        <li class="list-group-item">
                            <NuxtLink href="/profile/transactions">تراکنش ها</NuxtLink>
                        </li>
                        <li class="list-group-item">
                            <a @click="logout" href="#">خروج</a>
                        </li>
                    </ul>
                </div>

                <div class="col-sm-12 col-lg-9">
                    <slot />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useToast } from "vue-toastification";

const toast = useToast();
const { authUser } = useAuth();

async function logout() {
    await useFetch('/api/auth/logout', {
        method: 'POST'
    })
    authUser.value = null;
    toast.warning("از سیستم خارج شدید");
    return navigateTo('/')
}

</script>