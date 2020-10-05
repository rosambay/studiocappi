
import Vue from 'vue'
import App from './App'
import router from '@/router'
import firebase from "firebase"
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import store from './store'
import "@/plugins/vuetify-money.js";






var firebaseConfig = {
  apiKey: "AIzaSyBcG0R5KiJunq1PyU8WVaMdfo-k0t4rh04",
  authDomain: "dicuore.firebaseapp.com",
  databaseURL: "https://dicuore.firebaseio.com",
  projectId: "dicuore",
  storageBucket: "dicuore.appspot.com",
  messagingSenderId: "467107237720",
  appId: "1:467107237720:web:f694ac4fcaa2ee27919f2d"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);


Vue.use(VueTheMask)


Vue.use(Vuelidate)



Vue.config.productionTip = false

Vue.directive('uppercase', {
  update (el) {
    // el.value = el.value.toUpperCase()
    console.log(el.target)
  },
})



Vue.directive('downcase', {
  update (el) {
    el.value = el.value.toLowerCase()
  },
})

Vue.prototype.appName = 'Meu Aplicativo'

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
