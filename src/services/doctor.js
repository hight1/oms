import { request, config } from '../utils'

const { api } = config
const { titleList, rotateImg, tagTemplateList, fcSms, undoneDoctor, undoneDoc, realDoc, fakeDocES, realDocES, uploadTokenUrl, hospitals, offlineDoctor, departments, queryChildDepts, fakeDoctors, doctor, grantRoles, denyUser } = api

/**
 * 查询在线医生列表
 * @param {*} params
 */
export async function query (params) {
  return request({
    url: realDoc,
    method: 'get',
    data: params,
  })
}
/**
 * 查询离线医生列表
 * @param {*} params
 */
export async function queryFake (params) {
  return request({
    url: fakeDoctors,
    method: 'get',
    data: params,
  })
}
/**
 * 查询未完善医生列表
 * @param {*} params
 */
export async function queryUndone (params) {
  return request({
    url: undoneDoc,
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
 * 获取职称
 * @param {*} params
 */
export async function queryTitle (params) {
  return request({
    url: titleList,
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
 * 旋转图片
 * @param {*} params
 */
export async function getRotateImg (params) {
  return request({
    url: rotateImg,
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
    url: fakeDoctors,
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
    url: offlineDoctor,
    method: 'put',
    data: params,
  })
}
/**
 * 更新真医生
 * @param {*} params
 */
export async function updateRealDoctor (params) {
  return request({
    url: doctor,
    method: 'put',
    data: params,
  })
}
/**
 * 更新真医生
 * @param {*} params
 */
export async function updateUndoneDoctor (params) {
  return request({
    url: undoneDoctor,
    method: 'put',
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
 * 同步假医生到Es
 * @param {*} params
 */
export async function fakeDocsES (params) {
  return request({
    url: fakeDocES,
    method: 'post',
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
 * 查询医院
 * @param {*} params
 */
export async function queryHospital (params) {
  return request({
    url: hospitals,
    method: 'get',
    data: params,
  })
}
/**
 * 修改医院名称
 * @param {*} params
 */
export async function updateHospitalName (params) {
  return request({
    url: doctor,
    method: 'POST',
    data: params,
  })
}
/**
 * 查询单个假医生
 * @param {*} params
 */
export async function queryUser (params) {
  return request({
    url: offlineDoctor,
    method: 'get',
    data: params,
  })
}
/**
 * 查询单个真医生
 * @param {*} params
 */
export async function queryRealDoc (params) {
  return request({
    url: doctor,
    method: 'get',
    data: params,
  })
}
/**
 * 查询单个未完善医生
 * @param {*} params
 */
export async function queryUndoneDoc (params) {
  return request({
    url: undoneDoctor,
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
    url: fakeDoctors,
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

export async function sendFcSms (params) {
  return request({
    url: fcSms,
    method: 'post',
    data: params,
  })
}

