const getContent = require('./getContent');

describe('Check getContent function', () => {
  test('Return all content', () => {
    expect(
      getContent([
        'testData/getContent/index.js',
        'testData/getContent/index.html'
      ])
    ).toEqual(`function sum(a, b) {
  return a + b;
}

sum(4, 5);
,<!doctype html>
<html lang="en">
<head>
  <title>Yo, man:)</title>
</head>
<body>

</body>
</html>
`);
  });
});
