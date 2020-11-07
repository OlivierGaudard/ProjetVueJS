<template>
  <div >
      {{coord}}
    <div>
      <h2>Search and add a pin</h2>
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


    const restaurantMarker = 
        {
            position: 
            {
                lat: 40.848447,
                lng: -73.856077
            },
        //  title: "RestauName"
        };

//console.log(this.coord);

export default {

    
  name: "GoogleMap",
  props: {
      coord: Array
  },


  data() {
    return {

      // change this to whatever makes sense
      center: { lat: 40.848447, lng:  -73.856077},
      markers: [restaurantMarker],
      places: [],
      currentPlace: null


    };
  },

  mounted() {
    //this.geolocate();

    console.log(this.coord);
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