import { createRequestClient } from '~/store/request-client'
import firebase from '~/plugins/firebase'

export const state = () => ({
  items: [],
  item: {},
  relatedItems: [],
  meta: {},
  searchItems: [],
  searchMeta: {},
  token: ''
})

export const actions = {
  async fetchPopularVideos({ commit }, payload) {
    const client = createRequestClient(this.$axios)
    const response = await client.get(payload.uri, payload.params)

    commit('mutatePopularVideos', response)
  },
  async findVideo({ commit }, payload) {
    const client = createRequestClient(this.$axios)
    const response = await client.get(payload.uri)
    const params = {
      ...response.video_list,
      isFavorite: response.is_favorite || false
    }

    commit('mutateVideo', params)
  },
  async fetchRelatedVideos({ commit }, payload) {
    const client = createRequestClient(this.$axios)
    const response = await client.get(payload.uri)

    commit('mutateRelatedVideos', response)
  },
  async searchVideos({ commit }, payload) {
    const client = createRequestClient(this.$axios)
    const response = await client.get(payload.uri, payload.params)

    commit('mutateSearchVideos', response)
  },

  async signUp({ commit, dispatch }, payload) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)

    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
    const token = await response.user.getIdToken()

    this.$cookies.set('jwt_token', token)
    commit('mutateToken', token)
    this.app.router.push('/')
  },
  async setToken({ commit }, payload) {
    commit('mutateToken', payload)
  },
  async login({ commit, dispatch }, payload) {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
    const token = await response.user.getIdToken()

    this.$cookies.set('jwt_token', token)
    commit('mutateToken', token)
    this.app.router.push('/')
  },
  async logout({ commit }) {
    await firebase.auth().signOut()
    commit('mutateToken', null)

    this.$cookies.remove('jwt_token')
    this.app.router.push('/')
  },
  async toggleFavorite({ commit }, payload) {
    const client = createRequestClient(this.$axios)
    const response = await client.post(payload.uri)

    commit('mutateToggleFavorite', response.is_favorite)
  }
}

export const mutations = {
  mutatePopularVideos(state, payload) {
    state.items = payload.items ? state.items.concat(payload.items) : []
    state.meta = payload
  },
  mutateVideo(state, payload) {
    const params =
      payload.items && payload.items.length > 0 ? payload.items[0] : {}
    params.isFavorite = payload.isFavorite || false
    state.item = params
  },
  mutateRelatedVideos(state, payload) {
    state.relatedItems = payload.items || []
  },
  mutateSearchVideos(state, payload) {
    state.searchItems = payload.items
      ? state.searchItems.concat(payload.items)
      : []
    state.seatchMeta = payload
  },
  mutateToken(state, payload) {
    state.token = payload
  },
  mutateToggleFavorite(state, payload) {
    state.item.isFavorite = payload
  }
}

export const getters = {
  getPopularVideos(state) {
    return state.items
  },
  getMeta(state) {
    return state.meta
  },
  getVideo(state) {
    return state.item
  },
  getRelatedVideos(state) {
    return state.relatedItems
  },
  getSearchVideos(state) {
    return state.searchItems
  },
  getSearchMeta(state) {
    return state.searchMeta
  },
  isLoggedIn(state) {
    return !!state.token
  }
}
