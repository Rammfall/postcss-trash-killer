const run = require('../utils/run');

describe('Checks attribute selectors', () => {
  test('Must remove selector with attribute if attribute not exist(Simple attribute selector)', () => {
    run(
      'a[href="#"] {color: red;} h1[data-attr="#"] {color: red;}',
      'a[href="#"] {color: red;}',
      'attributeSelectors/links'
    );

    run(
      'a[href] {color: red;} h1[data-noattr] {color: red;}',
      'a[href] {color: red;} h1[data-noattr] {color: red;}',
      'attributeSelectors/links'
    );
  });

  test('Not remove dynamic selectors', () => {
    run(
      'a[href~="test"] {color: red;} h1[data-noattr] {color: red;}',
      'a[href~="test"] {color: red;} h1[data-noattr] {color: red;}',
      'attributeSelectors/links'
    );

    run(
      'a[href$="test"] {color: red;} h1[data-noattr] {color: red;}',
      'a[href$="test"] {color: red;} h1[data-noattr] {color: red;}',
      'attributeSelectors/links'
    );

    run(
      'a[href*="test"] {color: red;} h1[data-noattr] {color: red;}',
      'a[href*="test"] {color: red;} h1[data-noattr] {color: red;}',
      'attributeSelectors/links'
    );

    run(
      'a[href*="notExistName"] {color: red;} h1[data-noattr] {color: red;}',
      'a[href*="notExistName"] {color: red;} h1[data-noattr] {color: red;}',
      'attributeSelectors/links'
    );
  });
});
