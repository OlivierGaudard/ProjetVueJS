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

      </div>
  </template>


  <script>
    export default {
      name: 'RestaurantDetails',
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
              restaurant: null
          }
      },
      mounted() {
          console.log("Avant l'affichage, on pourra faire un fetch...");
          console.log("ID = " + this.id)
          let url = "http://localhost:8080/api/restaurants/" + this.id;
          fetch(url)
          .then(response => {
            return response.json();
          }).then(data => {
            
            this.restaurant = data.restaurant;
            console.log(this.restaurant.name);
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