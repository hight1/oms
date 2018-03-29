
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'

import { queryVcPrice, queryDeptName, queryParentDept, queryHospitalName, query, create, update, remove, batchRemove, queryUser, verifyUser } from '../services/doctorVerify'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'queryDoctorVerify',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    QuerymodalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    titles: [],
    hospitalName: [],
    parentDept: [],
    deptName: [],
    confirmLoading: true,
    judgeStatus: 3,
    hospitalNameDisabled: true,
    deptNameDisable: true,
    secondDeptNameDisable: true,
    vcPriceDisable: true,
    authRemarkWarning: {},
    reason: {},
    hospitalList: [],
    deptList: [],
    fetching: false,
    fetchingDeptName: false,
    hospitalValue: [],
    deptValue: [],
    vcPriceList: [],
    selectedTags: [],
  },

  reducers: {
    confirmLoading (state, action) {
      return { ...state, ...action.payload }
    },
    querySelectValue (state, action) {
      return { ...state, ...action.payload }
    },
    queryValue (state, action) {
      return { ...state, ...action.payload }
    },
    change (state, action) {
      return { ...state, ...action.payload }
    },
    changeFetching (state, action) {
      return { ...state, ...action.payload, fetching: true }
    },
    notChangeFetching (state, action) {
      return { ...state, ...action.payload, fetching: false }
    },
    changeFetching2 (state, action) {
      return { ...state, ...action.payload, fetchingDeptName: true }
    },
    notChangeFetching2 (state, action) {
      return { ...state, ...action.payload, fetchingDeptName: false }
    },
    editHospitalName (state, action) {
      return { ...state, ...action.payload, hospitalNameDisabled: false }
    },
    notEditHospitalName (state, action) {
      return { ...state, ...action.payload, hospitalNameDisabled: true }
    },
    editDeptName (state, action) {
      return { ...state, ...action.payload, deptNameDisable: false }
    },
    notEditDeptName (state, action) {
      return { ...state, ...action.payload, deptNameDisable: true }
    },
    editFirstDeptName (state, action) {
      return { ...state, ...action.payload, secondDeptNameDisable: false }
    },
    notEditVcPrice (state, action) {
      return { ...state, ...action.payload, vcPriceDisable: true }
    },
    editVcPrice (state, action) {
      return { ...state, ...action.payload, vcPriceDisable: false }
    },
    notEditFirstDeptName (state, action) {
      return { ...state, ...action.payload, secondDeptNameDisable: true }
    },
    changeTextarea (state, action) {
      return (

        action.payload.judgeStatus === 2 || action.payload.judgeStatus === '2' ?
        { ...state, ...action.payload, authRemarkWarning: {} }
        :

        { ...state,
          ...action.payload,
          authRemarkWarning: {
            required: true,
            message: '请填写认证结果',
          },
        }
      )
    },
    changeTags (state, action) {
      return { ...state, selectedTags: action.payload }
    },
    selectChange (state, action) {
      return { ...state, ...action.payload }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    showQueryModal (state, action) {
      return { ...state, ...action.payload, QuerymodalVisible: true }
    },
    hideQueryModal (state, action) {
      return { ...state, ...action.payload, QuerymodalVisible: false }
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
      const newList = state.list.map((hosiptal) => {
        if (hosiptal.id === newUser.id) {
          return { ...hosiptal, ...newUser }
        }
        return hosiptal
      })
      return { ...state, list: newList }
    },
    updateQueryKey (state, action) {
      return { ...state, ...action.payload }
    },
    // updateHospital (state, action) {
    //   const currentItem = { ...state.currentItem, hospitalCode: action.payload.key, hospitalName: action.payload.label }
    //   return { ...state, currentItem, fetching: false }
    // },
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
    *verify ({ payload }, { call, put }) {
      const data = yield call(verifyUser, payload)
      if (data.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: data,
            judgeStatus: data.physicianAuthStatus,
            // hospitalValue: { text: data.hospitalName, value: data.hospitalCode },
          },
        })
        yield put({
          type: 'changeTextarea',
          payload: {
            judgeStatus: data.physicianAuthStatus,
          },
        })
      } else {
        message.error(`查询失败! ${data.message}`)
      }
    },
    *queryDoctor ({ payload }, { call, put }) {
      const data = yield call(queryUser, payload)
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
      // console.log(location.search.substring(location.search.indexOf('pageSize') + 8))
      // console.log(data)
      if (data.flag) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query',
          payload: {
            page: location.search.substring(6, location.search.indexOf('&')) || '1',
            pageSize: location.search.substring(location.search.indexOf('pageSize') + 9) || '20',
          } })
      } else {
        if (data.message === null) {
          message.error('数据异常！请换其他医生审核！')
        } else {
          message.error(`${data.message}请换其他医生审核！`)
        }
      }
    },
    *queryParentDept ({ payload }, { call, put }) {
      const data = yield call(queryParentDept, payload)
      if (data.success) {
        yield put({
          type: 'queryValue',
          payload: {
            parentDept: data.content,
          },
        })
      } else {
        message.error(`查询科室名称失败! ${data.message}`)
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
    *searchHospitalName ({ payload }, { call, put }) {
      const data = yield call(queryHospitalName, payload)
      if (data.success && data.content != null) {
        const rightData = data.content.map(user => ({
          text: `${user.name}`,
          value: user.code,
        }))
        yield put({
          type: 'notChangeFetching',
        })
        yield put({
          type: 'queryValue',
          payload: {
            hospitalList: rightData,
          },
        })
      }
    },
    // *searchDeptName ({ payload }, { call, put }) {
    //   const data = yield call(queryDeptName, payload)
    //   if (data.success && data.content != null) {
    //     const rightData2 = data.content.map(user => ({
    //       text: `${user.name}`,
    //       value: user.code,
    //     }))
    //     yield put({
    //       type: 'notChangeFetching2',
    //     })
    //     yield put({
    //       type: 'queryValue',
    //       payload: {
    //         deptList: rightData2,
    //       },
    //     })
    //   }
    // },
    *searchSecondDept ({ payload }, { call, put }) {
      const data = yield call(queryDeptName, payload)
      if (data.success) {
        const rightData2 = data.content.map(user => ({
          text: `${user.name}`,
          value: user.code,
        }))
        yield put({
          type: 'notChangeFetching2',
        })
        yield put({
          type: 'queryValue',
          payload: {
            deptList: rightData2,
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

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/physician-auths/query/:code').exec(location.pathname)
        if (match) {
          if (match[1] !== null) {
            dispatch({
              type: 'queryDoctor',
              payload: {
                code: match[1],
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
