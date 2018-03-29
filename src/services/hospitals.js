import { request, config } from '../utils'

const { api } = config
const { fakeDoctors, realDoc, hospitalES, hospitalCates, queryChildDepts, departments, uploadTokenUrl, department, hospitalSpecial, region, hospitalLevel, grantRoles, denyUser, hospital, hospitals, hospitalRank, hospitalCategory, verifyHospital } = api

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
    method: 'put',
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
 * 同步至ES
 * @param {*} params
 */
export async function toHospitalES (params) {
  return request({
    url: hospitalES,
    method: 'post',
    data: params,
  })
}
/**
 * 查看医院分类
 * @param {*} params
 */
export async function queryCate (params) {
  return request({
    url: hospitalCates,
    method: 'get',
    data: params,
  })
}
/**
 * 查找真医生列表
 * @param {*} params
 */
export async function queryTrueDoc (params) {
  return request({
    url: realDoc,
    method: 'get',
    data: params,
  })
}
/**
 * 查找假医生列表
 * @param {*} params
 */
export async function queryFalseDoc (params) {
  return request({
    url: fakeDoctors,
    method: 'get',
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
    url: hospitalRank,
    method: 'get',
    data: params,
  })
}
export async function queryHospitalCategory (params) {
  return request({
    url: hospitalCategory,
    method: 'get',
    data: params,
  })
}
export async function queryHospitalLevel (params) {
  return request({
    url: hospitalLevel,
    method: 'get',
    data: params,
  })
}
export async function queryHospitalSpecial (params) {
  return request({
    url: hospitalSpecial,
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
export async function queryDept (params) {
  return request({
    url: departments,
    method: 'get',
    data: params,
  })
}
/**
 * 查询子科室
 * @param {*} params
 */
export async function queryChildDept (params) {
  return request({
    url: queryChildDepts,
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
