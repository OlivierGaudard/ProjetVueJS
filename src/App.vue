<!-- @autor : Nicolas Meyer - M1 Miage TD2. 
@date : 30/09/2020

launch server : node serverCrudWithMongo.js
launch bdd : mongod 
launch client : npm run serve -->

<template>
    <div id="app">
        <router-link to="/">[Home]</router-link>
        <router-link to="/RestaurantDetail?id=">[Details Restau]</router-link>
        <router-view> </router-view>
    </div>
</template>

<script>


  export default {
      name: 'app',
      components: {
      }
  }
  </script>