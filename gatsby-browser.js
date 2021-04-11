/* eslint-disable @typescript-eslint/no-var-requires */
require('./src/styles/global.css')

const clearCache = require('clear-cache')

module.exports.wrapRootElement = require('./gatsby-ssr').wrapRootElement

exports.onServiceWorkerUpdateFound = () => {
  const body = document.getElementsByTagName('body')[0]
  const div = document.createElement('div')
  div.classList.add('w-64', 'fixed', 'opacity-0', 'update-tip')
  const tip = document.createElement('div')
  tip.innerText = '博客的内容已经更新啦~🎉 点击确认进行更新叭~'
  const action = document.createElement('div')
  action.classList.add('w-full', 'text-right', 'pt-5', 'pr-2', 'cursor-pointer', 'text-blue-300', 'hover:text-blue-500')
  action.innerText = '🧐 点我刷新'
  action.onclick = () => { clearCache.clearCache(true) }
  div.appendChild(tip)
  div.appendChild(action)
  body.appendChild(div)
  setTimeout(() => { div.classList.add('opacity-100') }, 1500)
}
