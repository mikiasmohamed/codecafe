import Vue from 'vue';
import VueResource from 'vue-resource';
import { router } from 'src/main';

const API_BASE = 'http://www.mocky.io/v2/585b23350f0000892216190f';
Vue.use(VueResource);

Vue.http.options = {
  root: API_BASE
};

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    // Handle global API 404 =>
    if (response.status === 404) {
      router.push('/404');
    }
  });
});

export const drinksResource = Vue.resource();
