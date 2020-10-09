/* @autor : Nicolas Meyer - M1 Miage TD2. 
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




firebase.initializeApp({
    databaseURL: "https://expenses-278a5.firebaseio.com",
    projectId: "expenses-278a5",
});

export const db = firebase.firestore();

Vue.use(VueFirestore)
Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')