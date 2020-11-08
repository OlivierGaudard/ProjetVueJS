<!-- @autor : Nicolas Meyer - M1 Miage TD2. 
    @date : 30/09/2020 -->

<style scoped src="../css/styles.css"></style>
    <template>
        <div id="test">
            <div v-if="nbRestaurants">
                <br/>
                <br />


                <h1>Nombre de restaurants : {{nbRestaurants}}</h1>
                <button :disabled="page === 0" @click="pagePrecedente()" class="precedent">Précedent</button>&nbsp;&nbsp;<button :disabled="page === (nbRestaurants / pagesize)" @click="pageSuivante()" class="suivant">Suivant</button>
                <p>Nombre de restaurants par page  :  <input @change="getRestaurantsFromServer" type="range" min=2 max=100 v-model="pagesize">{{pagesize}}</p>
                <br />
                <label id="advancedResearch">
                Recherche nom restaurant : <input @input="chercherRestaurants()" type="text" v-model="nameRestauSearch">
                </label>
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
                        <md-table-row v-for="(r, index) in restaurants" v-bind:key="r._id" @click="showModal(r)" v-bind:style="{backgroundColor:getColor(index)}" v-bind:class="{bordureRouge:(index === 2)}">
                        <md-table-cell>{{r.name}}</md-table-cell>
                        <md-table-cell>{{r.cuisine}}</md-table-cell>
                        <md-table-cell>{{r.borough}}</md-table-cell>
                        <md-table-cell>{{r.address.street}}</md-table-cell>
                        <md-table-cell>
                            <router-link :to="'/RestaurantDetails/' + r._id"> [Détails] </router-link>
                        </md-table-cell>
                        <md-table-cell><button>Supprimer</button></md-table-cell>
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

    firestore() {
        return {
            expenses: db.collection('expenses')
        }
    },

    mounted() {
        this.getRestaurantsFromServer();
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
        
        showModal(r) {
            this.isModalVisible = true;
            this.$emit('restaurant', r);
        },

        closeModal() {
            this.isModalVisible = false;
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

        getColor(index) {
            return (index % 2) ? 'lightBlue' : '#ffd699';
        }
    }
}
</script>