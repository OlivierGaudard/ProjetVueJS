// REQUETES GET
function getRequest1() {
	let url = "/api/restaurants";

	fetch(url)
		.then(function(responseJSON) {
        	responseJSON.json()
        	.then(function(res) {
        		// Maintenant res est un vrai objet JavaScript
        		afficheReponseGET(res);
        	});
    	})
    	.catch(function (err) {
        	console.log(err);
    });
}

function getRequest2() {
    let url = "/api/restaurants?page=2";

    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

function getRequest3() {
    let url = "/api/restaurants?page=2&pagesize=20";

    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

function getRequest4() {
    let url = "/api/restaurants/56b9f89be0adc7f00f348cf6";

    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES POST
function postRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;

    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(form);

    let url = "/api/restaurants";

    fetch(url, {
        method: "POST",
        body: donneesFormulaire
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponsePOST(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES PUT
function putRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;
    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(event.target);

    let id = form._id.value; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)

    let url = "/api/restaurants/" + id;

    fetch(url, {
        method: "PUT",
        body: donneesFormulaire
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponsePUT(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES DELETE
function deleteRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;
 
    let id = form._id.value; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)

    envoieRequeteFetchDelete(id);
}

function envoieRequeteFetchDelete(id) {
    let url = "/api/restaurants/" + id;

    fetch(url, {
        method: "DELETE",
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseDELETE(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}
//-------------------------------
// Affichage d'une réponse JSON
function afficheReponseGET(reponse) {
    let div = document.querySelector("#reponseGET");
    div.innerHTML = reponse.msg;

    // Dans reponse.data j'ai les restaurants
    afficheRestaurantsEnTable(reponse.data);
}

function afficheReponsePOST(reponse) {
    let div = document.querySelector("#reponsePOST");
    div.innerHTML = reponse.msg;
}

function afficheReponsePUT(reponse) {
    let div = document.querySelector("#reponsePUT");
    div.innerHTML = reponse.msg;

    // On affiche le tableau à jour
    getRequest1();
}

function afficheReponseDELETE(reponse) {
    let div = document.querySelector("#reponseDELETE");
    div.innerHTML = reponse.msg;
}

//------------ ici fonction pour creer tableau
function afficheRestaurantsEnTable(restaurants) {
    console.log("creer tableau");

    // On cree un tableau
    let table = document.createElement("table");

    // Je cree une ligne
    for(var i=0; i < restaurants.length; i++) {
        let ligne = table.insertRow();
        ligne.id = "restaurant" + i;

        let restaurant = restaurants[i];
        let nom = restaurant.name;
        let cuisine = restaurant.cuisine;

        let celluleNom = ligne.insertCell();
        celluleNom.innerHTML = nom;
        celluleNom.id = "restaurant" + i + "Nom" ;

        let celluleCuisine = ligne.insertCell();
        celluleCuisine.innerHTML = cuisine;
        celluleCuisine.id = "restaurant" + i + "Cuisine" ;

        let celluleRemove = ligne.insertCell();
        celluleRemove.innerHTML = '<button id=' + restaurant._id + ' onclick="supprimerRestaurant(event);">Supprimer</button>';

        let celluleModifier = ligne.insertCell();
        celluleModifier.innerHTML = '<button id=' + restaurant._id + ' onclick="modifierRestaurant(' + i + ');">Modifier</button>';

        /*
        ligne.innerHTML = "<td>" + nom + "</td><td>"    
                            + cuisine + "</td>"; 
                            */
    }

    let divTable = document.querySelector("#reponseGET");
    divTable.innerHTML = "";

    // on ajoute le tableau au div
    divTable.appendChild(table);
}

function supprimerRestaurant(event) {
    var id = event.target.id;
    console.log("on supprime le restaurant id=" + id);

    envoieRequeteFetchDelete(id)

    // On affiche le tableau à jour
    getRequest1();
}

function modifierRestaurant(noLigne) {
    let id = event.target.id;

    let nom = document.querySelector("#restaurant" + noLigne + "Nom").textContent;
    let cuisine = document.querySelector("#restaurant" + noLigne + "Cuisine").textContent;

    console.log("modifier Restaurant id=" + id + "avec nom="+nom + " cusine= "+ cuisine);

    // On remplit le formulaire
    let form = document.querySelector("#formulaireModification");
    form.nom.value = nom;
    form.cuisine.value = cuisine;
    form._id.value = id;



}

// donnees de test
var donneeServeur = {
    "msg":"restaurant recherchés avec succès",
    "data":[
        {
            "_id":"56b9f89be0adc7f00f348d02",
            "address":{
                "building":"103-05",
                "coord":[-73.8642349,40.75356],
                "street":"37 Avenue",
                "zipcode":"11368"
            },
            "borough":"Queens",
            "cuisine":"Chinese",
            "grades":[  
                {
                    "date":"2014-04-21T00:00:00.000Z",
                    "grade":"A",
                    "score":10
                },
                {
                    "date":"2013-11-12T00:00:00.000Z",
                    "grade":"A","score":5
                },{"date":"2013-06-04T00:00:00.000Z","grade":"A","score":12},{"date":"2012-11-14T00:00:00.000Z","grade":"A","score":10},{"date":"2012-10-11T00:00:00.000Z","grade":"P","score":0},{"date":"2012-05-24T00:00:00.000Z","grade":"A","score":13},{"date":"2011-12-08T00:00:00.000Z","grade":"A","score":12},{"date":"2011-07-20T00:00:00.000Z","grade":"A","score":11}],"name":"Ho Mei Restaurant","restaurant_id":"40362432"},{"_id":"56b9f89be0adc7f00f348d03","address":{"building":"56","coord":[-73.991495,40.692273],"street":"Court Street","zipcode":"11201"},"borough":"Brooklyn","cuisine":"Donuts","grades":[{"date":"2014-12-30T00:00:00.000Z","grade":"A","score":8},{"date":"2014-01-15T00:00:00.000Z","grade":"A","score":9},{"date":"2013-01-08T00:00:00.000Z","grade":"A","score":11},{"date":"2012-01-19T00:00:00.000Z","grade":"A","score":10}],"name":"Dunkin' Donuts","restaurant_id":"40363098"},{"_id":"56b9f89be0adc7f00f348d04","address":{"building":"60","coord":[-74.0085357,40.70620539999999],"street":"Wall Street","zipcode":"10005"},"borough":"Manhattan","cuisine":"Turkish","grades":[{"date":"2014-09-26T00:00:00.000Z","grade":"A","score":9},{"date":"2013-09-18T00:00:00.000Z","grade":"A","score":13},{"date":"2012-09-21T00:00:00.000Z","grade":"A","score":9},{"date":"2012-05-09T00:00:00.000Z","grade":"A","score":11}],"name":"The Country Cafe","restaurant_id":"40362715"},{"_id":"56b9f89be0adc7f00f348d05","address":{"building":"7905","coord":[-73.8740217,40.7135015],"street":"Metropolitan Avenue","zipcode":"11379"},"borough":"Queens","cuisine":"Bagels/Pretzels","grades":[{"date":"2014-09-17T00:00:00.000Z","grade":"A","score":10},{"date":"2014-01-16T00:00:00.000Z","grade":"B","score":23},{"date":"2013-08-07T00:00:00.000Z","grade":"A","score":10},{"date":"2013-02-21T00:00:00.000Z","grade":"B","score":27},{"date":"2012-06-20T00:00:00.000Z","grade":"B","score":27},{"date":"2012-01-31T00:00:00.000Z","grade":"B","score":18}],"name":"Hot Bagels","restaurant_id":"40363565"},{"_id":"56b9f89be0adc7f00f348d06","address":{"building":"195","coord":[-73.9246028,40.6522396],"street":"East 56 Street","zipcode":"11203"},"borough":"Brooklyn","cuisine":"Caribbean","grades":[{"date":"2014-05-13T00:00:00.000Z","grade":"A","score":2},{"date":"2013-05-08T00:00:00.000Z","grade":"A","score":7},{"date":"2012-09-22T00:00:00.000Z","grade":"A","score":11},{"date":"2011-06-06T00:00:00.000Z","grade":"A","score":12}],"name":"Shashemene Int'L Restaura","restaurant_id":"40362869"},{"_id":"56b9f89be0adc7f00f348d07","address":{"building":"87-69","coord":[-73.8309503,40.7001121],"street":"Lefferts Boulevard","zipcode":"11418"},"borough":"Queens","cuisine":"American ","grades":[{"date":"2014-02-25T00:00:00.000Z","grade":"A","score":7},{"date":"2013-08-14T00:00:00.000Z","grade":"A","score":11},{"date":"2012-08-07T00:00:00.000Z","grade":"A","score":7},{"date":"2012-03-26T00:00:00.000Z","grade":"A","score":10},{"date":"2011-11-04T00:00:00.000Z","grade":"A","score":0},{"date":"2011-06-29T00:00:00.000Z","grade":"A","score":4}],"name":"Snack Time Grill","restaurant_id":"40363590"},{"_id":"56b9f89be0adc7f00f348d08","address":{"building":"1418","coord":[-73.95685019999999,40.7753401],"street":"Third Avenue","zipcode":"10028"},"borough":"Manhattan","cuisine":"Continental","grades":[{"date":"2014-06-02T00:00:00.000Z","grade":"A","score":9},{"date":"2013-12-27T00:00:00.000Z","grade":"A","score":8},{"date":"2013-03-18T00:00:00.000Z","grade":"B","score":26},{"date":"2012-02-01T00:00:00.000Z","grade":"A","score":7},{"date":"2011-07-06T00:00:00.000Z","grade":"B","score":25}],"name":"Lorenzo & Maria'S","restaurant_id":"40363630"},{"_id":"56b9f89be0adc7f00f348d09","address":{"building":"1031","coord":[-73.9075537,40.6438684],"street":"East 92 Street","zipcode":"11236"},"borough":"Brooklyn","cuisine":"American ","grades":[{"date":"2014-02-05T00:00:00.000Z","grade":"A","score":0},{"date":"2013-01-29T00:00:00.000Z","grade":"A","score":3},{"date":"2011-12-08T00:00:00.000Z","grade":"A","score":10}],"name":"Sonny'S Heros","restaurant_id":"40363744"},{"_id":"56b9f89be0adc7f00f348d0a","address":{"building":"405","coord":[-73.97534999999999,40.7516269],"street":"Lexington Avenue","zipcode":"10174"},"borough":"Manhattan","cuisine":"Sandwiches/Salads/Mixed Buffet","grades":[{"date":"2014-02-21T00:00:00.000Z","grade":"A","score":3},{"date":"2013-09-13T00:00:00.000Z","grade":"A","score":3},{"date":"2012-08-28T00:00:00.000Z","grade":"A","score":0},{"date":"2011-09-13T00:00:00.000Z","grade":"A","score":12},{"date":"2011-05-03T00:00:00.000Z","grade":"A","score":5}],"name":"Lexler Deli","restaurant_id":"40363426"},{"_id":"56b9f89be0adc7f00f348d0b","address":{"building":"148","coord":[-73.9806854,40.7778589],"street":"West 72 Street","zipcode":"10023"},"borough":"Manhattan","cuisine":"Pizza","grades":[{"date":"2014-12-08T00:00:00.000Z","grade":"A","score":13},{"date":"2014-05-05T00:00:00.000Z","grade":"B","score":18},{"date":"2013-04-05T00:00:00.000Z","grade":"A","score":13},{"date":"2012-03-30T00:00:00.000Z","grade":"A","score":9}],"name":"Domino'S Pizza","restaurant_id":"40363945"}]}












