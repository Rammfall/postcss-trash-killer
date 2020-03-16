# This plugin will be kill your unused css

## Why do you need this?

Your css is increasing after each iteration? Coverage of pages smaller 5%? This plugin try to clear all trash in your styles.

## Installation

```bash
npm i -D postcss-trash-killer
```
```bash
yarn add --save postcss-trash-killer
```

## Configuration

After **install** add this plugin to your plugin 'pipeline'
```js
// postcss.config.js
const autoprefixer = require('autoprefixer');
const cssCleaner = require('postcss-trash-killer')

module.exports = {
  plugins: [
    cssCleaner,
    autoprefixer
  ]
}
```
