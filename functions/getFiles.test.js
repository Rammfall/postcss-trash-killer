const getFiles = require('./getFiles');

describe('Testing getFiles function', () => {
  let mustBe = [
    'testData/getFiles/index.html',
    'testData/getFiles/index.ts',
    'testData/getFiles/index.haml',
    'testData/getFiles/index.js',
    'testData/getFiles/deeperFolder/index.js'
  ].sort();

  beforeAll(() => {
    if (process.platform === 'win32') {
      mustBe = [
        'testData\\getFiles\\index.html',
        'testData\\getFiles\\index.ts',
        'testData\\getFiles\\index.haml',
        'testData\\getFiles\\index.js',
        'testData\\getFiles\\deeperFolder\\index.js'
      ].sort();
    }
  });

  test('Get all files in entered filetypes', () => {
    const result = getFiles('./testData/getFiles/', [
      '.js',
      '.ts',
      '.haml',
      '.html'
    ]);

    expect(result.sort()).toEqual(mustBe);
  });

  test('Get all js files', () => {
    const result = getFiles('./testData/getFiles/', ['.js']);
    const jsFiles = [mustBe[0], mustBe[3]];

    expect(result.sort()).toEqual(jsFiles);
  });

  test('Function return empty array, if target node_modules', () => {
    const result = getFiles('./node_modules/', [
      '.js',
      '.ts',
      '.haml',
      '.html'
    ]);

    expect(result.sort()).toEqual([]);
  });
});
