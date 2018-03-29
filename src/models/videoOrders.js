import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { cancelOrd, queryVideoOrder, query } from '../services/videoOrders'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'videoOrders',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    orderStatus: ['00'],
    bizType: ' ',
    updateStartTime: '',
    updateEndTime: '',

  },

  reducers: {
    changeStatus (state, action) {
      return { ...state, ...action.payload, orderStatus: action.payload.orderStatus }
    },
    changeType (state, action) {
      return { ...state, ...action.payload, bizType: action.payload.bizType }
    },
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
      console.log(action.payload)
      return { ...state, ...action.payload }
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      console.log(payload)
      const { success, totalElements: total, number: page, size: pageSize, content: data } = yield call(query, parse({ ...payload }))
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
    *queryVideoOrder ({ payload }, { call, put }) {
      const data = yield call(queryVideoOrder, payload)
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
    // *update ({ payload }, { call, put }) {
    //   const data = yield call(update, payload)
    //   if (data.success) {
    //     yield put({ type: 'hideModal' })
    //     yield put({ type: 'query' })
    //   } else {
    //     throw data
    //   }
    // },
    *cancelOrder ({ payload }, { call }) {
      const data = yield call(cancelOrd, payload)
      if (data.success) {
        message.success('成功解除！')
      } else {
        message.error('解除失败!')
      }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/video-orders').exec(location.pathname)
        const match2 = pathToRegexp('/video-orders/edit/:orderNo').exec(location.pathname)
        if (match) {
          const data = getLocalStorageJson('roles')
          if (!data) {
            dispatch({
              type: 'roles/updateCache',
            })
          }
          dispatch({
            type: 'updateQueryKey',
            payload: {
              bizType: ' ',
              orderStatus: ['00'],
            },
          })
          dispatch({
            type: 'query',
            payload: {
              orderStatus: ['00'],
            },
          })
        }
        if (match2) {
          if (match2 !== 'new') {
            dispatch({
              type: 'createSuccess',
              payload: {
                currentItem: {},
              },
            })
            dispatch({
              type: 'queryVideoOrder',
              payload: {
                orderNo: match2[1],
              },
            })
          } else {
            dispatch({
              type: 'createSuccess',
              payload: {
                currentItem: {},
              },
            })
          }
        }
      })
    },
  },
})
