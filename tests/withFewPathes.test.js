const run = require('./utils/runWithConfigs');

describe('Check with few paths', () => {
  test('Must contains selectors all paths', () => {
    run(
      '.fix {color: red;} .firstest {color: blue;} .firstpath {color: red} .firstsubpath {color: red} .secondpath {color: red} .secondsubpath {color: red}',
      '.firstpath {color: red} .firstsubpath {color: red} .secondpath {color: red} .secondsubpath {color: red}',
      ['fewPaths/first', 'fewPaths/second']
    );
  });
});
