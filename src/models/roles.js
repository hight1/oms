import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { query, create, remove, update, grant } from '../services/roles'
import { getLocalStorageJson, setLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {
  namespace: 'roles',
  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
  },
  reducers: {
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showModalGrant (state, action) {
      return { ...state, ...action.payload, modalGrantVisible: true }
    },
    hideModalGrant (state) {
      return { ...state, modalGrantVisible: false }
    },
    createSuccess (state, action) {
      return { ...state, ...action.payload }
    },
    deleteSuccess (state, action) {
      const id = action.payload
      const newList = state.list.filter(role => role.id !== id)
      return { ...state, list: newList }
    },
    updateSuccess (state, action) {
      const updateRole = action.payload
      const newList = state.list.map((role) => {
        if (role.id === updateRole.id) {
          return { ...role, ...updateRole }
        }
        return role
      })
      return { ...state, list: newList }
    },
    updateQueryKey (state, action) {
      return { ...state, ...action.payload }
    },
    grantSuccess (state, action) {
      const grantRole = action.payload
      const newList = state.list.map((role) => {
        if (role.id === grantRole.id) {
          role.permissionCodes = grantRole.permissionCodes
          return { ...role }
        }
        return role
      })
      return { ...state, ...newList }
    },
    operationFailed (state, action) {
      return { ...state, ...action.payload }
    },
  },
  effects: {
    *query ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalElements: total, number, size: pageSize, content: data } = yield call(query, parse({ ...payload, with: 'permissions' }))
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            pagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(number) + 1,
            },
          },
        })
      }
    },
    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({
          type: 'query',
        })
        localStorage.removeItem('roles')
        message.success('创建成功!')
      } else {
        message.error(`创建失败! ${data.message}`)
      }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data.success) {
        yield put({
          type: 'deleteSuccess',
          payload,
        })
        localStorage.removeItem('roles')
        message.success('删除成功!')
      } else {
        message.error(`删除失败! ${data.message}`)
      }
    },
    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ roles }) => roles.currentItem.id)
      const newRole = { ...payload, id }
      const data = yield call(update, newRole)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({
          type: 'updateSuccess',
          payload: newRole,
        })
        localStorage.removeItem('roles')
        message.success('更新成功!')
      }
    },
    *grant ({ payload }, { select, call, put }) {
      const id = yield select(({ roles }) => roles.currentItem.id)
      const newRole = { ...payload, id }
      const data = yield call(grant, newRole)
      if (data.success) {
        yield put({ type: 'hideModalGrant' })
        yield put({
          type: 'grantSuccess',
          payload: {
            id,
            ...payload,
          },
        })
        message.success('授权成功!')
      }
    },
    *updateCache ({ payload }, { call }) {
      const data = yield call(query, parse({ ...payload, pageSize: 10000 }))
      if (data.success) {
        setLocalStorageJson('roles', data.content)
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/roles').exec(location.pathname)
        if (match) {
          const data = getLocalStorageJson('permissions')
          if (!data) {
            dispatch({
              type: 'permissions/updateCache',
            })
          }
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
})
