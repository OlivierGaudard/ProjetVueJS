<!-- @autor : Nicolas Meyer - M1 Miage TD2. 
    @date : 30/09/2020 -->

<style scoped src="../css/styles.css"></style>
    <template>
        <div>
            <div v-if="nbRestaurants">
                <modal v-show="isModalVisible" @close="closeModal"/>

                <h1>Nombre de restaurants : {{nbRestaurants}}</h1>
                <button :disabled="page === 0" @click="pagePrecedente()" class="precedent">Précedent</button>&nbsp;&nbsp;<button :disabled="page === (nbRestaurants / pagesize)" @click="pageSuivante()" class="suivant">Suivant</button>
                <p>Nb de resto par  : <input @change="getRestaurantsFromServer" type="range" min=2 max=100 v-model="pagesize">{{pagesize}}</p>
                <br />
                <p>Page courante : {{pageAffichage}}</p>
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Cuisine</th>
                        <th>Action</th>
                    </tr>
                    <tbody>
                        <tr v-for="(r, index) in restaurants" v-bind:key="r._id" @click="showModal(r)" v-bind:style="{backgroundColor:getColor(index)}" v-bind:class="{bordureRouge:(index === 2)}">
                        <td>{{r.name}}</td>
                        <td>{{r.cuisine}}</td>
                        <td><button @click="supprimerRestaurant(r._id)">Supprimer</button></td>
                    </tr>
                </tbody>
            </table>
            <br />
            <label>
                Nom : <input @input="chercherRestaurants()" type="text" v-model="nameRestauSearch">
            </label>
        </div>
        <div v-else>
            <p>Vous n'avez aucun restaurant.</p>
        </div>
        <hr>
        <p>Nouveau restaurant :</p>
        <form @submit.prevent="ajouterRestaurant">
            <label>
                Nom : <input type="text" required v-model="name">
            </label>
            <label>
                Cuisine : <input type="text" required v-model="cuisine">
            </label>

            <button>Ajouter</button>
        </form>
    </div> 
</template>
<script>
  import {db} from '../main.js'
  import _ from 'lodash'
  import modal from '../components/Modal.vue'
  export default {
    name: 'ListeDesRestaurants',
    data: () => ({
        restaurants: [],
        nbRestaurants: 0,
        cuisine: '',
        url: 'http://localhost:8080/api/restaurants',
        page: 0,
        pageAffichage: 1,
        pagesize: 10,
        nameRestauSearch: '',
        name: '',
        expenses: [],
        isModalVisible: false
    }),

    components: {
        modal,
    },

    firestore() {
        return {
            expenses: db.collection('expenses')
        }
    },

    mounted() {
        console.log("JE M'AFFICHE AVANT");
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

        async ajouterRestaurant() {
            let donneesFormulaire = new FormData();
            donneesFormulaire.append("name", this.name);
            donneesFormulaire.append("cuisine", this.cuisine);

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
            this.name = '';
            this.cuisine = '';
            this.getRestaurantsFromServer();    
        },

        pageSuivante() {
            if(this.page === (this.nbRestaurants / this.pagesize)) return;
            this.page++;
            this.pageAffichage++;
            this.getRestaurantsFromServer();
        },

        pagePrecedente() {
            if(this.page === 0) return;
            this.page--;
            this.pageAffichage--;
            this.getRestaurantsFromServer();
        }, 

        getColor(index) {
            return (index % 2) ? 'lightBlue' : 'pink';
        }
    }
}
</script>