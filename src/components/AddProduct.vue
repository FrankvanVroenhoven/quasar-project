<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="width: 500px;">
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Add Product</div>
        <q-btn icon="close" flat round dense @click="closeDialog" />
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="submitForm">
          <q-input filled v-model="formData.name" label="Product Name" required />
          <q-input filled v-model="formData.description" label="Description" />
          <q-input filled v-model="formData.category" label="Category" required />
          <q-input filled v-model="formData.price" label="Price" type="number" required />

          <q-uploader
            color="primary"
            label="Upload Image"
            multiple
            :max-file-size="1000000"
            :hide-upload-btn="true"
            ref="uploader"
            @added="handleFileAdded"
          />

          <div class="q-mt-md row justify-end">
            <q-btn label="Cancel" color="negative" @click="closeDialog" class="q-mr-sm" />
            <q-btn :label="loading ? '' : 'Submit'" :disable="loading" type="submit" color="primary">
              <q-spinner v-if="loading" size="20px" color="white" />
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { eventBus } from 'src/boot/eventBus.js';

export default defineComponent({
  name: "AddProduct",
  props: {
    modelValue: Boolean, // Sync modal visibility with parent
  },
  data() {
    return {
      loading: false,
      formData: {
        name: "",
        description: "",
        category: "",
        price: "",
        image: null,
      },
    };
  },
  computed: {
    dialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    handleFileAdded(files) {
      this.formData.image = files[0];
    },

    async submitForm() {
      this.loading = true;
      try {
        const data = new FormData();
        data.append("name", this.formData.name);
        data.append("description", this.formData.description);
        data.append("category", this.formData.category);
        data.append("price", this.formData.price);

        if (this.formData.image) {
          data.append("image", this.formData.image);
        }

        const response = await axios.post("/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        eventBus.emit("product-added"); // Emit event globally
        this.resetForm();
        this.closeDialog();
      } catch (error) {
        console.error("Error uploading product:", error.response);
      } finally {
        this.loading = false;
      }
    },

    resetForm() {
      this.formData = { name: "", description: "", category: "", price: "", image: null };
    },

    closeDialog() {
      this.dialog = false; // Sync with parent component
    },
  },
});
</script>
