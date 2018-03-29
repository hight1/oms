import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { multiWithdrawBill, query, withdrawBill } from '../services/withdrawBills'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'withdrawBills',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    withdrawModalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    titles: [],
    confirmLoading: true,
  },

  reducers: {
    confirmLoading (state, action) {
      return { ...state, ...action.payload }
    },
    querySelectValue (state, action) {
      return { ...state, ...action.payload }
    },
    selectChange (state, action) {
      return { ...state, ...action.payload }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    showWithdrawModal (state, action) {
      return { ...state, ...action.payload, withdrawModalVisible: true }
    },
    hideWithdrawModal (state, action) {
      return { ...state, ...action.payload, withdrawModalVisible: false }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    deleteSuccess () { },
    updateSuccess (state, action) {
      const newUser = action.payload
      const newList = state.list.map((withdrawBills) => {
        if (withdrawBills.id === newUser.id) {
          return { ...withdrawBills, ...newUser }
        }
        return withdrawBills
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
      const { success, totalCount: total, page, pageSize, data } = yield call(query, { ...payload })
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            pagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(page),
            },
          },
        })
      }
    },
    *clickWithdraw ({ payload }, { put, select }) {
      const list = yield select(({ withdrawBills }) => withdrawBills.list)
      const { code } = payload
      let data
      list.map((val) => {
        val.code === code ? data = val : ''
        return true
      })
      if (data) {
        yield put({
          type: 'showWithdrawModal',
          payload: {
            currentItem: data,
          },
        })
      } else {
        message.error(`无法打开! ${data.message}`)
      }
    },
    *withdraw ({ payload }, { call, put }) {
      const data = yield call(withdrawBill, payload)
      if (data.success) {
        yield put({
          type: 'hideWithdrawModal',
          payload: {
            currentItem: data,
          },
        })
        yield put({ type: 'query' })
      } else {
        message.error(`提现失败! ${data.message}`)
      }
    },
    *multiWithdraw ({ payload }, { call, put }) {
      if (payload.withdrawBillNoList.length === 0) {
        message.warning('批量提现不能为空！！！')
        return false
      }
      const data = yield call(multiWithdrawBill, payload)
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        message.error(`批量提现失败! ${data.message}`)
      }
    },

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/withdraw-bills').exec(location.pathname)
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
