import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import {defineNuxtPlugin} from "nuxt/app";

export default defineNuxtPlugin(nuxtApp => {
    return nuxtApp.provide('bootstrap', bootstrap)
})