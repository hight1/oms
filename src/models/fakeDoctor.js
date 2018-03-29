import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
// import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { queryTitle, getRotateImg, fakeDocsES, getUploadToken, queryDept, queryChildDept, queryCate, queryFake, updateHospitalName, create, update, remove, batchRemove, queryUser } from '../services/doctor'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'fakeDoctor',

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
    selectedCateRows: [],
    fakeModalVisi: false,
    realModalVisi: false,
    deptPageVisible: false,
    lookUpCateValues: [],
    cateList: [],
    deptList: [],
    deptLookUpVisible: false,
    selectedDeptRowKeys: [],
    selectedDeptRows: [],
    deptLookData: [],
    setHospital: [],
    setDept: [],
    uploadToken: '',
    isOk: false,
    isES: false,
    titleList: [],
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
      if (state.currentItem.hospital === undefined) {
        state.currentItem.hospital = []
        state.currentItem.hospital.hospitalName = action.payload.setHospital[0].name
        state.currentItem.hospital.hospitalCode = action.payload.setHospital[0].code
        state.currentItem.hospital.hospitalLevelName = action.payload.setHospital[0].levelName
        state.currentItem.hospital.isTop = (action.payload.setHospital[0].isTop === 1)
        state.currentItem.hospital.isInsurance = (action.payload.setHospital[0].isInsurance === 1)
        if (state.currentItem.location === undefined) {
          state.currentItem.location = {}
          state.currentItem.location.lat = action.payload.setHospital[0].lat
          state.currentItem.location.lon = action.payload.setHospital[0].lon
          state.currentItem.location.areaCode = action.payload.setHospital[0].areaCode
        }
      } else {
        state.currentItem.hospital.hospitalName = action.payload.setHospital[0].name
        state.currentItem.hospital.hospitalCode = action.payload.setHospital[0].code
        state.currentItem.hospital.hospitalLevelName = action.payload.setHospital[0].levelName
        state.currentItem.hospital.isTop = (action.payload.setHospital[0].isTop === 1)
        state.currentItem.hospital.isInsurance = (action.payload.setHospital[0].isInsurance === 1)
        if (state.currentItem.location === undefined) {
          state.currentItem.location = {}
          state.currentItem.location.lat = action.payload.setHospital[0].lat
          state.currentItem.location.lon = action.payload.setHospital[0].lon
          state.currentItem.location.areaCode = action.payload.setHospital[0].areaCode
        }
      }
      return { ...state, ...action.payload }
    },
    editDept (state, action) {
      // const { selectedCateRows } = action.payload
      if (state.currentItem.dept === undefined) {
        state.currentItem.dept = []
        state.currentItem.dept.deptName = action.payload.setDept[0].name
        state.currentItem.dept.deptCode = action.payload.setDept[0].code
        state.currentItem.dept.parentDeptName = action.payload.setDept[0].parentName
      } else {
        state.currentItem.dept.deptName = action.payload.setDept[0].name
        state.currentItem.dept.deptCode = action.payload.setDept[0].code
        state.currentItem.dept.parentDeptName = action.payload.setDept[0].parentName
      }

      return { ...state, ...action.payload }
    },
    rotateImage (state, action) {
      let newItem = state.currentItem
      // console.log(action.payload.rotateImg)
      newItem.image = action.payload.rotateImg
      state.currentItem.image = action.payload.rotateImg
      return { ...state, currentItem: newItem }
    },
    editSpecialValues (state, action) {
      return { ...state, ...state.currentItem.hospitalDepartments, ...action.payload }
    },
    deptLookUpModalVisi (state) {
      return { ...state, deptLookUpVisible: true }
    },
    hideLookUpModal (state) {
      return { ...state, deptLookUpVisible: false }
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
      return { ...state, modalVisible: false, modalType: 'create' }
    },
    hideUpModal (state) {
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
    queryDoctorSuccess (state, action) {
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
    querySecondDeptSuccess (state, action) {
      return { ...state, ...action.payload }
    },
    querySuccess2 (state, { payload }) {
      const { deptList } = payload
      return {
        ...state,
        deptList,
      }
    },
    fetchUploadTokenSuccess (state, { payload }) {
      return { ...state, uploadToken: payload }
    },
    uploadIconSuccess (state, { payload }) {
      let newHostpital = state.currentItem
      newHostpital.image = payload
      return { ...state, currentItem: newHostpital }
    },
    clearState (state, action) {
      return { ...state, ...action.payload }
    },
    takeTitle (state, action) {
      console.log(action.payload)
      return { ...state }
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
    *queryFake ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalCount: total, page, pageSize, data } = yield call(queryFake, parse({ ...payload }))
      if (success) {
        yield put({
          type: 'queryDoctorSuccess',
          payload: {
            fakeList: data,
            pagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(page),
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
    *queryCate ({ payload }, { call, put }) {
      const { success: successDept, data: deptData, total, pageSize, pageNum } = yield call(queryCate, { ...payload })
      if (successDept) {
        yield put({
          type: 'queryCateSuccess',
          payload: {
            cateList: deptData,
            pagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(pageNum),
            },
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
    *syncES ({ payload }, { call, put }) {
      const { success } = yield call(fakeDocsES, { ...payload })
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
        message.error('同步到ES失败!')
      }
    },
    *editFake ({ payload }, { call, put }) {
      if (payload.code === 'new') { return true }
      const data = yield call(queryUser, payload)
      if (data.success) {
        yield put({
          type: 'showFakeModal',
          payload: {
            modalType: 'update',
            currentItem: data,
          },
        })
        // yield put({
        //   type: 'fetchUploadToken',
        //   payload: {
        //     bucket: 'jkgj-hosp',
        //   },
        // })
        // yield put(
        //   routerRedux.push({
        //     pathname: `/doctors/editFake/${payload.code}`,
        //   })
        // )
      } else {
        message.error(`查询失败!${data.message}`)
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
        message.success(data.message)
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *create ({ payload }, { call, put, select }) {
      const image = yield select(({ fakeDoctor }) => fakeDoctor.currentItem.image)
      const data = yield call(create, { ...payload, image })
      if (data.success) {
        message.success(data.message)
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *update ({ payload }, { call, put, select }) {
      const image = yield select(({ fakeDoctor }) => fakeDoctor.currentItem.image)
      const data = yield call(update, { ...payload, image })
      if (data.success) {
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
        message.success(data.message)
        yield put({ type: 'hideUpModal' })
      } else {
        yield put({
          type: 'changeOK',
          payload: {
            isOK: false,
          },
        })
        throw data
      }
    },
    *changeHospitalName ({ payload }, { call, put }) {
      const { newHospitalName } = payload
      const newHospital = { hospitalName: newHospitalName }
      const data = yield call(updateHospitalName, newHospital)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *queryTitle ({ payload }, { call, put }) {
      const data = yield call(queryTitle)
      if (data.success) {
        yield put({
          type: 'takeTitle',
          payload: data,
        })
      } else {
        throw data
      }
    },
    *getRotateImg ({ payload }, { call, put, select }) {
      const item = yield select(({ fakeDoctor }) => fakeDoctor.currentItem)
      console.log(item)
      item.image = `${item.image.split('?')[0]}?imageMogr2/rotate/${payload.deg}`
      const { downloadUrls } = yield call(getRotateImg, { bucket: item.image })
      yield put({
        type: 'rotateImage',
        payload: {
          rotateImg: downloadUrls[0],
        },
      })
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/doctors/editFake/:code').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'clearState',
            payload: { currentItem: {} },
          })
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
          // dispatch({
          //   type: 'queryTitle',
          // })
          dispatch({
            type: 'fetchUploadToken',
            payload: {
              bucket: 'jkgj-hosp',
            },
          })
          dispatch({
            type: 'editFake',
            payload: { code: match[1] },
          })
        }
      })
    },
  },
})
