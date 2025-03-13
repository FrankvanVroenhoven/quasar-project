<template>
    <q-page>
    <!-- list of items in the cart of the user -->
    </q-page>
</template>
<script>
export default {
    data() {
        return {
            cart: [],
            id: this.$route.params.id,
        };
    },
    mounted() {
        this.getCart();
    },
    methods: {
        async getCart() {
            axios.get('/cart', id).then((response) => {
                this.cart = response.data;
            });
        },
    },
};
</script>
<style scoped></style>
