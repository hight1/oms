import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { getUploadToken, query, create, update, deny, remove, verify, batchRemove, queryUser } from '../services/hospitals'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'hospital',

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
    judgeStatus: 3,
    specialName: '',
    uploadToken: '',
    panes: [],
    activeKey: '1',
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
    addPanes (state) {
      // let { panes } = state
      // panes.push({ title: 'New Tab', content: payload.name, closable: true })
      return {
        ...state,
      }
    },
    removePanes (state, action) {
      const { panes } = action.payload
      // console.log(panes)
      // let { panes } = state
      // panes.push({ title: 'New Tab', content: payload.name, closable: true })
      return {
        ...state,
        panes: panes,
      }
    },
    changePanes (state, { payload }) {
      // let { panes } = state
      // panes.push({ title: 'New Tab', content: payload.name, closable: true })
      return {
        ...state,
        activeKey: payload,
      }
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

      const { success, total, pageNum, pageSize, data } = yield call(query, { ...payload })
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
      // const type = yield select(({ hospital }) => hospital.modalType)
      // console.log(type.indexOf('update'))
      // if (type.indexOf('update') !== -1) {
      //   yield put(routerRedux.push('/hospitals'))
      // }
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
    // *queryHospitalRank ({ payload }, { call, put }) {
    //   const data = yield call(queryHospitalRank, parse({ ...payload }))

    //   if (data) {
    //     yield put({
    //       type: 'querySelectValue',
    //       payload: {
    //         hospitalRank: data,
    //       },
    //     })
    //   }
    // },
    // *queryHospitalCategory ({ payload }, { call, put }) {
    //   const data = yield call(queryHospitalCategory, parse({ ...payload }))
    //   if (data) {
    //     yield put({
    //       type: 'querySelectValue',
    //       payload: {
    //         hospitalCategories: data,
    //       },
    //     })
    //   }
    // },
    // *queryHospitalLevel ({ payload }, { call, put }) {
    //   const data = yield call(queryHospitalLevel, parse({ ...payload }))
    //   if (data) {
    //     yield put({
    //       type: 'querySelectValue',
    //       payload: {
    //         hospitalLevels: data,
    //       },
    //     })
    //   }
    // },
    // *queryHospitalSpecial ({ payload }, { call, put }) {
    //   const data = yield call(queryHospitalSpecial, parse({ ...payload }))
    //   if (data) {
    //     yield put({
    //       type: 'querySelectValue',
    //       payload: {
    //         hospitalSpecial: data,
    //       },
    //     })
    //   }
    // },
    // *queryHospitalRegion ({ payload }, { call, put }) {
    //   const data = yield call(queryHospitalRegion, parse({ ...payload }))
    //   if (data) {
    //     yield put({
    //       type: 'querySelectValue',
    //       payload: {
    //         hospitalRegion: data,
    //       },
    //     })
    //   }
    // },
    // *getHospitalSpecial ({ payload }, { call, put }) {
    //   const data = yield call(getHospitalSpecial, payload)
    //   if (data) {
    //     yield put({
    //       type: 'querySelectValue',
    //       payload: {
    //         specialName: data.name,
    //       },
    //     })
    //   }
    // },
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
      const icon = yield select(({ hospital }) => hospital.currentItem.hospitalIcon)
      const img = yield select(({ hospital }) => hospital.currentItem.hospitalImg)
      const data = yield call(create, { ...payload, hospitalIcon: icon, hospitalImg: img })
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *update ({ payload }, { call, put, select }) {
      const code = yield select(({ hospital }) => hospital.currentItem.code)
      const icon = yield select(({ hospital }) => hospital.currentItem.hospitalIcon)
      const img = yield select(({ hospital }) => hospital.currentItem.hospitalImg)
      const data = yield call(update, { ...payload, code, hospitalIcon: icon, hospitalImg: img })
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put(routerRedux.push({
          pathname: '/hospitals',
        }))
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
        const match = pathToRegexp('/hospitals').exec(location.pathname)
        // if (location.pathname.includes('update')) {
        //   dispatch(
        //     routerRedux.push({
        //       pathname: '/hospitals',
        //     }),
        //   )
        // }
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
