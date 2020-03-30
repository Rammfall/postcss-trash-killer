const getWords = require('./getWords');
const { regex } = require('../config/index');

describe('Function must be return array of words in string', () => {
  const testData = [
    ['string lol work .class many', ['string', 'lol', 'work', 'class', 'many']],
    [
      'selector__bem selecing-item__what',
      ['selector__bem', 'selecing-item__what']
    ],
    ['col-md-1 offset-lg-3', ['col-md-1', 'offset-lg-3']]
  ];

  test.each(testData)('String %i must return %i', (expected, mustBe) => {
    expect(getWords(expected, regex)).toEqual(mustBe);
  });
});
