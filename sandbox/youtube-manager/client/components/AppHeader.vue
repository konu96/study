<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <nuxt-link
        class="navbar-item subtitle is-4"
        to="/">
        Youtube Player
      </nuxt-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="field has-addons">
          <form
            class="form"
            action="/search"
            method="get"
          >
            <input
              name="q"
              class="input"
              type="text"
              placeholder="検索"
            >
            <p class="control">
              <button class="button">
                Search
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div
          v-if="isLoggedIn"
          class="buttons">
          <a
            href="#"
            class="button is-light"
            @click.prevent="logout">
            Log out
          </a>
        </div>
        <div
          v-else
          class="buttons">
          <nuxt-link
            class="button is-primary"
            to="/signup">
            <strong>Sign Up</strong>
          </nuxt-link>
          <nuxt-link
            class="button is-light"
            to="/login">
            Log in
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
}
</style>
