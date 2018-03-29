import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { queryCate, queryChildDept, /* queryHospitalName, */query, create, update, remove, batchRemove, queryUser } from '../services/department'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'department',

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
    editable: false,
    valueCell: '',
    hospitalName: [],
    hospitalDept: [],
    isParent: true,
    deptLookUpVisible: false,
    deptLookData: [],
    selectedRows: [],
    deptPageVisible: false,
    cateList: [],
    setHospital: [],
    selectedCateRows: [],
    hospitalVisi: true,
  },

  reducers: {
    editHospital (state, action) {
      // const { selectedCateRows } = action.payload
      state.currentItem.hospitalName = action.payload.setHospital[0].name
      state.currentItem.hospitalCode = action.payload.setHospital[0].code
      // state.currentItem.hospitalLevelName = action.payload.setHospital[0].levelName
      return { ...state, ...action.payload }
    },
    queryCateSuccess (state, { payload }) {
      const { cateList, pagination } = payload
      return {
        ...state,
        cateList,
        pagination,
      }
    },
    updateCateState (state, action) {
      return { ...state, ...action.payload }
    },
    updateListState (state, action) {
      return { ...state, ...action.payload }
    },
    changeHospitalVisi (state, action) {
      if (action.payload === 1) {
        return { ...state, ...action.payload, hospitalVisi: true }
      } else {
        return { ...state, ...action.payload, hospitalVisi: false }
      }
    },
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
    deptPageVisible (state, action) {
      return { ...state, ...action.payload, deptPageVisible: true }
    },
    notDeptPageVisible (state, action) {
      return { ...state, ...action.payload, deptPageVisible: false }
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, total, pageNum, pageSize, content: data } = yield call(query, { ...payload })
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
              pageSize: Number(pageSize) || 20,
              current: Number(pageNum),
            },
          },
        })
      }
    },
    *queryCate ({ payload }, { call, put }) {
      const { success: successDept, data, total, pageSize, pageNum } = yield call(queryCate, { ...payload })
      if (successDept) {
        yield put({
          type: 'queryCateSuccess',
          payload: {
            cateList: data,
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
            hospitalDept: data.content,
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
            list: data[0] === null ? '' : data,
            pagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(pageNum),
            },
          },
        })
      }
    },
    *querySecondDept ({ payload }, { call, put }) {
      const { success, data, total, pageSize, pageNum } = yield call(queryChildDept, { ...payload })
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
    *updateSort ({ payload }, { call, put, select }) {
      const isParent = yield select(({ department }) => department.isParent)
      const { sort, record } = payload
      record.sort = sort
      const code = record.code
      const newUser = { code: code, name: record.name, description: record.description, sort: record.sort, parentCode: isParent ? 0 : record.pid }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        isParent ?
        yield put({ type: 'query' })
        :
        yield put({ type: 'queryChildDept', payload: { code: record.pid } })
      } else {
        throw data
      }
    },

  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/departments').exec(location.pathname)
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
          dispatch({
            type: 'queryDeptName',
            payload: {
              page: 1,
              size: 100,
            },
          })
        }
      })
    },
  },
})
