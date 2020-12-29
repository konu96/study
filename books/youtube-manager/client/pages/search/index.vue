<template>
  <section class="section">
    <div class="container">

      <div class="block">
        <div
          v-for="item in items"
          :key="item.id.videoId"
          class="block video-block"
        >
          <AppVideo
            :item="item"
            :video-id="item.id.videoId"
          />
        </div>
      </div>

      <div class="block">
        <nav class="pagination">
          <a
            href.prevent="#"
            class="pagination-next"
            @click="loadMore"
          >
            More
          </a>
        </nav>
      </div>

    </div>
  </section>
</template>

<script>
import ROUTES from '~/routes/api'
import AppVideo from '~/components/AppVideo'

export default {
  components: {
    AppVideo
  },
  computed: {
    items() {
      return this.$store.getters.getSearchVideos
    },
    nextPage() {
      return this.$store.getters.getSearchMeta.nextPage
    }
  },
  methods: {
    loadMore() {
      const q = encodeURIComponent(this.$route.query.q) || ''
      const payload = {
        uri: ROUTES.GET.SEARCH,
        params: {
          page: this.nextPage,
          q
        }
      }

      this.$store.dispatch('searchVideos', payload)
    }
  },
  async fetch({ store, query }) {
    const q = encodeURIComponent(query.q) || ''
    const payload = {
      uri: ROUTES.GET.SEARCH,
      params: {
        q
      }
    }

    if (
      store.getters.getSearchVideos &&
      store.getters.getSearchVideos.length > 0
    ) {
      return
    }

    await store.dispatch('searchVideos', payload)
  }
}
</script>

<style scoped>
.video-block {
  max-width: 900px;
}
</style>
