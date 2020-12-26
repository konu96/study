import makeUrlWithParams from '~/lib/makeUrlWithParams'

export class RequestClient {
  constructor(axios) {
    this.axios = axios
  }

  async get(url, params = {}) {
    const urlWithParams = makeUrlWithParams(url, params)
    return await this.axios.$get(urlWithParams)
  }

  async post(uri) {
    return await this.axios.$post(uri)
  }
}

export const createRequestClient = axios => {
  return new RequestClient(axios)
}
