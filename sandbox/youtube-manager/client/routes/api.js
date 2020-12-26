const HOST = 'http://localhost:8080'

export const ROUTES = {
  GET: {
    POPULARS: `${HOST}/api/popular`,
    VIDEO: `${HOST}/api/video/:id`,
    RELATED: `${HOST}/api/related/:id`,
    SEARCH: `${HOST}/api/search`
  },
  POST: {
    TOGGLE_FAVORITE: `${HOST}/api/favorite/:id/toggle`
  }
}

export default ROUTES
