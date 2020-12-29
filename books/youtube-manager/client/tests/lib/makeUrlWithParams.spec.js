import makeUrlWithParams from '../../lib/makeUrlWithParams'

describe('makeUrlWithParams', () => {
  it('returns url with arguments as params', () => {
    const url = 'http://example.com'
    const params = { a: 1, b: 2 }
    expect(makeUrlWithParams(url, params)).toBe('http://example.com/?a=1&b=2')
  })
})
