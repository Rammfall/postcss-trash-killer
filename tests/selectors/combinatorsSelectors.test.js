const run = require('../utils/run');

describe('Checks combinator selectors', () => {
  test('Adjacent sibling combinator', () => {
    run(
      '.selector + .selectorNested {color: red;} .selector + .notExistedClass {color: red;}',
      '.selector + .selectorNested {color: red;}',
      'combinatorsSelectors'
    );
  });

  test('General sibling combinator', () => {
    run(
      '.selector ~ .selectorNested {color: red;} .selector ~ .notExistedClass {color: red;}',
      '.selector ~ .selectorNested {color: red;}',
      'combinatorsSelectors'
    );
  });

  test('Child combinator', () => {
    run(
      '.selector > .selectorTripleNested {color: red;} .selector > .notExistedClass {color: red;}',
      '.selector > .selectorTripleNested {color: red;}',
      'combinatorsSelectors'
    );
  });

  test('Descendant combinator', () => {
    run(
      '.selector .selectorNested {color: red;} .selector .notExistedClass {color: red;}',
      '.selector .selectorNested {color: red;}',
      'combinatorsSelectors'
    );
  });

  test('Column combinator', () => {
    run(
      '.selector || .selectorNested {color: red;} .selector || .notExistedClass {color: red;}',
      '.selector || .selectorNested {color: red;}',
      'combinatorsSelectors'
    );
  });
});
