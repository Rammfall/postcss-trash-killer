const getLibFiles = require('./getLibFiles');

describe('Check getLibFiles', () => {
  let slickArray = [
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/slick-carousel/slick/slick.min.js'
  ].sort();

  if (process.platform === 'win32') {
    slickArray = [
      'node_modules\\slick-carousel\\slick\\slick.js',
      'node_modules\\slick-carousel\\slick\\slick.min.js'
    ].sort();
  }

  test('Must return array of list files inside package', () => {
    expect(getLibFiles('slick-carousel', ['.js']).sort()).toEqual(slickArray);
  });

  test('Must return empty array if we get deeper 1 node_modules', () => {
    expect(getLibFiles('base/node_modules/', ['.js']).sort()).toEqual([]);
  });
});
