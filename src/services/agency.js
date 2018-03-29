import { request, config } from '../utils'

const { api } = config
const { deleAgenArea, agenArea, agenAreas, agency, agencies, hospitalCates } = api

/**
 * 查询用户列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: agencies,
    method: 'get',
    data: params,
  })
}
/**
 * 查询代理商区县
 * @param {*} params
 */
export async function queryArea (params) {
  return request({
    url: agenAreas,
    method: 'get',
    data: params,
  })
}
/**
 * 添加代理商区县
 * @param {*} params
 */
export async function addArea (params) {
  return request({
    url: agenArea,
    method: 'POST',
    data: params,
  })
}

/**
 * 批量删除用户
 * @param {*} params
 */
export async function batchRemove (params) {
  return request({
    url: hospitalCates,
    method: 'delete',
    data: params,
  })
}

/**
 * 更新用户信息
 * @param {*} params
 */
export async function update (params) {
  return request({
    url: agency,
    method: 'put',
    data: params,
  })
}

/**
 * 新增用户
 * @param {*} params
 */
export async function create (params) {
  return request({
    url: agencies,
    method: 'post',
    data: params,
  })
}
/**
 * 查询单个用户
 * @param {*} params
 */
export async function queryUser (params) {
  return request({
    url: agency,
    method: 'get',
    data: params,
  })
}

/**
 * 删除单个用户
 * @param {*} params
 */
export async function remove (params) {
  return request({
    url: agency,
    method: 'delete',
    data: params,
  })
}

/**
 * 代理商区县
 * @param {*} params
 */
export async function removeArea (params) {
  return request({
    url: deleAgenArea,
    method: 'delete',
    data: params,
  })
}
