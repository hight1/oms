import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
// import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { removeArea, addArea, queryArea, query, create, update, remove, batchRemove, queryUser } from '../services/agency'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'agency',

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
    rank: 1,
    currentArea: [],
    areaName: '',
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
    clearState (state, action) {
      return { ...state, ...action.payload }
    },
    changeArea (state, action) {
      console.log(action.payload.areaName)
      return { ...state, areaName: action.payload.areaName }
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalElements: total, number: pageNum, size: pageSize, content: data } = yield call(query, { ...payload })
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
    *queryArea ({ payload }, { call, put }) {
      const data = yield call(queryArea, payload)
      console.log(data)
      if (data.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentArea: data.data,
          },
        })
      } else {
        message.error(`查询失败! ${data.message}`)
      }
    },
    *addArea ({ payload }, { call, put }) {
      const data = yield call(addArea, payload)
      if (data.success) {
        message.success('添加成功！')
        yield put({
          type: 'queryArea',
          payload: {
            code: payload.code,
          },
        })
      } else {
        message.error(`添加失败! ${data.message}`)
      }
    },
    *deleteArea ({ payload }, { call, put }) {
      const data = yield call(removeArea, payload)
      if (data.success) {
        yield put({
          type: 'queryArea',
          payload: {
            code: payload.code,
          },
        })
      } else {
        throw data
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
        const match = pathToRegexp('/agencies').exec(location.pathname)
        const match2 = pathToRegexp('/agencies/edit/:code').exec(location.pathname)
        // dispatch({
        //   type: 'query',
        //   payload: location.query,
        // })
        if (match2) {
          dispatch({
            type: 'clearState',
            payload: { currentItem: {}, currentArea: [] },
          })
          if (match2[1] !== null) {
            if (!match2[1] || match2[1] === 'new') {
              return true
            }
            dispatch({
              type: 'edit',
              payload: {
                code: match2[1],
              },
            })
            dispatch({
              type: 'queryArea',
              payload: {
                code: match2[1],
              },
            })
          }
        }
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
              rank: 1,
            },
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
