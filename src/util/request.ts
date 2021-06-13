import { extend } from 'umi-request'

const request = extend({
  prefix: 'https://service.ayue.wiki',
  timeout: 10000,
  mode: 'cors'
})

export default request
