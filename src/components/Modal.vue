<!--  @autor : Nicolas Meyer - Olivier Garaud - M1 Miage TD2. 
  @date : 30/09/2020 -->

  <script>
    export default {
      name: 'Modal',
      props: {
        msg: String,
        //data: data
      }
    };
  </script>

  <template>
    <transition name="modal-fade">
      <div class="modal">
        <h1> Détails d'un restaurant :  {{msg}} </h1>
      </div>
    </transition>
  </template>