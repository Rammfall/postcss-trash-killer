const run = require('./utils/runWithConfigs');

describe('Check removing empty mediaqueries', () => {
  test('Plugin remove useless mediaqueries where was removed selector', () => {
    run(
      '.test {color: red;} @media screen and (max-width: 200px) {.notest {color: red;}}',
      '.test {color: red;} @media screen and (max-width: 200px) {.notest {color: red;}}',
      ['basic'],
      [],
      [],
      [],
      ['notest']
    );
  });

  test('Plugin not remove selector if his has part in dynamic selectors', () => {
    run(
      '.qa-lifecycle-points__item:last-of-type { background: red; } .lololo(4) { background: red; }',
      '.qa-lifecycle-points__item:last-of-type { background: red; } .lololo(4) { background: red; }',
      ['dynamicSelectors'],
      [],
      [],
      [],
      ['lol']
    );
  });

  test('Plugin remove selector if his has part not exist in dynamic selectors', () => {
    run(
      '.qa-lifecycle-points__item:last-of-type { background: red; } .lololo(4) { background: red; }',
      '.qa-lifecycle-points__item:last-of-type { background: red; }',
      ['dynamicSelectors'],
      [],
      [],
      [],
      ['hohoho']
    );
  });
});
