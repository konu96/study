<template>
  <section class="section">
    <div class="container">
      <div class="block">
        <div
          v-for="item in items"
          :key="item.id"
          class="block video-block"
        >
          <app-video
            :item="item"
            :video-id="item.id" />
        </div>
      </div>

      <div class="block">
        <nav class="pagination">
          <a
            href.prevent="#"
            class="pagination-next"
            @click="loadMore">
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
      return this.$store.getters.getPopularVideos
    },
    nextPage() {
      return this.$store.getters.getMeta.nextPageToken
    }
  },
  async fetch({ store }) {
    const payload = {
      uri: ROUTES.GET.POPULARS
    }

    if (
      store.getters.getPopularVideos &&
      store.getters.getPopularVideos.length > 0
    ) {
      return
    }

    await store.dispatch('fetchPopularVideos', payload)
  },
  methods: {
    loadMore() {
      const payload = {
        uri: ROUTES.GET.POPULARS,
        params: {
          page: this.nextPage
        }
      }

      this.$store.dispatch('fetchPopularVideos', payload)
    }
  }
}
</script>

<style>
.video-block {
  max-width: 900px;
}
</style>
