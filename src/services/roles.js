import { request, config } from '../utils'

const { api } = config
const { roles, role, grantPermissions } = api

/**
 * 查询角色列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: roles,
    method: 'get',
    data: params,
  })
}

/**
 * 新增角色
 * @param {*} params
 */
export async function create (params) {
  return request({
    url: roles,
    method: 'post',
    data: params,
  })
}

/**
 * 删除角色
 * @param {*} params
 */
export async function remove (params) {
  return request({
    url: role,
    method: 'delete',
    data: params,
  })
}

/**
 * 修改角色
 * @param {*} params
 */
export async function update (params) {
  return request({
    url: role,
    method: 'PATCH',
    data: params,
  })
}

/**
 * 分配权限
 * @param {*} params
 */
export async function grant (params) {
  return request({
    url: grantPermissions,
    method: 'post',
    data: params,
  })
}
