const run = require('./utils/run');

describe('Basic usage', () => {
  test('Must remove useless selector with rule on selector with mediaquery', () => {
    run(
      '.test {color: red;} .notest {color: black;} @media screen and (max-width: 320px) { .notest {color: black;} }',
      '.test {color: red;}'
    );
  });

  test('Must remove useless selector with rule', () => {
    run(
      '.test {color: red;} .notest.test {color: black;}',
      '.test {color: red;}'
    );

    run(
      'div.test {color: red;} .notest.test {color: black;}',
      'div.test {color: red;}'
    );

    run(
      '.link { color: red; } a.lint__red { height: 100vh; }',
      '.link { color: red; } a.lint__red { height: 100vh; }'
    );
  });
});

describe('Check plugin with html tagSelectors false', () => {
  test('Must dont remove rules with html tags', () => {
    run(
      'body { color: red; } html { height: 100vh; }',
      'body { color: red; } html { height: 100vh; }',
      'basic',
      false
    );
  });

  test('Must remove with false argument', () => {
    run('h3 { color: red; } h4 { height: 100vh; }', '', 'basic', false);
  });

  test('Must not remove difficult selectors with usage', () => {
    run('h3.test { color: red; } h4 { height: 100vh; }', '', 'basic', false);
  });
});
