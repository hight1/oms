// import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { cancelOrd, queryPatient, queryDoc, query, create, update, remove, batchRemove, queryUser } from '../services/remoteConsult'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'remoteConsult',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    docLookUpVisible: false,
    docLookUpVisible2: false,
    docList: [],
    setDoc: [],
    selectedDocKeys: [],
    selectedDocRows: [],
    setDoc2: [],
    setPat: [],
    patList: [],
    patLookUpVisible: false,
    selectedPatRows: [],
    selectedPatKeys: [],
    type: '0',

  },

  reducers: {
    changeType (state, action) {
      return { ...state, type: action.payload.type }
    },
    editDoc (state, action) {
      // const { selectedCateRows } = action.payload
      if (state.currentItem.service === undefined) {
        state.currentItem.service = {}
        state.currentItem.service.name = action.payload.setDoc[0].name
        state.currentItem.service.uid = action.payload.setDoc[0].code
        state.currentItem.service.titleName = action.payload.setDoc[0].titleName
        state.currentItem.service.hospitalName = action.payload.setDoc[0].hospitalName
        state.currentItem.service.deptName = action.payload.setDoc[0].deptName
      } else {
        state.currentItem.service.name = action.payload.setDoc[0].name
        state.currentItem.service.uid = action.payload.setDoc[0].code
        state.currentItem.service.titleName = action.payload.setDoc[0].titleName
        state.currentItem.service.hospitalName = action.payload.setDoc[0].hospitalName
        state.currentItem.service.deptName = action.payload.setDoc[0].deptName
      }
      // console.log(state.currentItem)
      return { ...state, ...action.payload }
    },
    editDoc2 (state, action) {
      // const { selectedCateRows } = action.payload
      if (state.currentItem.apply === undefined) {
        state.currentItem.apply = {}
        state.currentItem.apply.name = action.payload.setDoc2[0].name
        state.currentItem.apply.uid = action.payload.setDoc2[0].code
        state.currentItem.apply.hospitalName = action.payload.setDoc2[0].hospitalName
      } else {
        state.currentItem.apply.name = action.payload.setDoc2[0].name
        state.currentItem.apply.uid = action.payload.setDoc2[0].code
        state.currentItem.apply.hospitalName = action.payload.setDoc2[0].hospitalName
      }
      // console.log(state.currentItem)
      return { ...state, ...action.payload }
    },
    editPat (state, action) {
      // const { selectedCateRows } = action.payload
      if (state.currentItem.apply === undefined) {
        state.currentItem.apply = {}
        state.currentItem.apply.patientName = action.payload.setPat[0].name
        state.currentItem.apply.patientUid = action.payload.setPat[0].code
        state.currentItem.apply.patientSex = action.payload.setPat[0].sex
        state.currentItem.apply.patientMobile = action.payload.setPat[0].mobile
        if (action.payload.setPat[0].birthday === null) {
          state.currentItem.apply.patientAge = 0
        } else {
          state.currentItem.apply.patientAge = new Date().getFullYear() - action.payload.setPat[0].birthday.slice(0, 4)
        }
       // state.currentItem.apply.hospitalName = action.payload.setPat[0].hospitalName
      } else {
        state.currentItem.apply.patientName = action.payload.setPat[0].name
        state.currentItem.apply.patientUid = action.payload.setPat[0].code
        state.currentItem.apply.patientSex = action.payload.setPat[0].sex
        state.currentItem.apply.patientMobile = action.payload.setPat[0].mobile
        if (action.payload.setPat[0].birthday === null) {
          state.currentItem.apply.patientAge = 0
        } else {
          state.currentItem.apply.patientAge = new Date().getFullYear() - action.payload.setPat[0].birthday.slice(0, 4)
        }

       //  state.currentItem.apply.hospitalName = action.payload.setPat[0].hospitalName
      }
      // console.log(state.currentItem)
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
    patPageVisible (state, action) {
      return { ...state, ...action.payload, patLookUpVisible: true }
    },
    patPageDisvisible (state, action) {
      return { ...state, ...action.payload, patLookUpVisible: false }
    },
    docPageVisible (state, action) {
      return { ...state, ...action.payload, docLookUpVisible: true }
    },
    docPageDisvisible (state, action) {
      return { ...state, ...action.payload, docLookUpVisible: false }
    },
    docPageVisible2 (state, action) {
      return { ...state, ...action.payload, docLookUpVisible2: true }
    },
    docPageDisvisible2 (state, action) {
      return { ...state, ...action.payload, docLookUpVisible2: false }
    },
    updateDocState (state, action) {
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
      const { success, totalElements: total, number: page, pageSize, content: data } = yield call(query, { ...payload })
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
    *queryPatient ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalCount: total, page, pageSize, data } = yield call(queryPatient, { ...payload })
      if (success) {
        yield put({
          type: 'createSuccess',
          payload: {
            patList: data,
            pagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(page),
            },
          },
        })
      }
    },
    *queryDoc ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalCount: total, page, pageSize, data } = yield call(queryDoc, { ...payload, type: 1 })
      if (success) {
        yield put({
          type: 'createSuccess',
          payload: {
            docList: data,
            pagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(page),
            },
          },
        })
      }
    },
    *edit ({ payload }, { call, put }) {
      if (payload.orderNo === 'new') {
        return true
      }
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
    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        message.success(data.message)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *update ({ payload }, { call, put }) {
      const data = yield call(update, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        message.success(data.message)
        yield put(routerRedux.push({
          pathname: '/remote-consult',
        }))
      } else {
        throw data
      }
    },
    *cancelOrder ({ payload }, { call }) {
      const data = yield call(cancelOrd, payload)
      if (data.success) {
        message.success('成功解除！')
      } else {
        message.error('解除失败！')
      }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/remote-consult').exec(location.pathname)
        const match2 = pathToRegexp('/remote-consult/edit/:orderNo').exec(location.pathname)
        const match3 = pathToRegexp('/remote-consult/edit/new').exec(location.pathname)
        if (match2) {
          if (match2 !== 'new') {
            dispatch({
              type: 'edit',
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
        if (match3) {
          dispatch({
            type: 'createSuccess',
            payload: {
              currentItem: {},
            },
          })
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
            payload: location.query,
          })
          // dispatch({
          //   type: 'changeType',
          //   payload: {
          //     type: '0',
          //   },
          // })
        }
      })
    },
  },
})
