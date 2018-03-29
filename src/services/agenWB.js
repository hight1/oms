import { request, config } from '../utils'

const { api } = config
const { agenWB, dealWithdrawBill, agenMultiWB } = api

/**
 * 查询提现列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: agenWB,
    method: 'get',
    data: params,
  })
}

/**
 * 提现单个订单
 * @param {*} params
 */
export async function withdrawBill (params) {
  return request({
    url: dealWithdrawBill,
    method: 'POST',
    data: params,
  })
}
/**
 * 提现批量订单
 * @param {*} params
 */
export async function multiWithdrawBill (params) {
  return request({
    url: agenMultiWB,
    method: 'POST',
    data: params,
  })
}
