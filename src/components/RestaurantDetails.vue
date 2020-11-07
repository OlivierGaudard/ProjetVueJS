<!--  @autor : Nicolas Meyer - Olivier Garaud - M1 Miage TD2. 
  @date : 30/09/2020 -->


  <template>
      <div> 
        <h1> Détails d'un restaurant : {{id}} </h1>

        <ul>  
            <li> Nom : {{restaurant.name}} </li>
            <li> Cuisine : {{restaurant.cuisine}} </li>
            <li> Ville : {{restaurant.borough}} </li>


        </ul>


        <google-map :coord='restaurant.address.coord'/>
      </div>
  </template>


  <script>

  import GoogleMap from "./GoogleMap.vue";

  
    export default {
      name: 'RestaurantDetails',
      components: {
          GoogleMap
      },
      props: {
       //msg: String,
        //data: data
        
      },
      
      
      computed: {
          id() {
              return this.$route.params.r;
          }
      },
      data: function() {
          return {
              restaurant: 
              {
                address:
                {
                  coord: []
                }
              }
          }
      },
       mounted() {
          let url = "http://localhost:8080/api/restaurants/" + this.id;
           fetch(url)
          .then(response => {
            return response.json();
          }).then(data => {
            
            this.restaurant = data.restaurant;

          })
      },
      methods : {
      }
    }
  </script>


<style scoped>
  
  small {
      display: block;
  }

</style>