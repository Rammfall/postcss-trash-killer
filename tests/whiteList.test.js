const run = require('./utils/runWithConfigs');

describe('Check whitelist in plugin', () => {
  test('Not remove whitelist selector', () => {
    run(
      '.whiteSelector {color: red;} @media screen and (max-width: 200px) {.trueWhiteSelector {color: red;}}',
      '.whiteSelector {color: red;} @media screen and (max-width: 200px) {.trueWhiteSelector {color: red;}}',
      ['basic'],
      [],
      [],
      ['whiteSelector', 'trueWhiteSelector']
    );
  });
});
