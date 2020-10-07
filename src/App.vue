<!-- @autor : Nicolas Meyer - M1 Miage TD2. 
@date : 30/09/2020

launch server : node serverCrudWithMongo.js
launch bdd : mongod -->

<template>
    <div id="app">
        <HelloWorld/>
    </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'

  export default {
      name: 'app',
      components: {
          HelloWorld
      }
  }
  </script>