import { request, config } from '../utils'

const { api } = config
const { user, userInfo, userPassword } = api

/**
 * 获取本人信息
 */
export async function query () {
  return request({
    url: userInfo,
    method: 'get',
  })
}

/**
 * 修改用户信息
 * @param {*} params
 */
export async function update (params) {
  return request({
    url: user,
    method: 'PATCH',
    data: params,
  })
}

/**
 * 修改密码
 * @param {*} params
 */
export async function password (params) {
  return request({
    url: userPassword,
    method: 'PATCH',
    data: params,
  })
}
