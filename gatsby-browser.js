/* eslint-disable @typescript-eslint/no-var-requires */
require('./src/styles/global.css')

module.exports.wrapRootElement = require('./gatsby-ssr').wrapRootElement

exports.onServiceWorkerUpdateFound = () => {
  if (
    window.confirm(
      '此网站已使用新数据进行了更新。是否要重新加载站点以获取新数据？'
    )
  ) {
    window.location.reload(true)
  }
}
