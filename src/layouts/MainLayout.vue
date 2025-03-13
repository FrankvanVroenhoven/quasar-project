<template>
  <q-layout view="lHh Lpr lFf">
    <nav>
      <q-toolbar>
        <q-space />
        <div class="links-container">
          <q-btn v-for="link in linksList" :key="link.title" flat round dense :aria-label="link.title"
            :class="{ active: isActive(link) }" @click="handleClick(link)">
            {{ link.title }}
          </q-btn>
        </div>
        <q-space />
      </q-toolbar>
    </nav>
    <q-header elevated></q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <AddProduct v-model="dialogVisible" @product-added="getProducts" />
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import AddProduct from "../components/AddProduct.vue";

defineOptions({ name: "MainLayout" });

const dialogVisible = ref(false);

const linksList = [
  { title: "Products", caption: "Products page", icon: "products", hname: "products" },
  { title: "Store finder", caption: "Find stores", icon: "shop", hname: "store-finder" },
  { title: "About", caption: "chat.quasar.dev", icon: "chat" },
  { title: "Contact", caption: "forum.quasar.dev", icon: "record_voice_over" },
  { title: "Downloads", caption: "@quasarframework", icon: "rss_feed" },
  { title: "Add Product", icon: "add", action: "openModal" },
];

const route = useRoute();

function isActive(link) {
  return route.path === link.link;
}

function handleClick(link) {
  if (link.action === "openModal") {
    dialogVisible.value = true;
  }
}
</script>
<style scoped>
.links-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.links-container .q-btn {
  margin: 0 10px;
  border-radius: 10px;
  padding: 10px;
}
</style>