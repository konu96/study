import forEach from '../src/forEach.js';

describe('forEach', () => {
  it('モック関数を利用', () => {
    const mockCallback = jest.fn(x => x + 42);

    forEach([0, 1], mockCallback);

    console.log(mockCallback.mock);

    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[0][0]).toBe(0);
    expect(mockCallback.mock.calls[1][0]).toBe(1);
    expect(mockCallback.mock.results[0].value).toBe(42);
  });
});
