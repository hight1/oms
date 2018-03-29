import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { getRotateImg, queryTag, sendFcSms, queryUndone, realDocsES, updateRealDoctor, queryRealDoc, getUploadToken, queryDept, queryChildDept, queryHospital, queryFake, updateHospitalName, query, create, remove, batchRemove, queryUser } from '../services/doctor'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {

  namespace: 'doctor',

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
    qualifVisi: false,
    qualifVisi2: false,
    tagList: [],
    type: '1',
    rotateImg: '',
    isOK: false,
    isES: false,
  },

  reducers: {
    changeOk (state, action) {
      return { ...state, ...action.payload, isOK: action.payload.isOK }
    },
    changeES (state, action) {
      return { ...state, ...action.payload, isES: action.payload.isES }
    },
    changeType (state, action) {
      return { ...state, type: action.payload.type }
    },
    editLookUpValues (state, action) {
      // const { selectedCateRows } = action.payload
      // if (state.currentItem.hospitalCategories === undefined) {
      //   state.currentItem.hospitalCategories = []
      //   state.currentItem.hospitalCategories.push(...action.payload.selectedCateRows)
      // } else {
      //   state.currentItem.hospitalCategories.push(...action.payload.selectedCateRows)
      // }
      return { ...state, ...state.setHospital, ...action.payload }
    },
    deleteLookUpValues (state, action) {
      // const { selectedCateRows } = action.payload
      state.currentItem.hospitalCategories = state.currentItem.hospitalCategories.filter(item => item.code !== action.payload)
      return { ...state, ...action.payload }
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
    queryDoctorSuccess (state, action) {
      return { ...state, ...action.payload }
    },
    queryFakeDoctorSuccess (state, action) {
      return { ...state, ...action.payload }
    },
    queryUndoneDoctorSuccess (state, action) {
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
    rotateImage (state, action) {
      let newItem = state.currentItem
      // console.log(action.payload.rotateImg)
      newItem.image = action.payload.rotateImg
      state.currentItem.image = action.payload.rotateImg
      return { ...state, currentItem: newItem }
    },
    fetchUploadTokenSuccess (state, { payload }) {
      return { ...state, uploadToken: payload }
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
      const { success, totalCount: total, page, pageSize, data } = yield call(query, parse({ ...payload, hospitalCode: '',
      }))
      if (success) {
        yield put({
          type: 'queryDoctorSuccess',
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
    *queryFake ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalCount: total, page, pageSize, content: data } = yield call(queryFake, parse({ ...payload }))
      if (success) {
        yield put({
          type: 'queryFakeDoctorSuccess',
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
    *queryUndone ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalCount: total, page, pageSize, data } = yield call(queryUndone, parse({ ...payload, type: 0 }))
      if (success) {
        yield put({
          type: 'queryUndoneDoctorSuccess',
          payload: {
            undoneList: data,
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
      const { success: successDept, data: deptData, total, pageNum, pageSize } = yield call(queryHospital, { ...payload })
      if (successDept) {
        yield put({
          type: 'queryCateSuccess',
          payload: {
            cateList: deptData,
            pagination: {
              total,
              pageSize: Number(pageSize),
              current: Number(pageNum),
            },
          },
        })
        yield put({
          type: 'deptPageVisible',
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
          type: 'updateQueryKey',
          payload: {
            tagList: data,
          },
        })
      }
    },
    *sendFcSms ({ payload }, { call }) {
      const { success } = yield call(sendFcSms, { ...payload })
      if (success) {
        message.success('成功发送短信！')
      } else {
        message.error('发送短信失败！')
      }
    },
    *syncES ({ payload }, { call, put }) {
      const { success } = yield call(realDocsES, { ...payload })
      if (success) {
        message.success('同步到ES成功！')
        yield put({
          type: 'changeES',
          payload: {
            isES: false,
          },
        })
      } else {
        message.error('同步到ES失败！')
        yield put({
          type: 'changeES',
          payload: {
            isES: false,
          },
        })
      }
    },
    *edit ({ payload }, { call, put }) {
      const data = yield call(queryRealDoc, payload)
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
    *editFake ({ payload }, { call, put }) {
      const data = yield call(queryUser, payload)
      if (data.success) {
        yield put({
          type: 'showFakeModal',
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
    *'multiFakeDelete' ({ payload }, { call, put }) {
      const data = yield call(batchRemove, payload)
      if (data.success) {
        message.success(data.message)
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'queryFake' })
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
    *update ({ payload }, { call, put, select }) {
      const image = yield select(({ doctor }) => doctor.currentItem.image)
      const data = yield call(updateRealDoctor, { ...payload, image })
      if (data.success) {
        yield put({
          type: 'changeOk',
          payload: {
            isOK: false,
          },
        })
        yield put({ type: 'hideModal' })
        // yield put({ type: 'query' })
        yield put({
          type: 'changeES',
          payload: {
            isES: true,
          },
        })
        yield put({
          type: 'syncES',
          payload: {
            code: payload.code,
          },
        })
        message.success('修改成功！')
      } else {
        yield put({
          type: 'changeOk',
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
    *fetchUploadToken ({ payload }, { call, put }) {
      const { token } = yield call(getUploadToken, payload)
      yield put({
        type: 'fetchUploadTokenSuccess',
        payload: token,
      })
    },
    *getRotateImg ({ payload }, { call, put, select }) {
      const item = yield select(({ doctor }) => doctor.currentItem)
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
        const match = pathToRegexp('/doctors').exec(location.pathname)
        const match2 = pathToRegexp('/doctors/edit/:code').exec(location.pathname)
        if (match2) {
          dispatch({
            type: 'clearState',
            payload: { currentItem: {} },
          })
          dispatch({
            type: 'queryTag',
            payload: {
              type: 3,
            },
          })
          dispatch({
            type: 'edit',
            payload: { code: match2[1] },
          })
          dispatch({
            type: 'fetchUploadToken',
            payload: {
              bucket: 'jkgj-hosp',
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
            payload: {
              ...location.query,
              type: '1',
            },
          })
        }
      })
    },
  },
})
