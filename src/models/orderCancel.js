import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { queryUser } from '../services/orderCancel'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'orderCancel',

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
    changeMe (state, action) {
      return { ...state, ...action.payload, me: action.payload.me }
    },
    change (state, action) {
      return { ...state, ...action.payload }
    },
  },

  effects: {
    *edit ({ payload }, { call }) {
      const data = yield call(queryUser, { ...payload })
      if (data.success) {
        message.success(`${data.message}`)
      } else {
        message.error(`查询失败! ${data.message}`)
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/order-cancel').exec(location.pathname)
        if (match) {
          const data = getLocalStorageJson('roles')
          if (!data) {
            dispatch({
              type: 'roles/updateCache',
            })
          }
        }
      })
    },
  },
})
