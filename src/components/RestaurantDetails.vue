<!--  @autor : Nicolas Meyer - Olivier Garaud - M1 Miage TD2. 
  @date : 30/09/2020 -->


  <template>
  
    <div id="global">
      <br/>
              <h1 style="margin-left: 35%; text-decoration:underline"> Détails restaurant :  </h1>



        <hr>
      <div id="docker"> 
        <h1> Bienvenue au {{restaurant.name}} !  </h1>


        <div id="left">
        <ul id="restoDetails">  
            <b> <p style="text-decoration:underline"> Détails du restaurant : </p> </b>
            <li> Cuisine : {{restaurant.cuisine}} </li>
            <li> Ville : {{restaurant.borough}} </li>
            <li> Rue : {{restaurant.address.street}} </li>
            <li> Code Postal : {{restaurant.address.zipcode}} </li>

        </ul>
          <br/>

        <ul id="restoNotes">  
            <b> <p style="text-decoration:underline"> Notations du restaurant : </p> </b>
            <li style="text-decoration:underline"> Avis 1 : </li>
            <ul>
                <li> Date : {{restaurant.grades[0].date}} </li>
                <li> Note : {{restaurant.grades[0].grade}} </li>
                <li> Score : {{restaurant.grades[0].score}} </li>
            </ul>

            <li style="text-decoration:underline"> Avis 2 : </li>
            <ul>
                <li> Date : {{restaurant.grades[1].date}} </li>
                <li> Note : {{restaurant.grades[1].grade}} </li>
                <li> Score : {{restaurant.grades[1].score}} </li>
            </ul>

            <li style="text-decoration:underline"> Avis 3 : </li>
            <ul>
                <li> Date : {{restaurant.grades[2].date}} </li>
                <li> Note : {{restaurant.grades[2].grade}} </li>
                <li> Score : {{restaurant.grades[2].score}} </li>
            </ul>


        </ul>
        </div>

<div id="right">
        <img class= "imgResto" src="../assets/restaurant-interior.jpg"/>
</div>
       
      </div>

                <gmap-map id="gmap"
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

            console.log(this.restaurant);

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

  .imgResto 
  {
    width: 85%;
    border-width:10px;
    border-style:inset;
    border-color:#ffd699;
  }


#left
{
  position: relative;
  float: left;
}

  #right
  {
    position: relative;
    margin-left: 40%; 
  }

  #docker
  {
    position: relative;
    margin-left: 5%;
  }

  #gmap
  {
    position: relative;
    margin-top: 10%;
  }

  #restoDetails
  {
    border-width:15px;
    border-style:inset;
    border-color:lightblue;
  }

  #restoNotes
  {
    border-width:15px;
    border-style:inset;
    border-color:#ffd699;
  }

  #global
  {
    background-color: #e6ffe6;
  }

</style>