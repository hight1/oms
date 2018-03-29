import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { pageModel } from './common'
// import hospital from './hospital'
import { queryFalseDoc, queryTrueDoc, toHospitalES, queryCate, queryChildDept, queryDept, getUploadToken, queryHospitalSpecial, queryHospitalCategory, queryHospitalLevel, query, create, update, remove, verify, batchRemove, queryUser, queryHospitalRank } from '../services/hospitals'
import { getLocalStorageJson } from '../utils/storage'
import { checkRepeat } from '../utils/helper'

export default modelExtend(pageModel, {

  namespace: 'updateHospital',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    selectedDeptRowKeys: [],
    // modalVisible: false,
    verifyModalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    editDeptVisible: false,
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
    deptList: [],
    cateList: [],
    panes: [],
    activeKey: '1',
    deptPageVisible: false,
    deptLookUpVisible: false,
    lookUpCateValues: [],
    selectedCateRows: [],
    selectedDeptRows: [],
    deptLookData: [],
    falseDocList: [],
    trueDocList: [],
    visiMap: false,
    loadES: false,
    loadOK: false,
  },

  reducers: {
    changeLoadOK (state, action) {
      return { ...state, ...action.payload, loadOK: action.payload.loadOK }
    },
    changeLoadES (state, action) {
      return { ...state, ...action.payload, loadES: action.payload.loadES }
    },
    editLookUpValues (state, action) {
      // const { selectedCateRows } = action.payload
      if (state.currentItem.hospitalCategories === undefined || state.currentItem.hospitalCategories === null) {
        state.currentItem.hospitalCategories = []
        action.payload.selectedCateRows.map((val) => {
          val.isRecommend = 0
          val.hospitalSort = '0'
          return val
        })
        state.currentItem.hospitalCategories.push(...action.payload.selectedCateRows)
      } else {
        action.payload.selectedCateRows.map((val) => {
          val.isRecommend = 0
          val.hospitalSort = '0'
          return val
        })
        state.currentItem.hospitalCategories.push(...action.payload.selectedCateRows)
        state.currentItem.hospitalCategories = checkRepeat(state.currentItem.hospitalCategories)
      }

      // console.log(state.deptList)
      return { ...state, ...action.payload }
    },
    editDeptLookUpValues (state, action) {
      // const { selectedCateRows } = action.payload
      // console.log(action.payload.selectedDeptRows)
      if (state.currentItem.hospitalDepartments === undefined || state.currentItem.hospitalDepartments === null) {
        state.currentItem.hospitalDepartments = []
        action.payload.selectedDeptRows.map((val) => {
          val.isSpecial = 0
          val.id = null
          return val.isSpecial
        })
        state.currentItem.hospitalDepartments.push(...action.payload.selectedDeptRows)
      } else {
        action.payload.selectedDeptRows.map((val) => {
          val.isSpecial = 0
          val.id = null
          return val.isSpecial
        })
        state.currentItem.hospitalDepartments.push(...action.payload.selectedDeptRows)
        state.currentItem.hospitalDepartments = checkRepeat(state.currentItem.hospitalDepartments)
      }
      // state.currentItem.hospitalDepartments.push(...action.payload.selectedDeptRows)
      // console.log(state.currentItem.hospitalDepartments)
      return { ...state, ...action.payload }
    },
    editSpecialValues (state, action) {
      return { ...state, ...state.currentItem.hospitalDepartments, ...action.payload }
    },
    editRecommendValues (state, action) {
      return { ...state, ...state.currentItem.hospitalCategories, ...action.payload }
    },
    editSortValues (state, action) {
      return { ...state, ...state.currentItem.hospitalCategories, ...action.payload }
    },
    deleteLookUpValues (state, action) {
      console.log(`delete:${action.payload}`)
      // const { selectedCateRows } = action.payload
      state.currentItem.hospitalCategories = state.currentItem.hospitalCategories.filter(item => item.code !== action.payload)
      console.log(state.currentItem.hospitalCategories)
      return { ...state, ...action.payload }
    },
    deleteDeptValues (state, action) {
      console.log(`delete:${action.payload}`)
      // const { selectedCateRows } = action.payload
      state.currentItem.hospitalDepartments = state.currentItem.hospitalDepartments.filter(item => item.code !== action.payload)
      console.log(state.currentItem.hospitalDepartments)
      return { ...state, ...action.payload }
    },
    uploadIconSuccess (state, { payload }) {
      let newHostpital = state.currentItem
      newHostpital.hospitalIcon = payload
      return { ...state, currentItem: newHostpital }
    },
    rotateIcon (state, { payload }) {
      let newHostpital = state.currentItem
      newHostpital.hospitalIcon = `${newHostpital.hospitalIcon.split('?')[0]}?imageMogr2/rotate/${payload}`
      // console.log(newHostpital.hospitalIcon.split('?imageMogr2/rotate/'))
      // if (newHostpital.hospitalIcon) {
      //   if (newHostpital.hospitalIcon.split('?imageMogr2/rotate/').length === 1) {
      //     newHostpital.hospitalIcon = `${newHostpital.hospitalIcon.split('?')[0]}?imageMogr2/rotate/${payload}`
      //   } else {
      //     const count = newHostpital.hospitalIcon.split('?imageMogr2/rotate/')[1].split('&e=')[0]
      //     newHostpital.hospitalIcon = `${newHostpital.hospitalIcon.split('?')[0]}?imageMogr2/rotate/${parseInt(count, 10) + 90}`
      //   }
      // }

      return { ...state, currentItem: newHostpital }
    },
    rotateImage (state, { payload }) {
      let newHostpital = state.currentItem
      newHostpital.hospitalPic = `${newHostpital.hospitalPic.split('?')[0]}?imageMogr2/rotate/${payload}`

      // if (newHostpital.hospitalPic.split('?imageMogr2/rotate/').length === 1) {
      //   newHostpital.hospitalPic = `${newHostpital.hospitalPic.split('?')[0]}?imageMogr2/rotate/${payload}`
      // } else {
      //   const count = newHostpital.hospitalPic.split('?imageMogr2/rotate/')[1].split('&e=')[0]
      //   newHostpital.hospitalPic = `${newHostpital.hospitalPic.split('?')[0]}?imageMogr2/rotate/${parseInt(count, 10) + 90}`
      // }
      return { ...state, currentItem: newHostpital }
    },
    uploadImageSuccess (state, { payload }) {
      let newHostpital = state.currentItem
      newHostpital.hospitalPic = payload
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
    updateCateState (state, action) {
      return { ...state, ...action.payload }
    },
    notDeptPageVisible (state) {
      return { ...state, deptPageVisible: false }
    },
    deptPageVisible (state) {
      return { ...state, deptPageVisible: true }
    },
    deptLookUpModalVisi (state) {
      return { ...state, deptLookUpVisible: true }
    },
    hideLookUpModal (state) {
      return { ...state, deptLookUpVisible: false }
    },
    editDeptVisible (state, action) {
      return { ...state, ...action.payload, editDeptVisible: true }
    },
    clearCurrent (state) {
      return { ...state, currentItem: {} }
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
    // updateSuccess (state, action) {
    //   const newUser = action.payload
    //   const newList = state.list.map((hospital) => {
    //     if (hospital.id === newUser.id) {
    //       return { ...hospital, ...newUser }
    //     }
    //     return hospital
    //   })
    //   return { ...state, list: newList }
    // },
    updateQueryKey (state, action) {
      return { ...state, ...action.payload }
    },
    querySuccess2 (state, { payload }) {
      const { deptList } = payload
      return {
        ...state,
        deptList,
      }
    },
    queryCateSuccess (state, { payload }) {
      const { cateList } = payload
      return {
        ...state,
        cateList,
      }
    },
    visiMap (state, action) {
      return { ...state, ...action.payload, visiMap: true }
    },
    unvisiMap (state, action) {
      return { ...state, ...action.payload, visiMap: false }
    },
    addPanes (state, { payload }) {
      console.log(payload)
      // let { panes } = state
      // panes.push({ title: 'New Tab', content: payload.name, closable: true })
      return {
        ...state,
      }
    },
    removePanes (state, action) {
      const { panes } = action.payload
      console.log(panes)
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
    querySecondDeptSuccess (state, action) {
      return { ...state, ...action.payload }
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

      const { content: deptData } = yield call(queryDept, { ...payload })

      yield put({
        type: 'querySuccess2',
        payload: {
          deptList: deptData,
        },
      })
    },
    *queryTrueDoc ({ payload }, { call, put }) {
      const { success: successDept, /* totalCount: total, page: pageNum, pageSize,*/ data: content } = yield call(queryTrueDoc, { ...payload, pageSize: 1000 })
      if (successDept) {
        yield put({
          type: 'createSuccess',
          payload: {
            trueDocList: content,
            // pagination: {
            //   total,
            //   pageSize: Number(pageSize) || 10,
            //   current: Number(pageNum),
            // },
          },
        })
      }
    },
    *queryFalseDoc ({ payload }, { call, put }) {
      const { success: successDept, /* totalCount: total, page: pageNum, pageSize,*/ content } = yield call(queryFalseDoc, { ...payload, pageSize: 1000 })
      if (successDept) {
        yield put({
          type: 'createSuccess',
          payload: {
            falseDocList: content,
            // pagination: {
            //   total,
            //   pageSize: Number(pageSize) || 10,
            //   current: Number(pageNum),
            // },
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
    *queryCate ({ payload }, { call, put }) {
      const { success: successDept, data: deptData } = yield call(queryCate, { ...payload })
      if (successDept) {
        yield put({
          type: 'queryCateSuccess',
          payload: {
            cateList: deptData,
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
            selectedRowKeys: [],
            selectedDeptRowKeys: [],
          },
        })
      } else {
        message.error(`查询失败! ${data.message}`)
      }
    },
    *editDept ({ payload }, { call, put }) {
      const data = yield call(queryUser, payload)
      if (data.success) {
        return true
      } else {
        yield put({
          type: 'editDeptVisible',

        })
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
    *queryHospitalRank ({ payload }, { call, put }) {
      const data = yield call(queryHospitalRank, parse({ ...payload }))

      if (data) {
        yield put({
          type: 'querySelectValue',
          payload: {
            hospitalRank: data.data,
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
            hospitalCategories: data.data,
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
            hospitalSpecial: data.data,
          },
        })
      }
    },
    *syncES ({ payload }, { call, put }) {
      const { success } = yield call(toHospitalES, { ...payload })
      if (success) {
        message.success('同步到ES成功！')
        yield put({
          type: 'changeLoadES',
          payload: {
            loadES: false,
          },
        })
      } else {
        message.error('同步到ES失败！')
        yield put({
          type: 'changeLoadES',
          payload: {
            loadES: false,
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
      const icon = yield select(({ updateHospital }) => updateHospital.currentItem.hospitalIcon)
      const img = yield select(({ updateHospital }) => updateHospital.currentItem.hospitalPic)
      const data = yield call(create, { ...payload, hospitalIcon: icon, hospitalPic: img })
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put(routerRedux.push({
          pathname: '/hospitals',
        }))
      } else {
        throw data
      }
    },
    *update ({ payload }, { call, put, select }) {
      const code = yield select(({ updateHospital }) => updateHospital.currentItem.code)
      const icon = yield select(({ updateHospital }) => updateHospital.currentItem.hospitalIcon)
      const img = yield select(({ updateHospital }) => updateHospital.currentItem.hospitalPic)
      const data = yield call(update, { ...payload, code, hospitalIcon: icon, hospitalPic: img })
      if (data.success) {
        yield put({ type: 'hideModal' })
        message.success('修改成功！')
        yield put({
          type: 'changeLoadOK',
          payload: {
            loadOK: false,
          },
        })
        yield put({
          type: 'changeLoadES',
          payload: {
            loadES: true,
          },
        })
        yield put({
          type: 'syncES',
          payload: {
            code: code,
          },
        })
      } else {
        yield put({
          type: 'changeLoadOK',
          payload: {
            loadOK: false,
          },
        })
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

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match1 = pathToRegexp('/hospitals/update/:code').exec(location.pathname)
        // if (location.pathname.includes('update')) {
        //   dispatch(
        //     routerRedux.push({
        //       pathname: '/hospitals',
        //     }),
        //   )
        // }
        if (match1 !== null) {
          if (match1[1] !== 'new') {
            dispatch({
              type: 'edit',
              payload: {
                code: match1[1],
              },
            })
          }
          if (match1[1] === 'new') {
            dispatch({
              type: 'createSuccess',
              payload: {
                modalType: 'create',
              },
            })
          }
          const data = getLocalStorageJson('roles')
          dispatch({
            type: 'clearCurrent',
          })
          dispatch({
            type: 'fetchUploadToken',
            payload: {
              bucket: 'jkgj-hosp',
            },
          })
          dispatch({
            type: 'queryHospitalRank',
            payload: {},
          })
          dispatch({
            type: 'queryHospitalCategory',
            payload: {},
          })
          dispatch({
            type: 'queryDept',
            payload: {},
          })
          dispatch({
            type: 'queryCate',
            payload: {},
          })
          // dispatch({
          //   type: 'queryDept',
          //   payload: {},
          // })
          dispatch({
            type: 'queryHospitalLevel',
            payload: {},
          })
          // dispatch({
          //   type: 'queryHospitalSpecial',
          //   payload: {},
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
