import axios from 'axios';

export default async ({ app, store }) => {
  // Set Axios default base URL
  axios.defaults.baseURL = 'http://localhost:80/api'; // Replace with your Laravel API URL
  axios.defaults.headers.common['Accept'] = 'application/json';
  // Get XSRF token using Sanctum
  await axios.get('../sanctum/csrf-cookie');

  // You can also add authentication logic or other custom headers here
  // axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token;

  // Attach Axios to Vue instance (can be accessed via this.$axios)
  app.config.globalProperties.$axios = axios;
};
