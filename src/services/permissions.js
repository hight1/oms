import { request, config } from '../utils'

const { api } = config
const { permissions, permission } = api

/**
 * 查询角色列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: permissions,
    method: 'get',
    data: params,
  })
}

/**
 * 创建角色
 * @param {*} params
 */
export async function create (params) {
  return request({
    url: permissions,
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
    url: permission,
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
    url: permission,
    method: 'PATCH',
    data: params,
  })
}
