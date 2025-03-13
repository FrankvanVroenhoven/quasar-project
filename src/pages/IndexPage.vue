<template>
  <q-page class="flex flex-center">
    <!-- Hero Section -->
    <div class="hero q-gutter-md flex flex-column">
      <h2>Products</h2>
      <q-input
        underlined
        v-model="search"
        label="Search"
        class="q-mb-md"
        dense
        style="width: auto;"
      >
        <template v-slot:append>
          <q-icon name="arrow_forward" />
        </template>
      </q-input>
    </div>

    <!-- Products List -->
    <q-page-section class="q-gutter-md">
      <div class="row q-col-gutter-md">
        <div v-for="product in products" :key="product.id" class="">
          <q-card class="q-mb-md shadow-3">
            <q-card-section>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6">{{ product.name }}</q-item-label>
                  <q-item-label caption>{{ product.description }}</q-item-label>
                  <!-- Product Image -->
                  <q-img
                    :src="`http://localhost:80/storage/${product.image}`"
                    :alt="product.name"
                    class="q-mt-md"
                    width="200px"
                    contain
                    style="margin: 0 auto;"
                  />
                  <q-btn color="primary" label="View" @click="viewProduct(product)" />
                  <q-btn color="primary" label="Add product to cart" @click="addToCart(product)" />

                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page-section>
  </q-page>
</template>

<script>
import axios from 'axios';
import AddProduct from 'src/components/AddProduct.vue';
export default {
  data() {
    return {
      search: '',
      products: [],
      searchTimeout: null,

    };
  },
  watch: {
  search(newSearch) {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      if (newSearch.length > 2) {
        this.searchProducts(newSearch);
      } else if (newSearch === '') {
        this.getProducts();
      }
    }, 300); // Delay of 300ms
  },
},
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() { 
      axios.get('/products').then((response) => {
        this.products = response.data;
      });
    },
    viewProduct(product) {
      this.$router.push({ name: 'ProductPage', params: { id: product.id } });
    },
    addToCart(product) {
      axios.post('/addToCart', product);
    },
    async searchProducts(query) {
    try {
      const response = await axios.get('/search', { params: { query } });
      this.products = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  },
};
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #f5f5f5;
  color: #333;
  width: 100%;
}

.hero h2 {
  margin-bottom: 16px;
  font-size: 2rem;
}

.q-input {
  width: 100%;
}

.q-page-section {
  padding: 16px;
}

.q-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.q-item {
  display: flex;
  align-items: center;
}

.q-item-section {
  flex-grow: 1;
}

.q-img {
  border-radius: 8px;
  object-fit: cover;
}

.q-btn {
  width: 100%;
  border: 0.2px solid grey;
}
</style>
