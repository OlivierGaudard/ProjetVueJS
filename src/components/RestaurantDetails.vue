<!--  @autor : Nicolas Meyer - Olivier Garaud - M1 Miage TD2. 
  @date : 30/09/2020 -->


  <template>
      <div> 
        <h1> Détails du restaurant : {{restaurant.name}} ! ({{id}}) </h1>

        <ul>  
            <li> Cuisine : {{restaurant.cuisine}} </li>
            <li> Ville : {{restaurant.borough}} </li>


        </ul>


        <br>
        
          <gmap-map
            :center='restaurant.address.coord'
            :zoom="12"
            style="width:100%;  height: 400px;">
          <gmap-marker
            :position='restaurant.address.coord'>
            </gmap-marker>
          </gmap-map>

      </div>
  </template>


  <script>

    export default {
      name: 'RestaurantDetails',
      components: {
          
      },
      props: [
          'restaurant.address.coord'
      ],
        
      
      
      computed: {
          id() {
              return this.$route.params.r;
          }
      },
      data: function() {
          return {
              restaurant: null
          }
      },
       mounted() {
          let url = "http://localhost:8080/api/restaurants/" + this.id;
           fetch(url)
          .then(response => {
            return response.json();
          }).then(data => {
            
            this.restaurant = data.restaurant;
            this.restaurant.address.coord = {lat: data.restaurant.address.coord[1], lng: data.restaurant.address.coord[0] };

          })
      },
      methods : 
      {
      }
    }
    

  </script>


<style scoped>
  
  small {
      display: block;
  }

</style>