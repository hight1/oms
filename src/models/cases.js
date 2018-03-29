import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { getUploadToken, getHospitalSpecial, queryHospitalSpecial, queryHospitalRegion, queryHospitalCategory, queryHospitalLevel, query, create, update, deny, remove, verify, batchRemove, queryUser, queryHospitalRank } from '../services/cases'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'cases',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    verifyModalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    titles: [],
    confirmLoading: true,
    RankData: [],
    hospitalRank: [],
    hospitalCategories: [],
    hospitalLevels: [],
    hospitalRegion: [],
    hospitalSpecial: [],
    judgeStatus: 3,
    specialName: '',
    uploadToken: '',
  },

  reducers: {
    uploadIconSuccess (state, { payload }) {
      let newHostpital = state.currentItem
      newHostpital.hospitalIcon = payload
      return { ...state, currentItem: newHostpital }
    },
    uploadImageSuccess (state, { payload }) {
      let newHostpital = state.currentItem
      newHostpital.hospitalImg = payload
      return { ...state, currentItem: newHostpital }
    },
    fetchUploadTokenSuccess (state, { payload }) {
      return { ...state, uploadToken: payload }
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
    selectChange (state, action) {
      return { ...state, ...action.payload }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    showVerifyModal (state, action) {
      return { ...state, ...action.payload, verifyModalVisible: true }
    },
    hideVerifyModal (state, action) {
      return { ...state, ...action.payload, verifyModalVisible: false }
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
      const newList = state.list.map((cases) => {
        if (cases.id === newUser.id) {
          return { ...cases, ...newUser }
        }
        return cases
      })
      return { ...state, list: newList }
    },
    updateQueryKey (state, action) {
      return { ...state, ...action.payload }
    },
    denySuccess (state, action) {
      const { id, enable } = action.payload
      const newList = state.list.map((cases) => {
        if (cases.id === id) {
          cases.status = enable ? 2 : 1
          return { ...cases }
        }
        return cases
      })
      return { ...state, list: newList, loading: false }
    },
    grantSuccess (state, action) {
      const grantUser = action.payload
      const newList = state.list.map((cases) => {
        if (cases.id === grantUser.id) {
          cases.roles = grantUser.roles
          return { ...cases }
        }
        return cases
      })
      return { ...state, ...newList, loading: false }
    },
  },

  effects: {
    *fetchUploadToken ({ payload }, { call, put }) {
      const { token } = yield call(getUploadToken, payload)
      yield put({
        type: 'fetchUploadTokenSuccess',
        payload: token,
      })
    },
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
              current: Number(page) + 1,
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
    *verify ({ payload }, { call, put }) {
      const data = yield call(queryUser, payload)
      if (data.success) {
        yield put({
          type: 'showVerifyModal',
          payload: {
            currentItem: data,
          },
        })
      } else {
        message.error(`无法打开! ${data.message}`)
      }
    },
    *verifyHospital ({ payload }, { call, put }) {
      const data = yield call(verify, payload)
      if (data.success) {
        yield put({
          type: 'hideVerifyModal',
          payload: {
            currentItem: data,
          },
        })
        yield put({ type: 'query' })
      } else {
        message.error(`审核失败! ${data.message}`)
      }
    },
    *queryHospitalRank ({ payload }, { call, put }) {
      const data = yield call(queryHospitalRank, parse({ ...payload }))

      if (data) {
        yield put({
          type: 'querySelectValue',
          payload: {
            hospitalRank: data,
          },
        })
      }
    },
    *queryHospitalCategory ({ payload }, { call, put }) {
      const data = yield call(queryHospitalCategory, parse({ ...payload }))
      if (data) {
        yield put({
          type: 'querySelectValue',
          payload: {
            hospitalCategories: data,
          },
        })
      }
    },
    *queryHospitalLevel ({ payload }, { call, put }) {
      const data = yield call(queryHospitalLevel, parse({ ...payload }))
      if (data) {
        yield put({
          type: 'querySelectValue',
          payload: {
            hospitalLevels: data,
          },
        })
      }
    },
    *queryHospitalSpecial ({ payload }, { call, put }) {
      const data = yield call(queryHospitalSpecial, parse({ ...payload }))
      if (data) {
        yield put({
          type: 'querySelectValue',
          payload: {
            hospitalSpecial: data,
          },
        })
      }
    },
    *queryHospitalRegion ({ payload }, { call, put }) {
      const data = yield call(queryHospitalRegion, parse({ ...payload }))
      if (data) {
        yield put({
          type: 'querySelectValue',
          payload: {
            hospitalRegion: data,
          },
        })
      }
    },
    *getHospitalSpecial ({ payload }, { call, put }) {
      const data = yield call(getHospitalSpecial, payload)
      if (data) {
        yield put({
          type: 'querySelectValue',
          payload: {
            specialName: data.name,
          },
        })
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
      const icon = yield select(({ cases }) => cases.currentItem.hospitalIcon)
      const img = yield select(({ cases }) => cases.currentItem.hospitalImg)
      const data = yield call(create, { ...payload, hospitalIcon: icon, hospitalImg: img })
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *update ({ payload }, { call, put, select }) {
      const code = yield select(({ cases }) => cases.currentItem.code)
      const icon = yield select(({ cases }) => cases.currentItem.hospitalIcon)
      const img = yield select(({ cases }) => cases.currentItem.hospitalImg)
      const data = yield call(update, { ...payload, code, hospitalIcon: icon, hospitalImg: img })
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
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
        const match = pathToRegexp('/cases').exec(location.pathname)
        if (match) {
          const data = getLocalStorageJson('roles')
          dispatch({
            type: 'fetchUploadToken',
            payload: {
              bucket: 'jkgj-hosp',
            },
          })
          // dispatch({
          //   type: 'queryHospitalRank',
          //   payload: {},
          // })
          // dispatch({
          //   type: 'queryHospitalCategory',
          //   payload: {},
          // })
          // dispatch({
          //   type: 'queryHospitalLevel',
          //   payload: {},
          // })
          // dispatch({
          //   type: 'queryHospitalSpecial',
          //   payload: {},
          // })
          // dispatch({
          //   type: 'queryHospitalRegion',
          //   payload: {},
          // })
          // dispatch({
          //   type: 'query',
          //   payload: {},
          // })
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
