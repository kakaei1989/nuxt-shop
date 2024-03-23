export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('img', function (el, url) {
        let img = new Image();
        img.src = url.value

        img.onload = function () {
            el.src = img.src
            el.classList.add('fade-in-image')
        }
    })
})