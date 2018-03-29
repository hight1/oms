import { request, config } from '../utils'

const { api } = config
const { password, userInfo, userLogout, userLogin } = api

/**
 * 登陆
 * @param {*} params
 */
export async function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

/**
 * 退出登陆，服务器端清除cookie
 * @param {*} params
 */
export async function logout (params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

/**
 * 基于cookie查询当前登录用户信息
 * 可用于检测是否登录
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: userInfo,
    method: 'get',
    data: params,
  })
}

/**
 * 个人中心修改密码
 * @param {*} params
 */
export async function updateCenter (params) {
  return request({
    url: password,
    method: 'put',
    data: params,
  })
}
