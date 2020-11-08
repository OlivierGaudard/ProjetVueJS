<!-- @autor : Nicolas Meyer - M1 Miage TD2. 
@date : 30/09/2020

launch server : node serverCrudWithMongo.js
launch bdd : mongod 
launch client : npm run serve -->

<template>
    <div id="app">

         <slider :width="300" format="push" direction="left" :opacity="0.15" :links="[

         {'id': 1, 'text': 'Accueil', 'url': '/'}, 
         
         {'id': 2, 'text': 'Recherche avancée', 'url': '/'},

         {'id': 3, 'text': 'Ajout restaurant', 'url': '/AjoutRestaurant'},

         {'id': 4, 'text': 'Github Repo', 'url': 'https://github.com/OlivierGaudard/ProjetVueJS'},
         
         ]" customStyles=" {'navMenu': {'background-color': 'black'}} " >
         
         </slider>

        
        <!-- <router-link to="/RestaurantDetails">[Details Restau]</router-link> -->

        <router-view> </router-view>
    </div>
</template>

<script>

    import Slider from '@jeremyhamm/vue-slider'


  export default {
      name: 'app',
      components: {
          'slider': Slider
          
      },
      methods:
      {

      }

  }

  
  </script>

  <style> 

  img {
  width: 5%;
  height: auto;
}

</style>