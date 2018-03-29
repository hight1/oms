import { request, config } from '../utils'

const { api } = config
const { realDocES, tagTemplateList, queryChildDepts, departments, hospitals, vcPrice, secondDept, searchHospital, parentDept, verifyDoctor, grantRoles, denyUser, doctorVerify, doctorVerifys } = api

/**
 * 查询用户列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: doctorVerifys,
    method: 'get',
    data: params,
  })
}
/**
 * 同步真医生到Es
 * @param {*} params
 */
export async function realDocsES (params) {
  return request({
    url: realDocES,
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
    url: doctorVerifys,
    method: 'delete',
    data: params,
  })
}
/**
 * 查询医院名称
 * @param {*} params
 */
export async function queryHospitalName (params) {
  return request({
    url: searchHospital,
    method: 'get',
    data: params,
  })
}
/**
 * 查询科室名称
 * @param {*} params
 */
export async function queryParentDept (params) {
  return request({
    url: parentDept,
    method: 'get',
    data: params,
  })
}
/**
 * 查询二级科室名称
 * @param {*} params
 */
export async function queryDeptName (params) {
  return request({
    url: secondDept,
    method: 'get',
    data: params,
  })
}
/**
 * 查询价格名称
 * @param {*} params
 */
export async function queryVcPrice (params) {
  return request({
    url: vcPrice,
    method: 'get',
    data: params,
  })
}
/**
 * 查询失败标签
 * @param {*} params
 */
export async function queryTag (params) {
  return request({
    url: tagTemplateList,
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
    url: verifyDoctor,
    method: 'POST',
    data: params,
  })
}

/**
 * 审查单个用户
 * @param {*} params
 */
export async function verifyUser (params) {
  return request({
    url: doctorVerify,
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
 * 查询单个用户
 * @param {*} params
 */
export async function queryUser (params) {
  return request({
    url: doctorVerify,
    method: 'get',
    data: params,
  })
}
/**
 * 查看医院分类
 * @param {*} params
 */
export async function queryCate (params) {
  return request({
    url: hospitals,
    method: 'get',
    data: params,
  })
}
/**
 * 查询一级科室列表
 * @param {*} params
 */
export async function queryDept (params) {
  return request({
    url: departments,
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
    url: doctorVerifys,
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
    url: doctorVerify,
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
