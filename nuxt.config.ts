// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                dir: 'rtl',
                lang: 'fa'
            }
        }
    },
    runtimeConfig: {
        public: {
            apiBase: 'http://localhost:8000/api'
        }
    },
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    modules : ["@formkit/nuxt", '@pinia/nuxt','@pinia-plugin-persistedstate/nuxt'],
    build: {
        transpile: ['vue-toastification'],
    }
})