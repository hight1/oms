import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { realDocsES, queryTag, queryVcPrice, query, create, update, deny, remove, batchRemove, queryDoctorTitle } from '../services/doctorTitle'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'verifyDoctorTitle',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    QuerymodalVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    titles: [],
    confirmLoading: true,
    rank: [],
    sort: [],
    RankData: [],
    judgeStatus: 3,
    vcPriceDisable: true,
    vcPriceList: [],
    failureTag: '',
    tagList: [],
    isOk: false,
    isES: false,
  },

  reducers: {
    changeOK (state, action) {
      return { ...state, ...action.payload, isOK: action.payload.isOK }
    },
    changeES (state, action) {
      return { ...state, ...action.payload, isES: action.payload.isES }
    },
    editTags (state, action) {
      state.failureTag = `${action.payload.data},${action.payload.tag}`
      let a = state.failureTag
      return { ...state, failureTag: a }
    },
    confirmLoading (state, action) {
      return { ...state, ...action.payload }
    },
    querySelectValue (state, action) {
      return { ...state, ...action.payload }
    },
    change (state, action) {
      return { ...state, ...action.payload }
    },
    changeTextarea (state, action) {
      return { ...state, ...action.payload }
    },
    notEditVcPrice (state, action) {
      return { ...state, ...action.payload, vcPriceDisable: true }
    },
    editVcPrice (state, action) {
      return { ...state, ...action.payload, vcPriceDisable: false }
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
    showQueryModal (state, action) {
      return { ...state, ...action.payload, QuerymodalVisible: true }
    },
    hideQueryModal (state, action) {
      return { ...state, ...action.payload, QuerymodalVisible: false }
    },
    createSuccess (state, action) {
      return { ...state, ...action.payload }
    },
    deleteSuccess () { },
    updateSuccess (state, action) {
      const newUser = action.payload
      const newList = state.list.map((hospital) => {
        if (hospital.id === newUser.id) {
          return { ...hospital, ...newUser }
        }
        return hospital
      })
      return { ...state, list: newList }
    },
    updateQueryKey (state, action) {
      return { ...state, ...action.payload }
    },
    denySuccess (state, action) {
      const { id, enable } = action.payload
      const newList = state.list.map((hospital) => {
        if (hospital.id === id) {
          hospital.status = enable ? 2 : 1
          return { ...hospital }
        }
        return hospital
      })
      return { ...state, list: newList, loading: false }
    },
    grantSuccess (state, action) {
      const grantUser = action.payload
      const newList = state.list.map((hospital) => {
        if (hospital.id === grantUser.id) {
          hospital.roles = grantUser.roles
          return { ...hospital }
        }
        return hospital
      })
      return { ...state, ...newList, loading: false }
    },
    queryValue (state, action) {
      return { ...state, ...action.payload }
    },
    clearState (state, action) {
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
              pageSize: Number(pageSize) || 10,
              current: Number(page),
            },
          },
        })
      }
    },
    *queryDoctorTitle ({ payload }, { call, put }) {
      const data = yield call(queryDoctorTitle, payload)
      if (data.success) {
        yield put({
          type: 'showQueryModal',
          payload: {
            currentItem: data,
          },
        })
      } else {
        message.error(`查询失败! ${data.message}`)
      }
    },
    *queryTag ({ payload }, { call, put }) {
      const { success, data } = yield call(queryTag, { ...payload })
      if (success) {
        yield put({
          type: 'queryValue',
          payload: {
            tagList: data,
          },
        })
      }
    },
    *edit ({ payload }, { call, put }) {
      const data = yield call(queryDoctorTitle, payload)
      if (data.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: data,
            judgeStatus: data.titleAuthStatus,
          },
        })
        yield put({
          type: 'queryTag',
          payload: {
            type: data.titleAuthStatus === '2' ? 2 : 1,
          },
        })
      } else {
        message.error(`查询失败! ${data.message}`)
      }
    },
    *queryHosiptalRank ({ payload }, { call, put }) {
      const { data } = yield call(query, parse({ ...payload }))
      if (data) {
        yield put({
          type: 'querySelectValue',
          payload: {
            rank: data,
            RankData: data,
          },
        })
      }
    },
    *queryHosiptalCategory ({ payload }, { call, put }) {
      const { data } = yield call(query, parse({ ...payload }))
      if (data) {
        yield put({
          type: 'querySelectValue',
          payload: {
            sort: data,
          },
        })
      }
    },
    *queryVcPrice ({ payload }, { call, put }) {
      const data = yield call(queryVcPrice, payload)
      if (data.success) {
        yield put({
          type: 'queryValue',
          payload: {
            vcPriceList: data.content,
          },
        })
      } else {
        message.error(`查询价格失败! ${data.message}`)
      }
    },
    *syncES ({ payload }, { call, put }) {
      const { success } = yield call(realDocsES, { ...payload })
      if (success) {
        yield put({
          type: 'changeES',
          payload: {
            isES: false,
          },
        })
        message.success('同步到ES成功！')
      } else {
        yield put({
          type: 'changeES',
          payload: {
            isES: false,
          },
        })
        message.error('同步到ES失败！')
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
      const data = yield call(update, payload)
      if (data.flag) {
        message.success('操作成功！')
        yield put({
          type: 'syncES',
          payload: {
            code: payload.code,
          },
        })
        yield put({
          type: 'changeOK',
          payload: {
            isOK: false,
          },
        })
        yield put({
          type: 'changeES',
          payload: {
            isES: true,
          },
        })
        yield put({ type: 'hideModal' })
      } else {
        yield put({
          type: 'changeOK',
          payload: {
            isOK: false,
          },
        })
        if (data.message === null) {
          message.error('数据异常！请换其他医生审核！')
        } else {
          message.error(`${data.message}请换其他医生审核！`)
        }
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

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/title-auths/verify/:code').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'clearState',
            payload: { currentItem: {} },
          })
          if (match[1] !== null) {
            dispatch({
              type: 'edit',
              payload: {
                code: match[1],
              },
            })
          }
          const data = getLocalStorageJson('roles')
          // dispatch({
          //   type: 'queryHosiptalRank',
          //   payload: {},
          // })
          // dispatch({
          //   type: 'queryHosiptalCategory',
          //   payload: {},
          // })
          // dispatch({
          //   type: 'queryVcPrice',
          // })
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
