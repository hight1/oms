import { request, config } from '../utils'

const { api } = config
const { orderCancel, videoOrder, doctor, videoOrders } = api

/**
 * 查询视频订单
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: videoOrders,
    method: 'get',
    data: params,
  })
}
/**
 * 更新用户信息
 * @param {*} params
 */
export async function update (params) {
  return request({
    url: doctor,
    method: 'get',
    data: params,
  })
}
/**
 * 查询单个用户
 * @param {*} params
 */
export async function queryVideoOrder (params) {
  return request({
    url: videoOrder,
    method: 'get',
    data: params,
  })
}

export async function cancelOrd (params) {
  return request({
    url: orderCancel,
    method: 'post',
    data: params,
  })
}
