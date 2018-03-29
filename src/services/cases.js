import { request, config } from '../utils'

const { api } = config
const { uploadTokenUrl, department, HospitalSpecial, region, HospitalLevel, grantRoles, denyUser, hospital, hospitals, HospitalRank, HospitalCategory, verifyHospital } = api

/**
 * 查询用户列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: hospitals,
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
    url: hospitals,
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
    url: hospital,
    method: 'patch',
    data: params,
  })
}

/**
 * 查询单个用户
 * @param {*} params
 */
export async function queryUser (params) {
  return request({
    url: hospital,
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
    url: hospitals,
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
    url: hospital,
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
export async function queryHospitalRank (params) {
  return request({
    url: HospitalRank,
    method: 'get',
    data: params,
  })
}
export async function queryHospitalCategory (params) {
  return request({
    url: HospitalCategory,
    method: 'get',
    data: params,
  })
}
export async function queryHospitalLevel (params) {
  return request({
    url: HospitalLevel,
    method: 'get',
    data: params,
  })
}
export async function queryHospitalSpecial (params) {
  return request({
    url: HospitalSpecial,
    method: 'get',
    data: params,
  })
}
export async function getHospitalSpecial (params) {
  return request({
    url: department,
    method: 'get',
    data: params,
  })
}
export async function queryHospitalRegion (params) {
  return request({
    url: region,
    method: 'get',
    data: params,
  })
}
/**
 * 审查用户
 * @param {*} params
 */
export async function verify (params) {
  return request({
    url: verifyHospital,
    method: 'POST',
    data: params,
  })
}
/**
 * 获取七牛上传TOKEN
 */
export async function getUploadToken (params) {
  return request({
    url: uploadTokenUrl,
    method: 'get',
    data: params,
  })
}
