/**
 * @type {{regex: RegExp, regexForBrackets: RegExp}}
 */
const config = {
  regex: /[^\da-zA-Z\-_]/g,
  regexForAttributeSelector: /(.*)\[+(.)+[*$~]+=+(.)+]+(.*)/
};

module.exports = config;
