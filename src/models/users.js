import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { query, queryUser, create, update, deny, grant, remove, batchRemove } from '../services/users'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'users',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    titles: [],
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
    deleteSuccess () { },
    updateSuccess (state, action) {
      const newUser = action.payload
      const newList = state.list.map((user) => {
        if (user.id === newUser.id) {
          return { ...user, ...newUser }
        }
        return user
      })
      return { ...state, list: newList }
    },
    updateQueryKey (state, action) {
      return { ...state, ...action.payload }
    },
    denySuccess (state, action) {
      const { id, enable } = action.payload
      const newList = state.list.map((user) => {
        if (user.id === id) {
          user.enabled = enable
          return { ...user }
        }
        return user
      })
      return { ...state, list: newList, loading: false }
    },
    grantSuccess (state, action) {
      const grantUser = action.payload
      const newList = state.list.map((user) => {
        if (user.id === grantUser.id) {
          user.roleCodes = grantUser.roleCodes
          return { ...user }
        }
        return user
      })
      return { ...state, ...newList, loading: false }
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalElements: total, number, size: pageSize, content: data } = yield call(query, parse({ ...payload }))
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
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *'multiDelete' ({ payload }, { call, put }) {
      const data = yield call(batchRemove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *edit ({ payload }, { call, put }) {
      const data = yield call(queryUser, payload)
      if (data.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: data,
          },
        })
      } else {
        message.error(`查询失败! ${data.message}`)
      }
    },
    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *update ({ payload }, { call, put, select }) {
      const id = yield select(({ users }) => users.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *deny ({ payload }, { call, put }) {
      const data = yield call(deny, parse(payload))
      if (data.success) {
        yield put({
          type: 'denySuccess',
          payload,
        })
        message.success('操作成功!')
      } else {
        message.error(`操作失败! ${data.message}`)
      }
    },
    *grant ({ payload }, { select, call, put }) {
      const id = yield select(({ users }) => users.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(grant, newUser)
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
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/users').exec(location.pathname)
        if (match) {
          const data = getLocalStorageJson('roles')
          if (!data) {
            dispatch({
              type: 'roles/updateCache',
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
