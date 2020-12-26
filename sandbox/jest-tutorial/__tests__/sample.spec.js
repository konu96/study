describe('色々な jest API を使うためのテスト', () => {
  test('Object assignment', () => {
    const data = { one: 1 };
    data['two'] = 2;

    expect(data).toEqual({ one: 1, two: 2 });
  });

  test('There is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });

  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });

  test('woo-noo contains oo', () => {
    expect('woo-noo').toContain('oo');
  });

  /*
   * only をつけると、describe の中でそのテストだけ実行する
   *
  test.only('woo-noo contains oo', () => {
    expect('woo-noo').toContain('oo');
  });
  */

})
