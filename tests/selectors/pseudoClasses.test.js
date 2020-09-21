const run = require('../utils/run');

describe('Checks pseudo classes', () => {
  test('Check with pseudo class', () => {
    run(
      '.selector:after {color: red;} .uselessSelector:after {color: red;}',
      '.selector:after {color: red;}',
      'combinatorsSelectors'
    );

    run(
      '.selector::after {color: red;} .uselessSelector::after {color: red;}',
      '.selector::after {color: red;}',
      'combinatorsSelectors'
    );

    run(
      '.selector:before {color: red;} .uselessSelector:before {color: red;}',
      '.selector:before {color: red;}',
      'combinatorsSelectors'
    );

    run(
      '.selector::before {color: red;} .uselessSelector::before {color: red;}',
      '.selector::before {color: red;}',
      'combinatorsSelectors'
    );

    run(
      '.selector:link {color: red;} .uselessSelector::before {color: red;}',
      '.selector:link {color: red;}',
      'combinatorsSelectors'
    );
  });

  test('Check with dynamic classes', () => {
    run(
      '.selector:link {color: red;} .selector:nth-child(3) {color: red;} .uselessSelector::before {color: red;}',
      '.selector:link {color: red;} .selector:nth-child(3) {color: red;}',
      'combinatorsSelectors'
    );
  });

  test('Check with difficult dynamic classes 3n + 1', () => {
    run(
      '.selector:nth-child(3n + 2) {color: red;}',
      '.selector:nth-child(3n + 2) {color: red;}',
      'combinatorsSelectors'
    );
  });

  test('Check with wtf difficult dynamic classes 3n + 1n - 5', () => {
    run(
      '.selector:nth-child(3n + 1n - 5) {color: red;}',
      '.selector:nth-child(3n + 1n - 5) {color: red;}',
      'combinatorsSelectors'
    );
  });
});
