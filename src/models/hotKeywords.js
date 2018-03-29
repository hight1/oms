import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { cancelDic, setDic, /* queryCate, queryChildDept,  queryHospitalName, */query, create, update, remove, batchRemove, queryUser } from '../services/hotKeywords'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'hotKeywords',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    selectedRowKeys1: [],
    modalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    selectedRows: [],
  },

  reducers: {

    queryCellValue (state, action) {
      return { ...state, ...action.payload }
    },
    queryValue (state, action) {
      return { ...state, ...action.payload }
    },
    change (state, action) {
      return { ...state, ...action.payload }
    },
    selectChange (state, action) {
      return { ...state, ...action.payload }
    },
    isNotParent (state, action) {
      return { ...state, ...action.payload, isParent: false }
    },
    isParent (state, action) {
      return { ...state, ...action.payload, isParent: true }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showLookUpModal (state) {
      return { ...state, deptLookUpVisible: true }
    },
    hideLookUpModal (state) {
      return { ...state, deptLookUpVisible: false }
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
    querySecondDeptSuccess (state, action) {
      return { ...state, ...action.payload }
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalCount: total, page, pageSize, data } = yield call(query, { ...payload })
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            pagination: {
              total,
              pageSize: Number(pageSize) || 20,
              current: Number(page),
            },
          },
        })
      }
    },
    *edit ({ payload }, { call, put }) {
      yield put({
        type: 'queryDeptName',
      })
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
    *setDic ({ payload }, { call, put }) {
      const data = yield call(setDic, payload)
      if (data.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: data,
          },
        })
        message.success('标记为分词成功！')
        yield put({
          type: 'query',
         //  payload: location.query,
        })
      } else {
        message.error(`操作失败! ${data.message}`)
      }
    },
    *cancelDic ({ payload }, { call, put }) {
      const data = yield call(cancelDic, payload)
      if (data.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: data,
          },
        })
        message.success('成功取消分词！')
        yield put({
          type: 'query',
         //  payload: location.query,
        })
      } else {
        message.error(`操作失败! ${data.message}`)
      }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { code: payload })
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
    *create ({ payload }, { call, put, select }) {
      const isParent = yield select(({ department }) => department.isParent)
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        isParent ?
        yield put({ type: 'query' })
        :
        yield put({ type: 'queryChildDept', payload: { code: payload.parentCode } })
        yield put(routerRedux.push({
          pathname: '/departments',
        }))
      } else {
        throw data
      }
    },
    *update ({ payload }, { call, put, select }) {
      const code = yield select(({ department }) => department.currentItem.code)
      // const isParent = yield select(({ department }) => department.isParent)
      // const { parentCode } = payload
      const newUser = { ...payload, code }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put(routerRedux.push({
          pathname: '/departments',
        }))
        // yield put({ type: 'hideModal' })
        // yield put({ type: 'query' })
        // isParent ?
        // yield put({ type: 'query' })
        // :
        // yield put({ type: 'queryChildDept', payload: { code: parentCode } })
      } else {
        throw data
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/hot-keywords').exec(location.pathname)
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
