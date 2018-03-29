import { request, config } from '../utils'

const { api } = config
const { newHospitalCate, hospitalCate, hospitalCates, department } = api

/**
 * 查询用户列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: hospitalCates,
    method: 'get',
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
    url: hospitalCate,
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
    url: newHospitalCate,
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
    url: hospitalCate,
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
    url: department,
    method: 'delete',
    data: params,
  })
}
