import { request, config } from '../utils'

const { api } = config
const { cancelDics, setDics, hotKeywords, createDepartment, queryChildDepts, hospitals, department, departments, grantRoles, denyUser } = api

/**
 * 查询用户列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: hotKeywords,
    method: 'get',
    data: params,
  })
}
/**
 * 标记热词为分词
 * @param {*} params
 */
export async function setDic (params) {
  return request({
    url: setDics,
    method: 'post',
    data: params,
  })
}
/**
 * 取消热词为分词
 * @param {*} params
 */
export async function cancelDic (params) {
  return request({
    url: cancelDics,
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
    url: createDepartment,
    method: 'delete',
    data: params,
  })
}
/**
 * 查看医院
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
 * 更新用户信息
 * @param {*} params
 */
export async function update (params) {
  return request({
    url: department,
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
    url: createDepartment,
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
    url: department,
    method: 'get',
    data: params,
  })
}
/**
 * 查询医院名称
 * @param {*} params
 */
export async function queryHospitalName (params) {
  return request({
    url: hospitals,
    method: 'get',
    data: params,
  })
}
/**
 * 查询一级科室名称
 * @param {*} params
 */
export async function queryHospitalDept (params) {
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
