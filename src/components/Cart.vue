<template>
    <q-dialog v-model="cartModalVisible" persistent>
        <q-card style="width: 500px;">
            <q-card-section class="row items-center justify-between">
                <div class="text-h6">Your Cart</div>
                <q-btn icon="close" flat round dense @click="closeCartModal" />
            </q-card-section>

            <q-card-section>
                <q-list v-if="!loading">
                    <q-item v-for="(item, index) in cartItems" :key="index" class="q-mb-sm">
                        <q-item-section>
                            <div class="text-h6">{{ item.name }}</div>
                            <div>{{ item.quantity }} x ${{ item.price }}</div>
                        </q-item-section>
                    </q-item>
                </q-list>
                <div v-else class="row justify-center">
                    <q-spinner size="50px" />
                </div>
            </q-card-section>

            <q-card-actions>
                <q-btn label="Close" color="negative" @click="closeCartModal" class="q-mr-sm" />
                <q-btn label="Checkout" color="primary" @click="checkout" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import axios from "axios";
import { QSpinner } from 'quasar';

export default {
    name: "CartComponent",
    props: {
        modelValue: Boolean, // Sync modal visibility with parent
    },
    data() {
        return {
            cartModalVisible: false,
            cartItems: [],
            loading: false,
        };
    },
    onMounted() {
        // Fetch cart items when the component is mounted
        this.fetchCartItems();
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
    watch: {
        // Fetch the cart items whenever the modal is opened
        dialog(newValue) {
            if (newValue) {
                this.fetchCartItems();
            }
        },
    },
    methods: {
        // Fetch the cart items from the server
        async fetchCartItems() {
            try {
                this.loading = true;
                const userid = localStorage.getItem('userid');
                const response = await axios.get(`/cart/${userid}`);
                this.cartItems = response.data; // Set cart items from API
                this.loading = false;
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
                this.loading = false;
            }
        },

        // Close the cart modal
        closeCartModal() {
            this.cartModalVisible = false;
        },

        // Handle checkout
        checkout() {
            console.log("Proceeding to checkout with items:", this.cartItems);
            this.closeCartModal();
        },
    },
};
</script>

<style scoped>
.q-card {
    min-width: 300px;
}

.q-card-section {
    padding: 16px;
}

.q-list {
    padding: 0;
}

.q-item {
    padding: 8px;
    border-bottom: 1px solid #ccc;
}

.q-btn {
    margin: 8px;
}
</style>