<template>
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
        aria-expanded="false" aria-controls="collapseExample">
        ایجاد آدرس جدید
    </button>
    <div class="collapse mt-3" id="collapseExample">
        <FormKit type="form" id="createAddress" @submit="create" #default="{ value }" :incomplete-message="false" :actions="false">
            <div class="card card-body">
                <div v-if="errors.length > 0" class="alert alert-danger">
                    <ul class="mb-0">
                        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>
                </div>

                <div class="row g-4">
                    <div class="col col-md-6">
                        <FormKit type="text" name="title" id="title" label="عنوان" label-class="form-label"
                            input-class="form-control" validation="required"
                            :validation-messages="{ required: 'فیلد عنوان الزامیست' }"
                            messages-class="form-text text-danger" />
                    </div>
                    <div class="col col-md-6">
                        <FormKit type="text" name="cellphone" id="cellphone" label="شماره تماس" label-class="form-label"
                            input-class="form-control" :validation="[['required'], ['matches', /^(\+98|0)?9\d{9}$/]]"
                            :validation-messages="{ required: 'فیلد شماره تماس الزامیست', 'matches': 'فیلد شماره تماس معتبر نمیباشد' }"
                            messages-class="form-text text-danger" />
                    </div>
                    <div class="col col-md-6">
                        <FormKit type="text" name="postal_code" id="postal_code" label="کد پستی"
                            label-class="form-label" input-class="form-control"
                            :validation="[['required'], ['matches', /^\d{5}[ -]?\d{5}$/i]]"
                            :validation-messages="{ required: 'فیلد کدپستی الزامیست', 'matches': 'فیلد کدپستی معتبر نمیباشد' }"
                            messages-class="form-text text-danger" />
                    </div>
                    <div class="col col-md-6">
                        <FormKit type="select" name="province_id" id="province_id" label="استان"
                            @change="changeProvince" label-class="form-label" input-class="form-select"
                            validation="required" :validation-messages="{ required: 'فیلد استان الزامیست' }"
                            messages-class="form-text text-danger">
                            <option v-for="province in props.provinces" :key="province.id" :value="province.id">
                                {{ province.name }}
                            </option>
                        </FormKit>
                    </div>
                    <div class="col col-md-6">
                        <FormKit type="select" ref="cityEl" name="city_id" id="city_id" label="شهر"
                            label-class="form-label" input-class="form-select" validation="required"
                            :validation-messages="{ required: 'فیلد شهر الزامیست' }"
                            messages-class="form-text text-danger">
                            <option v-for="city in props.cities.filter((item) => item.province_id == value.province_id)"
                                :key="city.id" :value="city.id">
                                {{ city.name }}
                            </option>
                        </FormKit>
                    </div>

                    <div class="col col-md-12">
                        <FormKit type="textarea" rows="5" name="address" id="address" label="آدرس"
                            label-class="form-label" input-class="form-control" validation="required"
                            :validation-messages="{ required: 'فیلد آدرس الزامیست' }"
                            messages-class="form-text text-danger" />
                    </div>
                </div>
                <div>
                    <FormKit type="submit" input-class="btn btn-primary mt-4">
                        ایجاد
                        <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                    </FormKit>
                </div>
            </div>
        </FormKit>
    </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { reset } from "@formkit/core"

const props = defineProps(['provinces', 'cities'])
const cityEl = ref(null);
const errors = ref([]);
const loading = ref(false);
const toast = useToast();

function changeProvince(el) {
    cityEl.value.node.input(props.cities.find((item) => item.province_id == el.target.value).id)
}

async function create(formData) {
    console.log(formData);

    try {
        loading.value = true;
        errors.value = [];

        await $fetch('/api/profile/addresses/create', {
            method: 'POST',
            body: formData
        })

        reset('createAddress')
        toast.success("ایجاد آدرس باموفقیت انجام شد");
    } catch (error) {
        errors.value = Object.values(error.data.data.message).flat();
    } finally {
        loading.value = false;
    }
}

</script>