<template>
    <q-page class="flex flex-center">
      <q-card class="q-pa-md" style="width: 400px;">
        <q-card-section>
          <h2 class="text-center">Register</h2>
          <q-form @submit.prevent="register">
            <q-input
              v-model="name"
              label="Name"
              type="text"
              class="q-mb-md"
              outlined
              dense
              :error="nameError"
              :error-message="nameErrorMessage"
            />
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
            <q-input
              v-model="password_confirmation"
              label="Confirm Password"
              type="password"
              class="q-mb-md"
              outlined
              dense
              :error="passwordConfirmationError"
              :error-message="passwordConfirmationErrorMessage"
            />
            <q-btn
              label="Register"
              color="primary"
              type="submit"
              class="full-width q-mt-md"
              :loading="loading"
            />
          </q-form>
          <!-- Login button to navigate to Login page -->
          <div class="q-mt-md text-center">
            <q-btn
              label="Already have an account? Login"
              color="secondary"
              @click="goToLoginPage"
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
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        loading: false,
        nameError: false,
        emailError: false,
        passwordError: false,
        passwordConfirmationError: false,
        nameErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        passwordConfirmationErrorMessage: '',
      };
    },
    methods: {
      async register() {
        this.loading = true;
  
        // Validate form fields
        if (!this.name || !this.email || !this.password || this.password !== this.password_confirmation) {
          this.loading = false;
          this.nameError = !this.name;
          this.emailError = !this.email;
          this.passwordError = !this.password;
          this.passwordConfirmationError = this.password !== this.password_confirmation;
          return;
        }
  
        // Reset errors
        this.nameError = false;
        this.emailError = false;
        this.passwordError = false;
        this.passwordConfirmationError = false;
  
        try {
          const response = await axios.post('/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
          });
  
          if (response.data.success) {
            this.$router.push('/');  // Redirect to login page after successful registration
          } else {
            // Handle any errors from the backend if needed
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      },
      goToLoginPage() {
        this.$router.push({ name: 'LoginPage' }); // Redirect to login page
      }
    },
  };
  </script>
  
  <style scoped>
  .q-card {
    width: 100%;
    max-width: 400px;
  }
  </style>
  