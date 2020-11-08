<!--  @autor : Nicolas Meyer - Olivier Garaud - M1 Miage TD2. 
  @date : 30/09/2020 -->

  <template>
        
      <div style="background-color:#e6ffe6" class="AjoutRestaurant">

        <h1 style="margin-left: 15%; "> Ajout d'un restaurant :  </h1>



        <hr>
        <p>Nouveau restaurant :</p>
        <form @submit.prevent="ajouterRestaurant">
            <label>
                Nom : <input type="text" required v-model="name">
            </label>
            <label>
                Cuisine : <input type="text" required v-model="cuisine">
            </label>
            <label>
                Ville : <input type="text" required v-model="borough">
            </label>

            
            
            <google-map @clicked="onClickChild"/>

            <br/>

            <button>Ajouter</button>
        </form>

        <p id="secret">  Le restaurant vient d'être enregistré !
            <br/> 
            <b>Coordonnées</b> : {{coord.lat}} - {{coord.lng}}
            <br/> 
            <b>Nom :</b> {{name}}
            <br/> 
            <b>Cuisine :</b> {{cuisine}}
            <br/> 
            <b>Ville :</b> {{borough}}

            <input value="Ok!" type="button" @click="CloseAndClean"/>
        </p>


      </div>

  </template>



  <script>


  import GoogleMap from "./GoogleMap.vue";


    export default {
      name: 'AjoutRestaurant',
      components:
      {
          GoogleMap
      },

      data: () => ({
        //datas: '',
        coord: 
        {
            lat : '',
            lng: ''
        },
        name: '',
        cuisine: '',
        borough: '', 
        url: 'http://localhost:8080/api/restaurants'
    }),

      methods: 
      {

        async ajouterRestaurant() {
            let donneesFormulaire = new FormData();
            donneesFormulaire.append("name", this.name);
            donneesFormulaire.append("cuisine", this.cuisine);
            donneesFormulaire.append("borough", this.borough);
            donneesFormulaire.append("coord", this.coord);

            fetch(this.url, {
                method: "POST",
                body: donneesFormulaire
            }).then(function(responseJSON) {
                responseJSON.json().then(function(responseJS) {
                    console.log(responseJS.msg);
                });
            }).catch(function(e) {
                console.log(e);
            });

            /*
            this.datas = {
                coord: 
                {
                    lat : this.coord.lat,
                    lng : this.coord.lng
                },
                name: this.name,
                cuisine: this.cuisine,
                borough: this.borough
                };
            
            this.name = '';
            this.cuisine = '';
            this.borough = ''; 
            this.coord = 
            */
            
            document.getElementById('secret').style.display='block';

        },

        onClickChild (coords) {

        this.coord = coords;
        console.log(this.coord) // someValue
        },

        CloseAndClean()
        {
            this.name = '';
            this.cuisine = '';
            this.borough = ''; 
            document.getElementById('secret').style.display='none';
        }
      }

    };


  </script>


  <style>

#secret {
  color: green;
  display: none;
}

  </style>  