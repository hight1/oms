import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
// import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { createTag, updateTag, queryTag, queryTabs, getUploadToken, query, remove, batchRemove } from '../services/tagTemplates'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'tagTemplates',

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
    uploadToken: [],
    undoneList: [],
    tabList: [],
  },

  reducers: {
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
      const { cateList } = payload
      return {
        ...state,
        cateList,
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
      newHostpital.image = payload
      return { ...state, currentItem: newHostpital }
    },
    fetchUploadTokenSuccess (state, { payload }) {
      return { ...state, uploadToken: payload }
    },
  },

  effects: {
    *queryTabs ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, data } = yield call(queryTabs, parse({ ...payload }))
      if (success) {
        yield put({
          type: 'querySuccess1',
          payload: {
            tabList: data,
          },
        })
      }
    },
    *query ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalCount: total, page, pageSize, data } = yield call(query, parse({ ...payload }))
      if (success) {
        yield put({
          type: 'querySuccess1',
          payload: {
            list: data,
            pagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(page),
            },
            selectedRowKeys: [],
          },
        })
      }
    },
    *edit ({ payload }, { call, put }) {
      if (payload.action === 'new') {
        return true
      }
      const data = yield call(queryTag, payload)
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
      const data = yield call(batchRemove, { codes: payload.codes })
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query', payload: { type: payload.type } })
      } else {
        throw data
      }
    },
    *create ({ payload }, { call, put }) {
      const data = yield call(createTag, payload)
      if (data.success) {
        message.success(data.message)
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *update ({ payload }, { call, put }) {
     //  const image = yield select(({ doctor }) => doctor.currentItem.image)
      const data = yield call(updateTag, { ...payload })
      if (data.success) {
        message.success(data.message)
        yield put({ type: 'hideModal' })
      } else {
        throw data
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
        const match = pathToRegexp('/tag-templates').exec(location.pathname)
        const match2 = pathToRegexp('/tag-templates/edit/:code').exec(location.pathname)
        const match3 = pathToRegexp('/tag-templates/edit/new').exec(location.pathname)
        if (match2) {
          if (match2[1] === 'new') {
            dispatch({
              type: 'queryTabs',
            })
          } else {
            dispatch({
              type: 'queryTabs',
            })
            dispatch({
              type: 'edit',
              payload: {
                code: match2[1],
              },
            })
          }
        }
        if (match3) {
          console.log('new')
          dispatch({
            type: 'queryTabs',
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
            type: 'queryTabs',
          })
          dispatch({
            type: 'query',
            payload: {
              type: 1,
            },
          })
        }
      })
    },
  },
})
