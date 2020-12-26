import fetchData from '../src/fetchData.js';

describe('fetchData', () => {
  /* fetchData が終わったタイミングでテストが終わってしまう
  test('callback', () => {
    const callback = data => {
      expect(data).toBe('peanut butter');
    }

    fetchData(callback);
  });
  */

  test('the data is peanut butter', done => {
    const callback = data => {
      expect(data).toBe('peanut butter');
      done();
    }

    fetchData(callback);
  });
});
