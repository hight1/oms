import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { query, create, remove, update } from '../services/permissions'
import { setLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {
  namespace: 'permissions',
  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
  },
  reducers: {
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    createSuccess (state, action) {
      return { ...state, ...action.payload }
    },
    deleteSuccess (state, action) {
      const id = action.payload
      const newList = state.list.filter(permission => permission.id !== id)
      return { ...state, list: newList }
    },
    updateSuccess (state, action) {
      const updateRole = action.payload
      const newList = state.list.map((permission) => {
        if (permission.id === updateRole.id) {
          return { ...permission, ...updateRole }
        }
        return permission
      })
      return { ...state, list: newList }
    },
    updateQueryKey (state, action) {
      return { ...state, ...action.payload }
    },
  },
  effects: {
    *query ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalElements: total, number, size: pageSize, content: data } = yield call(query, parse(payload))
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
        localStorage.removeItem('permissions')
        message.success('创建成功!')
      } else {
        message.error(`创建失败! ${data.err_msg}`)
      }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data.success) {
        yield put({
          type: 'deleteSuccess',
          payload,
        })
        localStorage.removeItem('permissions')
        message.success('删除成功!')
      } else {
        message.error(`删除失败! ${data.err_msg}`)
      }
    },
    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ permissions }) => permissions.currentItem.id)
      const newRole = { ...payload, id }
      const data = yield call(update, newRole)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({
          type: 'updateSuccess',
          payload: newRole,
        })
        localStorage.removeItem('permissions')
        message.success('更新成功!')
      }
    },
    *updateCache ({ payload }, { call }) {
      const data = yield call(query, parse({ ...payload, pageSize: 10000 }))
      if (data.success) {
        setLocalStorageJson('permissions', data.content)
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/permissions').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
})
