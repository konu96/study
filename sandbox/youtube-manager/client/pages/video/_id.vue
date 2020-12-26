<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6">

        <div class="block video-player">
          <youtube
            ref="youtube"
            :video-id="videoId" />
        </div>

        <div class="box">
          <p>
            <span class="title is-4">{{ title }}</span>
          </p>
          <div class="level">
            <div class="level-left">
              {{ channelTitle }}
              <br >
              {{ publishedAt }}
            </div>
          </div>
          <div
            v-if="isLoggedIn"
            class="level-right">
            <a
              href="#"
              @click.prevent="toggleFavorite"
            >
              <span class="icon is-large">
                <span class="fa-stack fa-lg">
                  <i
                    :class="[item.isFavorite ? 'active' : 'has-text-grey-light']"
                    class="fas fa-heart fa-stack-1x" />
                </span>
              </span>
            </a>
          </div>

          <hr >
          <p>{{ item.snippet.description }}</p>
        </div>
      </div>

      <div class="column is-4">
        <div class="box">
          <p>
            <span>関連動画</span>
          </p>
          <div
            v-for="relatedItem in relatedItems"
            :key="relatedItem.id"
          >
            <hr>
            <nuxt-link :to="`/${relatedItem.id.videoId}`">
              <article class="media">
                <div class="media-left">
                  <figure class="image">
                    <img
                      :src="relatedItem.snippet.thumbnails.default.url"
                      alt="thumbnail">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>{{ relatedItem.snippet.title }}</p>
                    <small>{{ relatedItem.snippet.channellTitle }}</small>
                  </div>
                </div>
              </article>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ROUTES from '~/routes/api'

export default {
  async fetch({ store, route }) {
    await store.dispatch('findVideo', {
      uri: ROUTES.GET.VIDEO.replace(':id', route.params.id)
    })

    await store.dispatch('fetchRelatedVideos', {
      uri: ROUTES.GET.RELATED.replace(':id', route.params.id)
    })
  },
  computed: {
    item() {
      return this.$store.getters.getVideo
    },
    videoId() {
      return this.$route.params.id
    },
    title() {
      if (this.item || this.item.snippet) {
        return ''
      }

      return this.item.snippet.title
    },
    channelTitle() {
      if (this.item || this.item.snippet) {
        return ''
      }

      return this.item.snippet.channelTitle
    },
    description() {
      if (this.item || this.item.snippet) {
        return ''
      }

      return this.item.snippet.description
    },
    publishedAt() {
      if (this.item || this.item.snippet) {
        return ''
      }

      return this.item.snippet.publishedAt
    },
    relatedItems() {
      return this.$store.getters.getRelatedVideos
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    async toggleFavorite() {
      await this.$store.dispatch('toggleFavorite', {
        uri: ROUTES.POST.TOGGLE_FAVORITE.replace(':id', this.$route.params.id)
      })
    }
  }
}
</script>

<style>
iframe {
  width: 100%;
  height: 500px;
}

.video-player {
  max-width: 880px;
}

.fa-heart.active {
  color: #ff1493;
}
</style>
