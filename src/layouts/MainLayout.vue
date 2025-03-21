<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: white; color: black;">
      <q-toolbar>
        <q-btn flat dense round icon="menu" class="q-mr-sm" @click="drawer = !drawer" />

        <q-space />

        <!-- Desktop Navigation -->
        <div class="links-container q-gutter-sm q-mr-md" v-if="!isMobile">
          <q-btn
            v-for="link in linksList"
            :key="link.title"
            flat
            dense
            :class="{ active: isActive(link) }"
            @click="handleClick(link)"
          >
            {{ link.title }}
          </q-btn>
        </div>

        <q-space />
        
  <!-- Cart Icon -->
  <q-btn
    flat
    dense
    icon="shopping_cart"
    @click="openCartModal"
    class="q-ml-sm"
  />
      </q-toolbar>
    </q-header>

    <!-- Mobile Sidebar -->
    <q-drawer v-model="drawer" side="left" bordered>
      <q-list>
        <q-item v-for="link in linksList" :key="link.title" clickable @click="handleClick(link)">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>{{ link.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <AddProduct v-model="dialogVisible" />
    <Cart v-model="cartModalVisible" />
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import AddProduct from "../components/AddProduct.vue";
import Cart from "src/pages/Cart.vue";
defineOptions({ name: "MainLayout" });

const cartModalVisible = ref(false); 

function openCartModal() {
  cartModalVisible.value = true; // Open the cart modal
} 


const $q = useQuasar();
const dialogVisible = ref(false);
const drawer = ref(false);

const linksList = [
  { title: "Products", icon: "shopping_cart", hname: "products" },
  { title: "Store finder", icon: "store", hname: "store-finder" },
  { title: "About", icon: "info" },
  { title: "Contact", icon: "phone" },
  { title: "Downloads", icon: "cloud_download" },
  { title: "Add Product", icon: "add", action: "openModal" },
];

const route = useRoute();
const isMobile = computed(() => $q.screen.lt.md); // Hide text buttons on small screens

function isActive(link) {
  return route.path === link.hname;
}

function handleClick(link) {
  if (link.action === "openModal") {
    dialogVisible.value = true;
  }
  drawer.value = false; // Close drawer on mobile when clicking a link
}
</script>

<style scoped>
.links-container {
  display: flex;
  justify-content: center;
}

.links-container .q-btn {
  margin: 0 10px;
  border-radius: 10px;
  padding: 10px;
}
</style>
