import { request, config } from '../utils'

const { api } = config
const { orderCancel, patients, remoteConsult, realDoc, remoteConsults, doctor, grantRoles, denyUser } = api

/**
 * 查询用户列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: remoteConsults,
    method: 'get',
    data: params,
  })
}
/**
 * 查询医生参照页
 * @param {*} params
 */
export async function queryDoc (params) {
  return request({
    url: realDoc, // remoteConsults,
    method: 'get',
    data: params,
  })
}
/**
 * 查询患者参照页
 * @param {*} params
 */
export async function queryPatient (params) {
  return request({
    url: patients,
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

/**
 * 批量删除用户
 * @param {*} params
 */
export async function batchRemove (params) {
  return request({
    url: remoteConsults,
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
    url: remoteConsult,
    method: 'put',
    data: params,
  })
}
/**
 * 修改医院名称
 * @param {*} params
 */
export async function updateHospitalName (params) {
  return request({
    url: doctor,
    method: 'POST',
    data: params,
  })
}
/**
 * 查询单个用户
 * @param {*} params
 */
export async function queryUser (params) {
  return request({
    url: remoteConsult,
    method: 'get',
    data: params,
  })
}

/**
 * 新增用户
 * @param {*} params
 */
export async function create (params) {
  return request({
    url: remoteConsults,
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
    url: doctor,
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
