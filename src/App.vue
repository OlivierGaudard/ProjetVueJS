<!-- @autor : Nicolas Meyer - M1 Miage TD2. 
@date : 30/09/2020

launch server : node serverCrudWithMongo.js
launch bdd : mongod -->

<template>
    <div id="app">
        <ListeDesRestaurants/>
    </div>
</template>

<script>
  import ListeDesRestaurants from './components/ListeDesRestaurants.vue'

  export default {
      name: 'app',
      components: {
          ListeDesRestaurants
      }
  }
  </script>