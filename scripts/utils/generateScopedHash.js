/* eslint-disable  @typescript-eslint/no-var-requires */
const crypto = require('crypto')

module.exports = generateScopedHash = (localName, resourcePath) => {
  const getHash = value =>
    crypto.createHash('sha256').update(value).digest('hex')
  const hash = getHash(`${resourcePath}${localName}`).slice(0, 8)
  return `${localName}__${hash}`
}
