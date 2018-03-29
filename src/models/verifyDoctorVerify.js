
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { realDocsES, queryTag, queryChildDept, queryDept, queryCate, queryVcPrice, queryDeptName, queryParentDept, queryHospitalName, query, create, update, remove, batchRemove, queryUser, verifyUser } from '../services/doctorVerify'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'verifyDoctorVerify',

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
    deptPageVisible: false,
    cateList: [],
    setHospital: [],
    selectedCateRows: [],
    setDept: [],
    deptLookUpVisible: false,
    selectedDeptRowKeys: [],
    deptLookData: [],
    failureTag: '',
    tagList: [],
    editStatus: false,
    qualifVisi: false,
    qualifVisi2: false,
    failReason: '',
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
    editHospital (state, action) {
      // const { selectedCateRows } = action.payload
      state.currentItem.hospitalName = action.payload.setHospital[0].name
      state.currentItem.hospitalCode = action.payload.setHospital[0].code
      state.currentItem.hospitalLevelName = action.payload.setHospital[0].levelName
      let b = (state.currentItem.hospitalCode !== undefined && state.currentItem.hospitalCode !== null) || (state.currentItem.deptCode !== undefined && state.currentItem.deptCode !== null)
      return { ...state, ...action.payload, editStatus: b }
    },
    editDept (state, action) {
      // const { selectedCateRows } = action.payload
      state.currentItem.deptName = action.payload.setDept[0].name
      state.currentItem.deptCode = action.payload.setDept[0].code
      state.currentItem.parentDeptName = action.payload.setDept[0].parentName
      let a = (state.currentItem.hospitalCode !== undefined && state.currentItem.hospitalCode !== null) || (state.currentItem.deptCode !== null && state.currentItem.deptCode !== undefined)

      return { ...state, ...action.payload, editStatus: a }
    },
    editTags (state, action) {
      // state.failureTag += action.payload.failureTag
      console.log(action.payload.data)
      action.payload.data === null || action.payload.data === 'null' ? action.payload.data = '' : action.payload.data
      state.currentItem.authRemark = `${action.payload.data}  ${action.payload.tag}`
      // console.log(a)
      return { ...state, ...action.payload }
    },
    deptPageVisible (state, action) {
      return { ...state, ...action.payload, deptPageVisible: true }
    },
    notDeptPageVisible (state, action) {
      return { ...state, ...action.payload, deptPageVisible: false }
    },
    deptLookUpModalVisi (state) {
      return { ...state, deptLookUpVisible: true }
    },
    hideLookUpModal (state) {
      return { ...state, deptLookUpVisible: false }
    },
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
    showPic (state, action) {
      return { ...state, ...action.payload, qualifVisi: true }
    },
    unshowPic (state, action) {
      return { ...state, ...action.payload, qualifVisi: false }
    },
    showPic2 (state, action) {
      return { ...state, ...action.payload, qualifVisi2: true }
    },
    unshowPic2 (state, action) {
      return { ...state, ...action.payload, qualifVisi2: false }
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
    queryCateSuccess (state, { payload }) {
      const { cateList, pagination } = payload
      return {
        ...state,
        cateList,
        pagination,
      }
    },
    // updateHospital (state, action) {
    //   const currentItem = { ...state.currentItem, hospitalCode: action.payload.key, hospitalName: action.payload.label }
    //   return { ...state, currentItem, fetching: false }
    // },
    querySuccess2 (state, { payload }) {
      const { deptList } = payload
      return {
        ...state,
        deptList,
      }
    },
    changeFailReason (state, { payload }) {
      if (state.currentItem.authRemark === null) {
        state.currentItem.authRemark = ''
      }
      state.currentItem.authRemark += payload.failReason
      // console.log(state.currentItem.authRemark)
      return { ...state, failReason: payload.failReason }
    },
    updateCateState (state, action) {
      return { ...state, ...action.payload }
    },
    querySecondDeptSuccess (state, action) {
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
    *queryCate ({ payload }, { call, put }) {
      const { success: successDept, data, total, pageSize, pageNum } = yield call(queryCate, { ...payload })
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
    *queryDept ({ payload }, { call, put }) {
      const { success: successDept, content: deptData } = yield call(queryDept, { ...payload })
      if (successDept) {
        yield put({
          type: 'querySuccess2',
          payload: {
            deptList: deptData,
          },
        })
      }
    },
    *querySecondDept ({ payload }, { call, put }) {
      const { success, /* total, pageNum, pageSize */ data } = yield call(queryChildDept, { ...payload })
      if (success) {
        yield put({
          type: 'querySecondDeptSuccess',
          payload: {
            deptLookData: data,
            // pagination: {
            //   total,
            //   pageSize: Number(pageSize) || 10,
            //   current: Number(pageNum),
            // },
          },
        })
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
    *verify ({ payload }, { call, put }) {
      const data = yield call(verifyUser, payload)
      if (data.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: data,
            judgeStatus: data.physicianAuthStatus,
            editStatus: (data.hospitalCode !== undefined && data.hospitalCode !== null) || (data.deptCode !== undefined && data.deptCode !== null),
            // hospitalValue: { text: data.hospitalName, value: data.hospitalCode },
          },
        })
        yield put({
          type: 'changeTextarea',
          payload: {
            judgeStatus: data.physicianAuthStatus,
          },
        })
        yield put({
          type: 'queryTag',
          payload: {
            type: data.physicianAuthStatus === '2' ? 2 : 1,
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
        message.success('操作成功！')
        // yield put({
        //   type: 'syncES',
        //   payload: {
        //     code: payload.code,
        //   },
        // })
        yield put({
          type: 'changeOK',
          payload: {
            isOK: false,
          },
        })
        // yield put({
        //   type: 'changeES',
        //   payload: {
        //     isES: true,
        //   },
        // })
        yield put({ type: 'hideModal' })
        // yield put(
        //   routerRedux.push({
        //               pathname: '/physician-auths',
        //   })
        // })
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
          message.error(`${data.message} 请换其他医生审核！`)
          yield put({ type: 'changeFailReason',
            payload: {
              failReason: data.message,
            },
          })
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
            isES: true,
          },
        })
        message.error('同步到ES失败！')
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
        const match = pathToRegexp('/physician-auths/verify/:code').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'clearState',
            payload: { currentItem: {}, failureTag: '' },
          })
          if (match[1] !== null) {
            dispatch({
              type: 'verify',
              payload: {
                code: match[1],
              },
            })
          }
          const data = getLocalStorageJson('roles')
          dispatch({
            type: 'queryParentDept',
            payload: {
              results: 100,
            },
          })
          // dispatch({
          //   type: 'queryVcPrice',
          // })
          if (!data) {
            dispatch({
              type: 'roles/updateCache',
            })
          }
          if (match === null) {
            dispatch({
              type: 'query',
              payload: location.query,
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
