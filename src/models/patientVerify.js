import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { query, create, update, remove, batchRemove } from '../services/patientVerify'


export default modelExtend(pageModel, {

  namespace: 'PatientVerify',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    judgeStatus: 3,
    idCardPicAuthStatus: 0,
  },

  reducers: {
    change (state, action) {
      return { ...state, ...action.payload }
    },
    changeType (state, action) {
      return { ...state, ...action.payload, idCardPicAuthStatus: action.payload }
    },
    changeTextarea (state, action) {
      return { ...state, ...action.payload }
    },
    selectChange (state, action) {
      return { ...state, ...action.payload }
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
      return { ...state, ...action.payload }
    },
    denySuccess (state, action) {
      const { id, enable } = action.payload
      const newList = state.list.map((user) => {
        if (user.id === id) {
          user.status = enable ? 2 : 1
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
          user.roles = grantUser.roles
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
      const { success, totalElements: total, number: page, size: pageSize, content: data } = yield call(query, payload)
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
    *edit ({ payload }, { call, put, select }) {
      const idCardPicAuthStatus = yield select(({ PatientVerify }) => PatientVerify.idCardPicAuthStatus)
      console.log(idCardPicAuthStatus)
      // idCardPicAuthStatus.idCardPicAuthStatus === undefined ? { idCardPicAuthStatus: 0, pageSize: 1000 } : idCardPicAuthStatus
      const { content: data } = yield call(query, idCardPicAuthStatus === 0 ? { idCardPicAuthStatus: 0, pageSize: 1000 } : (
        idCardPicAuthStatus.idCardPicAuthStatus === undefined ? { idCardPicAuthStatus: 0, pageSize: 1000 } : { ...idCardPicAuthStatus, pageSize: 1000 })

      )
      const { code } = payload
      let singleItem
      data.map((value) => {
        if (value.code === code) {
          singleItem = value
          return singleItem
        }
        return true
      })
      if (singleItem) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: singleItem,
            judgeStatus: singleItem.status,
          },
        })
      } else {
        message.error(`${data.message}`)
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
    *update ({ payload }, { call, put }) {
      console.log(payload)
      const data = yield call(update, { ...payload })
      if (data.success) {
        message.success(data.message)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query',
          payload: {
            idCardPicAuthStatus: payload.idCardPicAuthStatus,
          },
        })
      } else {
        message.error(`${data.message}`)
      }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/idcard-pic-auths').exec(location.pathname)

        if (match) {
          dispatch({
            type: 'query',
            payload: {
              ...location.query,
              idCardPicAuthStatus: 0,
            },
          })
          // dispatch({
          //   type: 'changeType',
          //   payload: {
          //     idCardPicAuthStatus: 0,
          //   },
          // })
        }
      })
    },
  },
})
