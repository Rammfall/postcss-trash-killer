const run = require('../utils/run');

describe('Checks grouping selectors', () => {
  test('Must remove useless selector but existing must be stay (double selector)', () => {
    run(
      '.groupFirst, .groupSecond {color: red;}',
      '.groupFirst {color: red;}',
      'groupingSelectors'
    );
  });

  test('Remove useless rule with selector', () => {
    run('.grouspFirst, .groupSecond {color: red;}', '', 'groupingSelectors');
  });

  test('Test with media query. Must remove useless rule with media', () => {
    run(
      '.groupFirst, .groupSecond {color: red;} @media screen {.groupFirst, .groupSecond {color: blue;}}',
      '.groupFirst {color: red;} @media screen {.groupFirst {color: blue;}}',
      'groupingSelectors'
    );

    run(
      '.first, .second, .third, .some, .based {color: red;} @media screen {.first, .second, .third, .some, .based {color: blue;}}',
      '.first, .second, .third {color: red;} @media screen {.first, .second, .third {color: blue;}}',
      'groupingSelectors/many'
    );
  });

  test('Must remove useless selector but existing must be stay (many selectors)', () => {
    run(
      '.first, .second, .third, .some, .based {color: red;}',
      '.first, .second, .third {color: red;}',
      'groupingSelectors/many'
    );
  });
});
