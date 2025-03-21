<template>
    <q-page class="flex flex-center">
      <q-card class="q-pa-md" style="width: 400px;">
        <q-card-section>
          <h2 class="text-center">Login</h2>
          <q-form @submit.prevent="login" :greedy="true">
            <q-input
              v-model="email"
              label="Email"
              type="email"
              class="q-mb-md"
              outlined
              dense
              :error="emailError"
              :error-message="emailErrorMessage"
            />
            <q-input
              v-model="password"
              label="Password"
              type="password"
              class="q-mb-md"
              outlined
              dense
              :error="passwordError"
              :error-message="passwordErrorMessage"
            />
            <q-btn
              label="Login"
              color="primary"
              type="submit"
              class="full-width q-mt-md"
              :loading="loading"
            />
          </q-form>
          <!-- Register button to navigate to Register page -->
          <div class="q-mt-md text-center">
            <q-btn
              label="Don't have an account? Register"
              color="secondary"
              @click="goToRegisterPage"
              flat
            />
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        loading: false,
        emailError: false,
        passwordError: false,
        emailErrorMessage: '',
        passwordErrorMessage: ''
      };
    },
    methods: {
      async login() {
        this.loading = true;
        this.emailError = false;
        this.passwordError = false;
        this.emailErrorMessage = '';
        this.passwordErrorMessage = '';
  
        try {
          const response = await axios.post('/login', {
            email: this.email,
            password: this.password
          });
          
            // Save user to local storage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.$router.push({ name: 'products' }); // Redirect to Register page

        } catch (error) {
          if (error.response.status === 422) {
            if (error.response.data.errors.email) {
              this.emailError = true;
              this.emailErrorMessage = error.response.data.errors.email[0];
            }
            if (error.response.data.errors.password) {
              this.passwordError = true;
              this.passwordErrorMessage = error.response.data.errors.password[0];
            }
          }
        }
  
        this.loading = false;
      },
      goToRegisterPage() {
        this.$router.push({ name: 'register' }); // Redirect to Register page
      }
    }
  };
  </script>
  
  <style scoped>
  .q-card {
    width: 100%;
    max-width: 400px;
  }
  </style>
  