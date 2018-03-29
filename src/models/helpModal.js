import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
// import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { queryHelpCate, CateTop, Top, query, create, update, remove, batchRemove } from '../services/helpList'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'helpModal',

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
    cateList: [],
  },

  reducers: {

    queryCellValue (state, action) {
      return { ...state, ...action.payload }
    },
    queryValue (state, action) {
      return { ...state, ...action.payload }
    },
    change (state, action) {
      return { ...state, ...action.payload }
    },
    clearState (state, action) {
      return { ...state, ...action.payload }
    },
    selectChange (state, action) {
      return { ...state, ...action.payload }
    },
    isNotParent (state, action) {
      return { ...state, ...action.payload, isParent: false }
    },
    isParent (state, action) {
      return { ...state, ...action.payload, isParent: true }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showLookUpModal (state) {
      return { ...state, deptLookUpVisible: true }
    },
    hideLookUpModal (state) {
      return { ...state, deptLookUpVisible: false }
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
    querySecondDeptSuccess (state, action) {
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
              pageSize: Number(pageSize) || 20,
              current: Number(page),
            },
          },
        })
      }
    },
    *queryHelpCate ({ payload }, { call, put }) {
      const { list: data } = yield call(queryHelpCate, { ...payload })
      if (data) {
        yield put({
          type: 'queryValue',
          payload: {
            cateList: data,
          },
        })
      }
    },
    *edit ({ payload }, { call, put }) {
      const { content: data } = yield call(query, { app: payload.app, pageSize: 10000 })
      const { id } = payload
      let value
      data.map((val) => {
        if (val.id === id) {
          value = val
        }
        return true
      })
      if (value) {
        yield put({
          type: 'queryHelpCate',
          payload: {
            app: value.app,
          },
        })
        yield put({
          type: 'queryValue',
          payload: {
            currentItem: value,
            modalType: 'update',
          },
        }
      )
      } else {
        message.error('无此数据！')
      }
    },
    *changeTop ({ payload }, { call }) {
      const data = yield call(Top, payload)
      if (data.success) {
        message.success(` ${data.message}`)
      } else {
        message.error(`${data.message}`)
      }
    },
    *changeCateTop ({ payload }, { call }) {
      const data = yield call(CateTop, payload)
      if (data.success) {
        message.success(` ${data.message}`)
      } else {
        message.error(`${data.message}`)
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
    *create ({ payload }, { call }) {
      const data = yield call(create, payload)
      if (data.success) {
        // yield put(routerRedux.push({
        //   pathname: '/help',
        // }))
        message.success('新增成功！')
      } else {
        throw data
      }
    },
    *update ({ payload }, { call }) {
      const data = yield call(update, payload)
      if (data.success) {
        message.success('编辑成功！')
        // yield put(routerRedux.push({
        //   pathname: '/departments',
        // }))
      } else {
        throw data
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/help/update/:id').exec(location.pathname)
        // const match1 = pathToRegexp('/help/update/new').exec(location.pathname)
        // if (match1) {
        //   if (match1[1] === 'new') {
        //     console.log(match1[1])
        //     dispatch({
        //       type: 'clearState',
        //       payload: { currentItem: {} },
        //     })
        //   }
        // }
        if (match) {
          dispatch({
            type: 'clearState',
            payload: { currentItem: {} },
          })
          dispatch({
            type: 'queryHelpCate',
            payload: {
              app: 1,
            },
          })
          if (match[1] !== null && match[1] !== 'new') {
            dispatch({
              type: 'edit',
              payload: {
                id: match[1],
                app: 0,
              },
            })
          }
          const data = getLocalStorageJson('roles')
          if (!data) {
            dispatch({
              type: 'roles/updateCache',
            })
          }
          // dispatch({
          //   type: 'query',
          //   payload: location.query,
          // })
        }
      })
    },
  },
})
