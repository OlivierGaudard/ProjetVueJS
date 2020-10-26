<!--  @autor : Nicolas Meyer - Olivier Garaud - M1 Miage TD2. 
  @date : 30/09/2020 -->


  <template>
      <div>
        <h1> Détails d'un restaurant : {{msg}} </h1>
      </div>
  </template>


  <script>
    export default {
      name: 'RestauDetails',
      props: {
       msg: String,
        //data: data
      }
      /*
      ,
      
      computed: {
          id() {
              return this.$route.param.id
          }
      },
      data: function() {
          return {

          }
      },
      mounted() {

      },
      methods : {

      }
      */

    };
  </script>


<style scoped>
  
  small {
      display: block;
  }

</style>