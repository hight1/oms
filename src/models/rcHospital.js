import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { queryHosi, updateRC, createRC, queryRC, getUploadToken, query, remove, batchRemove } from '../services/rcHospital'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'rcHospital',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    selectedFakeKeys: [],
    fakeList: [],
    selectedCateRows: [],
    fakeModalVisi: false,
    realModalVisi: false,
    deptPageVisible: false,
    lookUpCateValues: [],
    cateList: [],
    setHospital: [],
    setDept: [],
    deptList: [],
    deptLookUpVisible: false,
    deptLookData: [],
    selectedDeptRows: [],
    uploadToken: '',
    undoneList: [],
    tabList: [],
  },

  reducers: {
    editHospital (state, action) {
      // const { selectedCateRows } = action.payload
      state.currentItem.hospitalName = action.payload.setHospital[0].name
      state.currentItem.hospitalCode = action.payload.setHospital[0].code
      return { ...state, ...action.payload }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    editRecommendValues (state, action) {
      return { ...state, ...state.currentItem.hospitalCategories, ...action.payload }
    },
    editSortValues (state, action) {
      return { ...state, ...state.currentItem.hospitalCategories, ...action.payload }
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
    showFakeModal (state, action) {
      return { ...state, ...action.payload, fakeModalVisi: true }
    },
    showRealModal (state, action) {
      return { ...state, ...action.payload, fakeModalVisi: true }
    },
    deptPageVisible (state, action) {
      return { ...state, ...action.payload, deptPageVisible: true }
    },
    notDeptPageVisible (state, action) {
      return { ...state, ...action.payload, deptPageVisible: false }
    },
    updateCateState (state, action) {
      return { ...state, ...action.payload }
    },
    deptLookUpModalVisi (state) {
      return { ...state, deptLookUpVisible: true }
    },
    hideLookUpModal (state) {
      return { ...state, deptLookUpVisible: false }
    },
    querySecondDeptSuccess (state, action) {
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
    querySuccess1 (state, action) {
      return { ...state, ...action.payload }
    },
    updateFakeState (state, action) {
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
    querySuccess2 (state, { payload }) {
      const { deptList } = payload
      return {
        ...state,
        deptList,
      }
    },
    uploadIconSuccess (state, { payload }) {
      let newHostpital = state.currentItem
      newHostpital.hospitalIcon = payload
      return { ...state, currentItem: newHostpital }
    },
    rotateImage (state, { payload }) {
      let newHostpital = state.currentItem
      newHostpital.hospitalIcon = `${newHostpital.hospitalIcon.split('?')[0]}?imageMogr2/rotate/${payload}`
      return { ...state, currentItem: newHostpital }
    },
    fetchUploadTokenSuccess (state, { payload }) {
      return { ...state, uploadToken: payload }
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalCount: total, page, pageSize, content: data } = yield call(query, parse({ ...payload }))
      if (success) {
        yield put({
          type: 'querySuccess1',
          payload: {
            list: data,
            selectedRowKeys: [],
            pagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(page),
            },
          },
        })
      }
    },
    *queryHosi ({ payload }, { call, put }) {
      const { success: successDept, data, total, pageSize, pageNum } = yield call(queryHosi, { ...payload })
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
      if (payload.uid === 'new' || payload.uid === undefined) {
        return true
      }
      const data = yield call(queryRC, payload)
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
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *create ({ payload }, { call, put, select }) {
      const image = yield select(({ rcHospital }) => rcHospital.currentItem.hospitalIcon)
      const data = yield call(createRC, { ...payload, hospitalIcon: image })
      if (data.success) {
        message.success('操作成功！')
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        message.error(`${data.message}请换其他医生审核！`)
      }
    },
    *update ({ payload }, { call, put, select }) {
      const image = yield select(({ rcHospital }) => rcHospital.currentItem.hospitalIcon)
      const data = yield call(updateRC, { ...payload, hospitalIcon: image })
      if (data.success) {
        message.success('操作成功！')
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        if (data.message === null) {
          message.error('数据异常！请换其他医生审核！')
        } else {
          message.error(`${data.message}请换其他医生审核！`)
        }
      }
    },
    *fetchUploadToken ({ payload }, { call, put }) {
      const { token } = yield call(getUploadToken, payload)
      yield put({
        type: 'fetchUploadTokenSuccess',
        payload: token,
      })
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/rc-hospital').exec(location.pathname)
        const match3 = pathToRegexp('/rc-hospital/edit/new').exec(location.pathname)
        const match2 = pathToRegexp('/rc-hospital/edit/:code').exec(location.pathname)
        if (match2) {
          if (match2 === 'new') {
            dispatch({
              type: 'fetchUploadToken',
              payload: {
                bucket: 'jkgj-hosp',
              },
            })
          } else {
            dispatch({
              type: 'edit',
              payload: {
                uid: match2[1],
              },
            })
            dispatch({
              type: 'fetchUploadToken',
              payload: {
                bucket: 'jkgj-hosp',
              },
            })
          }
        }
        if (match3) {
          dispatch({
            type: 'fetchUploadToken',
            payload: {
              bucket: 'jkgj-hosp',
            },
          })
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
          })
        }
      })
    },
  },
})
