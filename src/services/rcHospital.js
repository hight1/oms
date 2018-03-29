import { request, config } from '../utils'

const { api } = config
const { hospitals, rcHospitals, rcHospital, uploadTokenUrl, fakeDoctors, grantRoles, denyUser } = api


/**
 * 查询rcHospital列表详情
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: rcHospitals,
    method: 'get',
    data: params,
  })
}
/**
/**
 * 查询rcHospital列表详情
 * @param {*} params
 */
export async function queryHosi (params) {
  return request({
    url: hospitals,
    method: 'get',
    data: params,
  })
}
/**
 * 查询模板详情
 * @param {*} params
 */
export async function queryRC (params) {
  return request({
    url: rcHospital,
    method: 'get',
    data: params,
  })
}
/**
 * 修改模板详情
 * @param {*} params
 */
export async function updateRC (params) {
  return request({
    url: rcHospital,
    method: 'put',
    data: params,
  })
}
/**
 * 新增模板详情
 * @param {*} params
 */
export async function createRC (params) {
  return request({
    url: rcHospitals,
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
    url: rcHospitals,
    method: 'delete',
    data: params,
  })
}

/**
 * 删除单个用户
 * @param {*} params
 */
export async function remove (params) {
  return request({
    url: fakeDoctors,
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

