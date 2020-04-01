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
});
