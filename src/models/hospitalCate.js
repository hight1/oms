import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
// import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { queryChildDept, /* queryHospitalName, */query, create, update, remove, batchRemove, queryUser } from '../services/hospitalCate'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'hospitalCate',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    editable: false,
    valueCell: '',
    hospitalName: [],
    hospitalDept: [],
    isParent: true,
    lookUpValues: [],
  },

  reducers: {
    showCell (state, action) {
      return { ...state, ...action.payload, editable: true }
    },
    hideCell (state, action) {
      return { ...state, ...action.payload, editable: false }
    },
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
    editLookUpValues (state, action) {
      return { ...state, lookUpValues: action.payload }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showLookUpModal (state, action) {
      return { ...state, ...action.payload, lookupModalVisible: true }
    },
    hideLookUpModal (state) {
      return { ...state, lookupModalVisible: false }
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
  },

  effects: {
    *query ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, total, pageNum, pageSize, data } = yield call(query, { ...payload })
      if (success) {
        yield put({
          type: 'isParent',
        })
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            pagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(pageNum),
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
    // *queryHospitalName ({ payload }, { call, put }) {
    //   const data = yield call(queryHospitalName, payload)
    //   if (data.success) {
    //     yield put({
    //       type: 'queryValue',
    //       payload: {
    //         hospitalName: data.content,
    //       },
    //     })
    //   } else {
    //     message.error(`查询医院名称失败! ${data.message}`)
    //   }
    // },
    *queryDeptName ({ payload }, { call, put }) {
      const data = yield call(query, payload)
      if (data.success) {
        yield put({
          type: 'queryValue',
          payload: {
            hospitalDept: data.data,
          },
        })
      } else {
        message.error(`查询父级科室失败! ${data.message}`)
      }
    },
    *queryChildDept ({ payload }, { call, put }) {
      const { success, total, pageNum, pageSize, data } = yield call(queryChildDept, { ...payload })
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            pagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(pageNum),
            },
          },
        })
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
        message.success(data.message)
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        message.success(data.message)
        // yield put(
        //   routerRedux.push({
        //     pathname: '/hospital-cates',
        //   }),
        // )
      } else {
        throw data
      }
    },
    *update ({ payload }, { call, put }) {
      // const code = yield select(({ department }) => department.currentItem.code)
      // const newUser = { ...payload, code }
      const data = yield call(update, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        message.success(data.message)
      } else {
        throw data
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/hospital-cates').exec(location.pathname)
        // dispatch({
        //   type: 'query',
        //   payload: location.query,
        // })
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
          dispatch({
            type: 'isParent',
          })
          // dispatch({
          //   type: 'queryHospitalName',
          //   payload: {},
          // })
          // dispatch({
          //   type: 'queryDeptName',
          //   payload: {
          //     page: 1,
          //     size: 100,
          //   },
          // })
        }
      })
    },
  },
})
