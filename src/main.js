
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



const { db } = require('../.env')

var firebaseConfig = db
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
