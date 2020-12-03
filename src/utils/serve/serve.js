/* eslint-disable no-unused-vars */
import createServe from './createServe'  //返回axios的请求数据方法

const Serve = {};


export default Serve;

function handleSearchParams (params) {
  let validParams = {}
  if (params) {
    for (let key in params) {
      if (params[key] || params[key] === 0 || params[key] === false) {
        validParams[key] = params[key]
      }
    }
  }
  return validParams
}