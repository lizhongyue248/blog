import { extend } from 'umi-request'

const request = extend({
  timeout: 10000,
  getResponse: true,
  mode: 'cors'
})

export default request
