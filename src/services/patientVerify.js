import { request, config } from '../utils'

const { api } = config
const { verifyPatient, patientVerifys, patientVerify, grantRoles } = api

/**
 * 查询用户列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: patientVerifys,
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
    url: patientVerifys,
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
    url: patientVerify,
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
    url: verifyPatient,
    method: 'POST',
    data: params,
  })
}

/**
 * 新增用户
 * @param {*} params
 */
export async function create (params) {
  return request({
    url: patientVerifys,
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
    url: patientVerify,
    method: 'delete',
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
