import { URL, URLSearchParams } from 'universal-url'

export default (argumentUrl, params) => {
  const url = new URL(argumentUrl)
  url.search = new URLSearchParams(params).toString()

  return url.toString()
}
