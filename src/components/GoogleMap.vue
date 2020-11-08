<template>
  <div >
      {{coord}}
    <div>
      <h2>Entrez l'adresse ! </h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>    

import Vue from 'vue'

    const restaurantMarker = 
        {
            position: 
            {
                lat: 43.5494428,
                lng: 6.9846071
            },
        //  title: "RestauName"
        };



export default {

    
  name: "GoogleMap",
  props: ['coord'],

  data() {
    return {

      counter: Vue.util.extend({}, this.coord),
      // change this to whatever makes sense
      coordinate: this.coord,
      center: { lat: 43.5494428, lng: 6.9846071 },
      markers: [restaurantMarker],
      places: [],
      currentPlace: null


    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
          
        };
      });
    }
  }
};


</script>