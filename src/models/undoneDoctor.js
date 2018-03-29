// import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
// import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { getRotateImg, updateUndoneDoctor, queryUndoneDoc, getUploadToken, queryDept, queryChildDept, queryCate, updateHospitalName, create, remove, batchRemove } from '../services/doctor'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'undoneDoctor',

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
    fileList: 1,
  },

  reducers: {
    editHospital (state, action) {
      // const { selectedCateRows } = action.payload
      if (state.currentItem.hospital === undefined) {
        state.currentItem.hospital = []
        state.currentItem.hospital.hospitalName = action.payload.setHospital[0].name
        state.currentItem.hospital.hospitalCode = action.payload.setHospital[0].code
        state.currentItem.hospital.hospitalLevelName = action.payload.setHospital[0].levelName
        state.currentItem.hospital.isTop = (action.payload.setHospital[0].isTop === 1)
        state.currentItem.hospital.isInsurance = (action.payload.setHospital[0].isInsurance === 1)
      } else {
        state.currentItem.hospital.hospitalName = action.payload.setHospital[0].name
        state.currentItem.hospital.hospitalCode = action.payload.setHospital[0].code
        state.currentItem.hospital.hospitalLevelName = action.payload.setHospital[0].levelName
        state.currentItem.hospital.isTop = (action.payload.setHospital[0].isTop === 1)
        state.currentItem.hospital.isInsurance = (action.payload.setHospital[0].isInsurance === 1)
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
    uploadQualiSuccess (state, action) {
      if (state.currentItem.qualification === undefined) {
        state.currentItem.qualification = {}
        state.currentItem.qualification.images = []
        state.currentItem.qualification.images[0] = action.payload
      } else {
        if (state.currentItem.qualification.images === null) {
          state.currentItem.qualification.images = []
          state.currentItem.qualification.images[0] = action.payload
        } else {
          state.currentItem.qualification.images[0] = action.payload
        }
      }
      return { ...state, ...action.payload }
    },
    uploadQuali2Success (state, action) {
      if (state.currentItem.qualification === undefined) {
        state.currentItem.qualification = {}
        state.currentItem.qualification.images = []
        state.currentItem.qualification.images[1] = action.payload
      } else {
        if (state.currentItem.qualification.images === null) {
          state.currentItem.qualification.images = []
          state.currentItem.qualification.images[1] = action.payload
        } else {
          state.currentItem.qualification.images[1] = action.payload
        }
      }
      return { ...state, ...action.payload }
    },
    uploadTitleSuccess (state, action) {
      if (state.currentItem.title === undefined) {
        state.currentItem.title = {}
        state.currentItem.title.titleImageList = []
        state.currentItem.title.titleImageList[0] = action.payload
      } else {
        if (state.currentItem.title.titleImageList === null) {
          state.currentItem.title.titleImageList = []
          state.currentItem.title.titleImageList[0] = action.payload
        } else {
          state.currentItem.title.titleImageList[0] = action.payload
        }
      }
      return { ...state, ...action.payload }
    },
    uploadTitleSuccess2 (state, action) {
      if (state.currentItem.title === undefined) {
        state.currentItem.title = {}
        state.currentItem.title.titleImageList = []
        state.currentItem.title.titleImageList[1] = action.payload
      } else {
        if (state.currentItem.title.titleImageList === null) {
          state.currentItem.title.titleImageList = []
          state.currentItem.title.titleImageList[1] = action.payload
        } else {
          state.currentItem.title.titleImageList[1] = action.payload
        }
      }
      return { ...state, ...action.payload }
    },
    uploadTitleSuccess3 (state, action) {
      if (state.currentItem.title === undefined) {
        state.currentItem.title = {}
        state.currentItem.title.titleImageList = []
        state.currentItem.title.titleImageList[2] = action.payload
      } else {
        if (state.currentItem.title.titleImageList === null) {
          state.currentItem.title.titleImageList = []
          state.currentItem.title.titleImageList[2] = action.payload
        } else {
          state.currentItem.title.titleImageList[2] = action.payload
        }
      }
      return { ...state, ...action.payload }
    },
    uploadTitleSuccess4 (state, action) {
      if (state.currentItem.title === undefined) {
        state.currentItem.title = {}
        state.currentItem.title.titleImageList = []
        state.currentItem.title.titleImageList[3] = action.payload
      } else {
        if (state.currentItem.title.titleImageList === null) {
          state.currentItem.title.titleImageList = []
          state.currentItem.title.titleImageList[3] = action.payload
        } else {
          state.currentItem.title.titleImageList[3] = action.payload
        }
      }
      return { ...state, ...action.payload }
    },
    uploadTitleSuccess5 (state, action) {
      if (state.currentItem.title === undefined) {
        state.currentItem.title = {}
        state.currentItem.title.titleImageList = []
        state.currentItem.title.titleImageList[4] = action.payload
      } else {
        if (state.currentItem.title.titleImageList === null) {
          state.currentItem.title.titleImageList = []
          state.currentItem.title.titleImageList[4] = action.payload
        } else {
          state.currentItem.title.titleImageList[4] = action.payload
        }
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
  },

  effects: {
    *fetchUploadToken ({ payload }, { call, put }) {
      const { token } = yield call(getUploadToken, payload)
      yield put({
        type: 'fetchUploadTokenSuccess',
        payload: token,
      })
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
    *editUndone ({ payload }, { call, put }) {
      const data = yield call(queryUndoneDoc, payload)
      if (data.success) {
        // message.success(data.message)
        yield put({
          type: 'showFakeModal',
          payload: {
            modalType: 'update',
            currentItem: data,
          },
        })
        // yield put(
        //   routerRedux.push({
        //     pathname: `/doctors/editUndone/${payload.code}`,
        //   })
        // )
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
    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'queryFake' })
      } else {
        throw data
      }
    },
    *update ({ payload }, { call, put, select }) {
      const image = yield select(({ undoneDoctor }) => undoneDoctor.currentItem.image)

      const data = yield call(updateUndoneDoctor, { ...payload, image })
      if (data.success) {
        message.success(data.message)
        yield put({ type: 'hideModal' })
        yield put({ type: 'queryFake' })
      } else {
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
    *getRotateImg ({ payload }, { call, put, select }) {
      const item = yield select(({ undoneDoctor }) => undoneDoctor.currentItem)
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
        const match = pathToRegexp('/doctors/editUndone/:uid').exec(location.pathname)
        if (match) {
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
          dispatch({
            type: 'fetchUploadToken',
            payload: {
              bucket: 'jkgj-hosp',
            },
          })
          dispatch({
            type: 'editUndone',
            payload: { uid: match[1] },
          })
        }
      })
    },
  },
})
