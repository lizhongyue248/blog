/* eslint-disable @typescript-eslint/no-var-requires */
const { createElement } = require('react')
const { RecoilRoot } = require('recoil')

module.exports.wrapRootElement = ({ element }) =>
  createElement(RecoilRoot, null, element)
