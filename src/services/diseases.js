import { request, config } from '../utils'

const { api } = config
const { queryChildDepts, diseases, disease, grantRoles, denyUser } = api

/**
 * 查询用户列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: diseases,
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
    url: diseases,
    method: 'delete',
    data: params,
  })
}

/**
 * 查询单个用户
 * @param {*} params
 */
export async function queryUser (params) {
  return request({
    url: disease,
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
    url: disease,
    method: 'PATCH',
    data: params,
  })
}

/**
 * 新增用户
 * @param {*} params
 */
export async function create (params) {
  return request({
    url: diseases,
    method: 'post',
    data: params,
  })
}

/**
 * 删除单个用户
 * @param {*} params
 */
export async function remove (params) {
  return request({
    url: disease,
    method: 'delete',
    data: params,
  })
}

/**
 * 撤销角色
 * @param {*} params
 */
export async function deny (params) {
  return request({
    url: denyUser,
    method: 'post',
    data: params,
  })
}

/**
 * 分配角色
 * @param {*} params
 */
export async function grant (params) {
  return request({
    url: grantRoles,
    method: 'post',
    data: params,
  })
}

export async function queryHospitalSpecial (params) {
  return request({
    url: queryChildDepts,
    method: 'get',
    data: params,
  })
}
