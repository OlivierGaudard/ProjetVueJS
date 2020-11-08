<!-- @autor : Nicolas Meyer - M1 Miage TD2. 
    @date : 30/09/2020 -->

<style scoped src="../css/styles.css"></style>
    <template>
        <div id="test">
            <div v-if="nbRestaurants">
               <br/>
                <h1 style="margin-left: 35%; text-decoration:underline "> Liste des Restaurants :  </h1>
        <hr>

                <h2>Nombre de restaurants : {{nbRestaurants}}</h2>
                <button :disabled="page === 0" @click="pagePrecedente()" class="precedent">Précedent</button>&nbsp;&nbsp;<button :disabled="page === (nbRestaurants / pagesize)" @click="pageSuivante()" class="suivant">Suivant</button>
                <form @submit.prevent="getRestaurantsFromServer">
                    <label>
                Page : <input type="number" required v-model="page">
                <button >Aller</button>
                    </label>
                </form>
                <br>
                <button v-bind:disabled="page===0" v-on:click="firstPage()">Première page </button>
                <button v-bind:disabled="page===nbPagesTotal" v-on:click="lastPage()">Dernière page</button>

                
                <p>Nombre de restaurants a afficher  :  <input @change="getRestaurantsFromServer" type="range" min=2 max=100 v-model="pagesize">{{pagesize}}</p>
                <br />
                <div v-if="display">
                <label id="advancedResearch">
                <b> Recherche nom restaurant : </b> <input @input="chercherRestaurants()" type="text" v-model="nameRestauSearch">
                </label>
                </div>
                <br />
                <br />
                <p>Page courante : {{pageCourante}} </p>
                <md-table>
                    <md-table-row>  
                        <md-table-head>Nom</md-table-head>
                        <md-table-head>Cuisine</md-table-head>
                        <md-table-head>Ville</md-table-head>
                        <md-table-head>Rue</md-table-head>
                        <md-table-head>Details</md-table-head>
                        <md-table-head>Supprimer</md-table-head>

                    </md-table-row>
                        <md-table-row v-for="(r, index) in restaurants" v-bind:key="r._id" v-bind:style="{backgroundColor:getColor(index)}" v-bind:class="{bordureRouge:(index === 2)}">
                        <md-table-cell>{{r.name}}</md-table-cell>
                        <md-table-cell>{{r.cuisine}}</md-table-cell>
                        <md-table-cell>{{r.borough}}</md-table-cell>
                        <md-table-cell>{{r.address.street}}</md-table-cell>
                        <md-table-cell>
                            <router-link :to="'/RestaurantDetails/' + r._id"> [Détails] </router-link>
                        </md-table-cell>
                        <md-table-cell><button @click="supprimerRestaurant(r._id)">Supprimer</button></md-table-cell>
                    </md-table-row>
            </md-table>
            <br />

        </div>
        <div v-else>
            <p>Aucun restaurant ne correspond à votre recherche</p>
        </div>

    </div> 
</template>
<script>
  import {db} from '../main.js'
  import _ from 'lodash'
  export default {
    name: 'ListeDesRestaurants',
    data: () => ({
        display: '',
        restaurants: [],
        nbRestaurants: 0,
        cuisine: '',
        url: 'http://localhost:8080/api/restaurants',
        page: 0,
        pageCourante: 1,
        pagesize: 10,
        nameRestauSearch: '',
        name: '',
        borough: '', 
        expenses: []
    }),

    components: {
    
    },
    computed: {
          path() {
              return this.$route.fullPath;
          }
      },

    firestore() {
        return {
            expenses: db.collection('expenses')
        }
    },

    mounted() {
        this.getRestaurantsFromServer();
        this.searchState(this.path);
    },

    methods: {
        async getRestaurantsFromServer() {
            let url = this.url + "?page=" + this.page + "&pagesize=" + this.pagesize + "&name=" + this.nameRestauSearch;
            
            fetch(url).then((responseJSON) => {
                responseJSON.json().then((responseJS) => {
                    this.restaurants = responseJS.data;
                    this.nbRestaurants = responseJS.count;
                    this.nameRestauSearch != '' ? this.nameRestauSearch = '' : this.nameRestauSearch = '';
                    console.log(responseJS);
                });
            }).catch(function(e) {
                console.log(e);
            })
        },

        chercherRestaurants: _.debounce(function() {
            this.getRestaurantsFromServer(); 
        }, 
        300),
        
        async supprimerRestaurant(id) {
            let url = this.url + '/' + id;

            fetch(url, {
                method: "DELETE",
            }).then(function(responseJSON) {
                responseJSON.json().then(function(responseJS) {
                    console.log(responseJS.msg);
                });
            }).catch(function(e) {
                console.log(e);
            });
            this.getRestaurantsFromServer();
        },


        pageSuivante() {
            if(this.page === (this.nbRestaurants / this.pagesize)) return;
            this.page++;
            this.pageCourante++;
            this.getRestaurantsFromServer();
        },

        pagePrecedente() {
            if(this.page === 0) return;
            this.page--;
            this.pageCourante--;
            this.getRestaurantsFromServer();
        }, 

        firstPage(){
                this.page=0 ;
                this.pageCourante=0;
                this.getRestaurantsFromServer();

            },
        lastPage(){

                this.page=this.nbPagesTotal ;
                this.pageCourante=this.nbPagesTotal ;
                this.getRestaurantsFromServer();
                this.nbPagesTotal = Math.round(this.nbRestaurants / this.pagesize);
            },

        getColor(index) {
            return (index % 2) ? 'lightBlue' : '#ffd699';
        },

        searchState(path)
        {
            if(path === "/search")
            {
                this.display = true;
            }   

        }
    }
}
</script>