/* eslint-disable @typescript-eslint/no-var-requires */
require('./src/styles/global.css')

const clearCache = require('clear-cache')

module.exports.wrapRootElement = require('./gatsby-ssr').wrapRootElement

exports.onServiceWorkerUpdateFound = () => {
  const body = document.getElementsByTagName('body')[0]
  const div = document.createElement('div')
  div.classList.add('w-64', 'fixed', 'opacity-0')
  div.style.color = '#fff'
  div.style.display = 'flex'
  div.style.padding = '6px 16px'
  div.style.transition = 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  div.style.flexGrow = '1'
  div.style.flexWrap = 'wrap'
  div.style.fontSize = '0.875rem'
  div.style.alignItems = 'center'
  div.style.fontWeight = '400'
  div.style.lineHeight = '1.43'
  div.style.borderRadius = '4px'
  div.style.right = '15px'
  div.style.bottom = '15px'
  div.style.minWidth = '350px'
  div.style.padding = '16px'
  div.style.boxShadow = '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)'
  div.style.zIndex = '99999'
  div.style.backgroundColor = 'rgb(50, 50, 50)'
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
