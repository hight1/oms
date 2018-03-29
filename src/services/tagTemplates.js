import { request, config } from '../utils'

const { api } = config
const { updatetag, tag, tagTemplateList, tagTemplates, uploadTokenUrl, fakeDoctors, grantRoles, denyUser } = api

/**
 * 查询审核失败原因
 * @param {*} params
 */
export async function queryTabs (params) {
  return request({
    url: tagTemplates,
    method: 'get',
    data: params,
  })
}

/**
 * 查询列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: tagTemplateList,
    method: 'get',
    data: params,
  })
}
/**
 * 查询模板详情
 * @param {*} params
 */
export async function queryTag (params) {
  return request({
    url: tag,
    method: 'get',
    data: params,
  })
}
/**
 * 修改模板详情
 * @param {*} params
 */
export async function updateTag (params) {
  return request({
    url: updatetag,
    method: 'put',
    data: params,
  })
}
/**
 * 新增模板详情
 * @param {*} params
 */
export async function createTag (params) {
  return request({
    url: tagTemplates,
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
    url: tagTemplates,
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

