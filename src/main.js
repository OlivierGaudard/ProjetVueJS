/* @autor : Nicolas Meyer - Olivier Garaud - M1 Miage TD2. 
@date : 30/09/2020
@update : 07/10/2020 */


import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import 'firebase/firestore'
import VueFirestore from 'vue-firestore'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'

import ListeDesRestaurants from './components/ListeDesRestaurants.vue';
import RestaurantDetails from './components/RestaurantDetails.vue';
import AjoutRestaurant from './components/AjoutRestaurant.vue';

import * as VueGoogleMaps from "vue2-google-maps";
import Slider from '@jeremyhamm/vue-slider'




firebase.initializeApp({
    databaseURL: "https://expenses-278a5.firebaseio.com",
    projectId: "expenses-278a5",
});

export const db = firebase.firestore();

Vue.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyDxg6xEVt7q79Ck3aCG23Xu0uYc0sjRFPo",
      libraries: "places" // necessary for places input
    }
  });
Vue.use(Slider)
Vue.use(VueFirestore)
Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter(
    {
        routes: 
        [
            {
                path: '/',
                component: ListeDesRestaurants
            },

            {
                path: '/RestaurantDetails/:r',
                component: RestaurantDetails,
                props: {
                    msg: "Hello"
                    //data: data
                }
            },

            {
                path: '/AjoutRestaurant',
                component: AjoutRestaurant
            }

        ],
        mode: 'history'
    }
);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
