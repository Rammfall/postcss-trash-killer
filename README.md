![Travis CI on linux](https://img.shields.io/travis/com/rammfall/postcss-trash-killer?style=for-the-badge)

# This plugin will be kill your unused css

## Why do you need this?

Your css is increasing after each iteration? Coverage of pages smaller 5%? This plugin try to clear all trash in your styles.

### Example

Your html(haml, jsx, js, etc) have only classes `.container`, `.row`, `col-12`:
```html
<div class="container">
  <div class="row">
    <div class="col-12">
      <h1>Hello!</h1>
    </div>
  </div>
</div>
```
But in styles you import all bootstrap grid
```scss
@import '~bootstrap/scss/grid';
```
In result you have 99% useless css code.
If you add this plugin to your `postcss` config in result you have only styles, that you use:

```css
.container {
  /* ...code... */
}
.row {
  /* ...code... */
}
.col-12 {
  /* ...code... */
}
@media screen and (max-width: 300px) {
    .container {
      /* ...code... */
    }
    .row {
      /* ...code... */
    }
    .col-12 {
      /* ...code... */
    }
}
/* etc */
```


## 1. Installation

```sh
npm i -D postcss-trash-killer
```
```sh
yarn add --save postcss-trash-killer
```

## 2. Configuration

After **install** add this plugin to your plugin 'pipeline'
```js
// postcss.config.js
const autoprefixer = require('autoprefixer');
const cssTrashKiller = require('postcss-trash-killer');

const configForCleaner = {
  tagSelectors: false, // default true, include all simple tag selectors(html, body, *, h1, but not `.className h1`
  fileExtensions: ['.haml', '.js'], // File types for scanning selectors
  paths: ['app/view/', 'some/second/path'], // Paths with your view files
  libs: ['slick-carousel'], // Include lib, who work with view and installed via npm(yarn) and located in node_modules in root dir
  libsExtension: ['.js'], // File types for libraries
  whitelist: ['dontTouchSelector'] // not removable selectors
};

module.exports = {
  plugins: [
    cssTrashKiller(configForCleaner),
    autoprefixer
  ]
}
```

## Note!
This plugin in addition remove empty media queries!
