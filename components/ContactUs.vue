<template>
  <section class="book_section layout_padding">
    <div class="container">
      <div class="heading_container">
        <h2>
          تماس با ما
        </h2>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form_container">
            <div v-if="errors.length > 0" class="alert alert-danger">
              <ul class="mb-0">
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </div>
            <form @submit.prevent="send">
              <div>
                <input type="text" v-model="formData.name" class="form-control"
                       placeholder="نام و نام خانوادگی" />
              </div>
              <div>
                <input type="email" v-model="formData.email" class="form-control" placeholder="ایمیل" />
              </div>
              <div>
                <input type="text" v-model="formData.subject" class="form-control"
                       placeholder="موضوع پیام" />
              </div>
              <div>
                                <textarea v-model="formData.text" rows="10" style="height: 100px" class="form-control"
                                          placeholder="متن پیام"></textarea>
              </div>
              <div class="btn_box">
                <button type="submit">
                  ارسال پیام
                  <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="map_container ">
            <div id="map" style="height: 345px;"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useToast } from "vue-toastification";

const errors = ref([]);
const loading = ref(false);
const toast = useToast();

const { $leaflet } = useNuxtApp();
const { public: { apiBase } } = useRuntimeConfig();
const formData = reactive({
  name: "",
  email: "",
  subject: "",
  text: "",
});

async function send() {
  if (formData.name === '' || formData.email === '' || formData.subject === '' || formData.text === '') {
    toast.error("تمام موارد فرم تماس با ما الزامی است.")
    return;
  }

  try {
    loading.value = true;
    errors.value = [];

    const data = await $fetch(`${apiBase}/contact-us`, {
      method: 'POST',
      body: formData
    })
    toast.success("پیام شما با موفقیت ثبت شد");
  } catch (error) {
    errors.value = Object.values(error.data.message).flat();
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  let map = $leaflet.map('map').setView([35.700105, 51.400394], 14);
  // let tiles = $leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  //     maxZoom: 18,
  //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
  //         'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //     id: 'mapbox/streets-v11',
  //     tileSize: 512,
  //     zoomOffset: -1
  // }).addTo(map);

  let tiles = $leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(map);

  let marker = $leaflet.marker([35.700105, 51.400394], {
    icon: $leaflet.icon({
      popupAnchor: [12, 6],
      iconUrl: 'images/map/marker-icon.png',
      shadowUrl: 'images/map/marker-shadow.png'
    })
  }).addTo(map)
      .bindPopup('<b>Hello world!</b><br />I am a popup').openPopup();
})


</script>