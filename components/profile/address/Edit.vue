<template>
    <FormKit type="form" @submit="edit" #default="{ value }" :incomplete-message="false" :actions="false">
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
                        messages-class="form-text text-danger" :value="props.address.title" />
                </div>
                <div class="col col-md-6">
                    <FormKit type="text" name="cellphone" id="cellphone" label="شماره تماس" label-class="form-label"
                        input-class="form-control" :validation="[['required'], ['matches', /^(\+98|0)?9\d{9}$/]]"
                        :validation-messages="{ required: 'فیلد شماره تماس الزامیست', 'matches': 'فیلد شماره تماس معتبر نمیباشد' }"
                        messages-class="form-text text-danger" :value="props.address.cellphone" />
                </div>
                <div class="col col-md-6">
                    <FormKit type="text" name="postal_code" id="postal_code" label="کد پستی" label-class="form-label"
                        input-class="form-control" :validation="[['required'], ['matches', /^\d{5}[ -]?\d{5}$/i]]"
                        :validation-messages="{ required: 'فیلد کدپستی الزامیست', 'matches': 'فیلد کدپستی معتبر نمیباشد' }"
                        messages-class="form-text text-danger" :value="props.address.postal_code" />
                </div>

                <ClientOnly fallback-tag="span" fallback="در حال بارگذاری ...">
                    <div class="col col-md-6">
                        <FormKit type="select" name="province_id" id="province_id" label="استان"
                            @change="changeProvince" label-class="form-label" input-class="form-select"
                            validation="required" :validation-messages="{ required: 'فیلد استان الزامیست' }"
                            messages-class="form-text text-danger" :value="props.address.province_id">
                            <option v-for="province in props.provinces" :key="province.id" :value="province.id">
                                {{ province.name }}
                            </option>
                        </FormKit>
                    </div>
                    <div class="col col-md-6">
                        <FormKit type="select" ref="cityEl" name="city_id" id="city_id" label="شهر"
                            label-class="form-label" input-class="form-select" validation="required"
                            :validation-messages="{ required: 'فیلد شهر الزامیست' }"
                            messages-class="form-text text-danger" :value="props.address.city_id">
                            <option v-for="city in props.cities.filter((item) => item.province_id == value.province_id)"
                                :key="city.id" :value="city.id">
                                {{ city.name }}
                            </option>
                        </FormKit>
                    </div>
                </ClientOnly>

                <div class="col col-md-12">
                    <FormKit type="textarea" rows="5" name="address" id="address" label="آدرس" label-class="form-label"
                        input-class="form-control" validation="required"
                        :validation-messages="{ required: 'فیلد آدرس الزامیست' }" messages-class="form-text text-danger"
                        :value="props.address.address" />
                </div>
            </div>
            <div class="d-flex justify-content-between mt-4">
                <FormKit type="submit" input-class="btn btn-primary">
                    ویرایش
                    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                </FormKit>
                <ProfileAddressDelete :addressId="props.address.id" />
            </div>
        </div>
    </FormKit>
    <hr />
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(['address', 'provinces', 'cities'])
const cityEl = ref(null);
const errors = ref([]);
const loading = ref(false);
const toast = useToast();

function changeProvince(el) {
    cityEl.value.node.input(props.cities.find((item) => item.province_id == el.target.value).id)
}

async function edit(formData) {
    console.log(formData);

    try {
        loading.value = true;
        errors.value = [];

        await $fetch('/api/profile/addresses/edit', {
            method: 'POST',
            body: { ...formData, address_id: props.address.id }
        })

        toast.success("ویرایش آدرس باموفقیت انجام شد");
    } catch (error) {
        errors.value = Object.values(error.data.data.message).flat();
    } finally {
        loading.value = false;
    }
}
</script>