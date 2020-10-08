<!--  @autor : Nicolas Meyer - M1 Miage TD2. 
  @date : 30/09/2020 -->

  <script>
    export default {
      name: 'modal',
      methods: {
        close() {
          this.$emit('close');
        },
      },
    };
  </script>

  <template>
    <transition name="modal-fade">
      <div class="modal">
        <ListeDesRestaurants @restaurant="resto"></ListeDesRestaurants>
        {{resto.name}}
        <button type="button" @click="close">J'ai compris !</button>
      </div>
    </transition>
  </template>