import { request, config } from '../utils'

const { api } = config
const { tagTemplateList, realDocES, vcPrice, doctorTitleVerify, doctorTitle, doctorTitles, grantRoles, denyUser } = api

/**
 * 查询用户列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: doctorTitles,
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
    url: doctorTitles,
    method: 'delete',
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
 * 更新用户信息
 * @param {*} params
 */
export async function update (params) {
  return request({
    url: doctorTitleVerify,
    method: 'POST',
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
 * 查询单个用户
 * @param {*} params
 */
export async function queryDoctorTitle (params) {
  return request({
    url: doctorTitle,
    method: 'get',
    data: params,
  })
}
/**
 * 查询价格
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
 * 新增用户
 * @param {*} params
 */
export async function create (params) {
  return request({
    url: doctorTitle,
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
    url: doctorTitle,
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
