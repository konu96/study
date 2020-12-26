<template>
  <div class="app">
    <app-header />
    <div class="columns">
      <app-sidebar />
      <div class="column content">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import AppSidebar from '~/components/AppSidebar'

export default {
  components: {
    AppHeader,
    AppSidebar
  }
}
</script>

<style>
.app {
  min-height: 100vh;
  background: #fafafa;
}

.columns {
  min-height: 100vh;
}
</style>
