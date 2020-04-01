const includesPart = require('./includesPart');

describe('Check includesPart in array', () => {
  test('Return true if exist part word in array', () => {
    const arr = ['color--', 'bg--', 'header__description-bg-image'];

    expect(includesPart(arr, 'color--red')).toBeTruthy();
    expect(includesPart(arr, 'web-dev-')).toBeTruthy();
  });
});
