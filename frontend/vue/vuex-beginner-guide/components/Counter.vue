<template>
  <div>
    <p>Clicked {{ count }} times! Count is {{ parity }}.</p>
    <button variant="success" @click="updateCount">Increment</button>
    <!--<button variant="danger" @click="decrement">Decrement</button>-->
    <!--<button variant="info" @click="incrementIfOdd">Increment if Odd</button>-->
    <!--<button variant="warning" @click="incrementAsync">Increment Async</button>-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['count', 'loggedInUser']),
    ...mapGetters(['depletedProducts', 'getProductById']),
    ...mapMutations(['incrementBy']),
    parity() {
      return this.count % 2 === 0 ? 'even' : 'odd';
    },
  },
  methods: {
    updateCount() {
      this.$store.commit('incrementBy', { amount: 25 });
    },
    incrementIfOdd() {
      if (this.parity === 'odd') {
        this.increment();
      }
    },
    incrementAsync() {
      setTimeout(() => {
        this.increment();
      }, 1000);
    },
  },
};
</script>
