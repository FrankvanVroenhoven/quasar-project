<template>
  <q-page class="flex">
    <!-- Hero Section -->
    <div class="hero q-gutter-md flex flex-column" style="margin-top: 0px; z-index: 1; height: 200px; background-color: #f5f5f5;">
      <h2>Products</h2>
      <q-input underlined v-model="search" label="Search" class="q-mb-md" dense style="width: auto;" :loading="loading">
        <template v-slot:append>
          <q-icon name="arrow_forward" />
        </template>
      </q-input>
    </div>

    <q-page-section class="q-gutter-md">
      <!-- Flexbox container for products -->
      <div class="products-grid">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="product-card"
        >
          <q-card>
            <q-card-section>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6">{{ product.name }}</q-item-label>
                  <q-item-label caption>{{ product.description }}</q-item-label>
                  <q-img 
                    :src="`http://localhost:80/storage/${product.image}`" 
                    :alt="product.name" 
                    class="q-mt-md"
                    width="100%" 
                    contain
                  />
                  <q-btn color="primary" label="View" @click="viewProduct(product)" class="q-mt-md full-width"/>
                  <q-btn 
                    color="primary" 
                    label="Add product to cart" 
                    :loading="loadingStates[product.id] || false" 
                    @click="addToCart(product)" 
                    class="q-mt-sm full-width"
                  />
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
import { eventBus } from 'src/boot/eventBus.js';

export default {
  data() {
    return {
      search: '',
      products: [],
      loadingStates: {}, // Tracks loading state for each product
      searchTimeout: null,
      loading: false,
    };
  },
  watch: {
    search(newSearch) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      this.loading = true;  // Set loading true when search is initiated

      this.searchTimeout = setTimeout(() => {
        if (newSearch.length > 2) {
          // Perform search and handle loading state
          this.searchProducts(newSearch).then(() => {
            this.loading = false;  // Set loading false after search is complete
          });
        } else if (newSearch === '') {
          // If search is cleared, load all products and handle loading state
          this.getProducts().then(() => {
            this.loading = false;  // Set loading false after products are loaded
          });
        }
      }, 300);
    },
  },
  mounted() {
    this.getProducts();

    eventBus.on("product-added", () => {
      this.getProducts(); // Refresh product list when an item is added
    });
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
      this.loadingStates[product.id] = true; // Set loading for this product

      axios.post('/addToCart', {
        product: product,
        quantity: 1
      })
        .then(() => {
          this.loadingStates[product.id] = false; // Remove loading
        })
        .catch(error => {
          console.error(error);
          this.loadingStates[product.id] = false;
        });
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

.q-page-section {
  padding: 16px;
}

/* Flex container for products */
.products-grid {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to next row */
  justify-content: center; /* Center items horizontally */
  gap: 16px; /* Space between items */
}

.product-card {
  min-width: 250px;
  width: 100%; /* Make sure cards are responsive */
  max-width: 250px; /* Optional: limit max width of the cards */
}

.q-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1); 
}

.q-img {
  border-radius: 8px;
  object-fit: cover;
}

.q-btn {
  border: 0.2px solid grey;
}
</style>
