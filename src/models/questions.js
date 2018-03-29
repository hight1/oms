import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { query, create, update, remove, batchRemove, queryUser } from '../services/questions'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'questions',

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
    status: 0,
    type: 1,
  },

  reducers: {
    changeCurItem (state, action) {
      return { ...state, currentItem: action.payload.item }
    },
    changeType (state, action) {
      return { ...state, type: action.payload.type }
    },
    changeStatus (state, action) {
      return { ...state, status: action.payload.status }
    },
    queryCellValue (state, action) {
      return { ...state, ...action.payload }
    },
    queryValue (state, action) {
      return { ...state, ...action.payload }
    },
    changeMe (state, action) {
      return { ...state, ...action.payload, me: action.payload.me }
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
      const { success, totalElements: total, number: page, size: pageSize, content: data } = yield call(query, { ...payload })
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
    *edit ({ payload }, { call, select }) {
      const me = yield select(({ orderCancel }) => orderCancel.me)
      const data = yield call(queryUser, { ...payload, uid: me })
      if (data.success) {
        message.success(`${data.message}`)
      } else {
        message.error(`查询失败! ${data.message}`)
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
    *update ({ payload }, { call, put }) {
      const data = yield call(update, { ...payload })
      if (data.success) {
        yield put({ type: 'hideModal' })
        message.success('回复成功！')
      } else {
        throw data
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/questions').exec(location.pathname)
        if (match) {
          const data = getLocalStorageJson('roles')
          if (!data) {
            dispatch({
              type: 'roles/updateCache',
            })
          }
          dispatch({
            type: 'query',
            payload: {
              status: 0,
              page: 1,
              pageSize: 20,
              type: 1,
            },
          })
        }
      })
    },
  },
})
