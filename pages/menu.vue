<template>
    <section class="food_section layout_padding">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-lg-3">
                    <div>
                        <label class="form-label">جستجو</label>
                        <div class="input-group mb-3">
                            <input type="text" v-model="search" class="form-control" placeholder="نام محصول ..."
                                aria-label="Recipient's username" aria-describedby="basic-addon2">
                            <button @click="search !== '' && handleFilter({ search: search })" class="input-group-text"
                                id="basic-addon2">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <hr>
                    <div class="filter-list">
                        <div class="form-label">
                            دسته بندی
                        </div>
                        <ul>
                            <li v-for="category in categories.data" :key="category.id"
                                @click="handleFilter({ category: category.id })" class="my-2 cursor-pointer">
                                {{ category.name }}
                            </li>
                        </ul>
                    </div>
                    <hr>
                    <div>
                        <label class="form-label">مرتب سازی</label>
                        <div class="form-check my-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label cursor-pointer" for="flexRadioDefault1">
                                بیشترین قیمت
                            </label>
                        </div>
                        <div class="form-check my-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                checked>
                            <label class="form-check-label cursor-pointer" for="flexRadioDefault2">
                                کمترین قیمت
                            </label>
                        </div>
                        <div class="form-check my-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"
                                checked>
                            <label class="form-check-label cursor-pointer" for="flexRadioDefault3">
                                پرفروش ترین
                            </label>
                        </div>
                        <div class="form-check my-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4"
                                checked>
                            <label class="form-check-label cursor-pointer" for="flexRadioDefault4">
                                با تخفیف
                            </label>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12 col-lg-9">
                    <div v-if="pending" class="d-flex justify-content-center align-items-center h-100">
                        <div class="spinner-border"></div>
                    </div>

                    <template v-else>
                        <div v-if="data.data.products.length == 0"
                            class="d-flex justify-content-center align-items-center h-100">
                            <h5>محصولی یافت نشده !</h5>
                        </div>

                        <div v-else>
                            <div class="row gx-3">
                                <div v-for="product in data.data.products" :key="product.id" class="col-sm-6 col-lg-4">
                                    <ProductCard :product="product" />
                                </div>
                            </div>

                            <nav class="d-flex justify-content-center mt-5">
                                <ul class="pagination">
                                    <li v-for="(link, index) in data.data.meta.links.slice(1, -1)" :key="index"
                                        class="page-item" :class="{ active: link.active }">
                                        <button @click="handleFilter({ page: link.label })" class="page-link">{{
                                            link.label
                                        }}</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

const router = useRouter();
const route = useRoute();
const search = ref('')
search.value=route.query.search
const query = ref({});
const { public: { apiBase } } = useRuntimeConfig();

const { data: categories } = await useFetch(`${apiBase}/categories`);

query.value = route.query;
const { data, refresh, pending } = await useFetch(() => `${apiBase}/menu`, {
    query: query
});

function handleFilter(param) {
    query.value = { ...route.query, ...param }

    router.push({
        path: '/menu',
        query: query.value
    })

    console.log(query.value);

    refresh()
}

</script>