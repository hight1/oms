import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import { connect } from 'dva'

import DoctorVerifyModal from '../../../components/DoctorVerify/DoctorVerifyModal'


let searchHospitalList = (dispatch, name) => {
  dispatch({
    type: 'verifyDoctorVerify/changeFetching',
  })
  dispatch({
    type: 'verifyDoctorVerify/searchHospitalName',
    payload: { keyword: name },
  })
}
searchHospitalList = debounce(searchHospitalList, 1000)
// let searchDeptName = (dispatch, name) => {
//   dispatch({
//     type: 'doctorVerify/changeFetching2',
//   })
//   dispatch({
//     type: 'doctorVerify/searchDeptName',
//     payload: {
//       name: name,
//       results: 30,
//     },
//   })
// }
// searchDeptName = debounce(searchDeptName, 1000)
let getNewName = (dispatch, value) => {
  dispatch({
    type: 'verifyDoctorVerify/changeFetching2',
  })
  dispatch({
    type: 'verifyDoctorVerify/searchSecondDept',
    payload: {
      hospitalCode: value.key,
      results: 1000,
    },
  })
}
getNewName = debounce(getNewName, 1000)

function VerifyDoctorVerify ({ verifyDoctorVerify, loading, dispatch }) {
  const {
    // list,
    // searchMode,
    // keyword,
    pagination,
    currentItem,
    selectedRowKeys,
    // modalVisible,
    modalType,
    judgeStatus,
    hospitalName,
    hospitalNameDisabled,
    secondDeptNameDisable,
    deptNameDisable,
    parentDept,
    authRemarkWarning,
    reason,
    deptName,
    fetching,
    fetchingDeptName,
    deptList,
    hospitalList,
    hospitalValue,
    deptValue,
    vcPriceDisable,
    vcPriceList,
    deptPageVisible,
    cateList,
    selectedCateRows,
    setHospital,
    setDept,
    deptLookUpVisible,
    selectedDeptRowKeys,
    deptLookData,
    selectedDeptRows,
    failureTag,
    tagList,
    editStatus,
    qualifVisi,
    qualifVisi2,
    failReason,
    isOK,
    isES,
  } = verifyDoctorVerify


  const doctorVerifyModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    // visible: modalVisible,
    maskClosable: false,
    confirmLoading: modalType === 'create' ? loading.effects['verifyDoctorVerify/create'] : loading.effects['verifyDoctorVerify/update'],
    title: `${modalType === 'create' ? '创建医师' : '认证医师'}`,
    wrapClassName: 'vertical-center-modal',
    isOK,
    isES,
    onOk (data) {
      dispatch({
        type: 'verifyDoctorVerify/update',
        payload: data,
      })
      dispatch({
        type: 'verifyDoctorVerify/changeOK',
        payload: {
          isOK: true,
        },
      })
      dispatch({
        type: 'verifyDoctorVerify/notEditHospitalName',
      })
      dispatch({
        type: 'verifyDoctorVerify/notEditDeptName',
      })
      dispatch({
        type: 'verifyDoctorVerify/notEditFirstDeptName',
      })
      dispatch({
        type: 'verifyDoctorVerify/notEditVcPrice',
      })
      // dispatch(
      //         routerRedux.push({
      //           pathname: '/physician-auths',
      //         }),
      //       )
    },
    onCancel () {
      dispatch({
        type: 'verifyDoctorVerify/hideModal',
      })
      dispatch({
        type: 'verifyDoctorVerify/notEditHospitalName',
      })
      dispatch({
        type: 'verifyDoctorVerify/notEditDeptName',
      })
      dispatch({
        type: 'verifyDoctorVerify/notEditFirstDeptName',
      })
      dispatch({
        type: 'verifyDoctorVerify/notEditVcPrice',
      })
      dispatch({
        type: 'verifyDoctorVerify/notDeptPageVisible',
      })
      dispatch({
        type: 'verifyDoctorVerify/hideLookUpModal',
      })
    },
    handleChange (val) {
      const value = val
      value === 2 || value === '2' ?
      dispatch({
        type: 'verifyDoctorVerify/changeTextarea',
        payload: {
          judgeStatus: value,
        },
      })
      :
      dispatch({
        type: 'verifyDoctorVerify/changeTextarea',
        payload: {
          judgeStatus: value,
        },
      })

      dispatch({
        type: 'verifyDoctorVerify/queryTag',
        payload: {
          type: val === '2' ? 2 : 1,
        },
      })
    },
    onChangeHospitalName () {
      dispatch({
        type: 'verifyDoctorVerify/editHospitalName',
      })
    },
    onChangeSecondDeptName () {
      dispatch({
        type: 'verifyDoctorVerify/editFirstDeptName',
      })
    },
    editVcPrice () {
      dispatch({
        type: 'verifyDoctorVerify/editVcPrice',
      })
    },
    changeDeptName (payload) {
      dispatch({
        type: 'verifyDoctorVerify/editDeptName',
        payload,
      })
    },
    getNewName (value) {
      getNewName(dispatch, value)
      console.log(value)
      // dispatch({
      //   type: 'doctorVerify/searchSecondDept',
      //   payload: {
      //     name: value.key,
      //     results: 30,
      //   },
      // })
    },
    judgeStatus,
    hospitalNameDisabled,
    secondDeptNameDisable,
    deptNameDisable,
    vcPriceDisable,
    hospitalName,
    parentDept,
    deptName,
    authRemarkWarning,
    reason,
    hospitalList,
    fetching,
    fetchingDeptName,
    deptList,
    hospitalValue,
    deptValue,
    vcPriceList,
    searchHospitalList (name) {
      searchHospitalList(dispatch, name)
    },
    // searchDeptName (name) {
    //   searchDeptName(dispatch, name)
    // },
    onChangeDeptName (payload) {
      dispatch({
        type: 'verifyDoctorVerify/updateDept',
        payload,
      })
    },
    // onChangeHospital (payload) {
    //   dispatch({
    //     type: 'doctorVerify/updateHospital',
    //     payload,
    //   })
    // },
    // /////////// 医院分类参照页 /////////
    setHospital,
    cateDataSource: cateList,
    deptPageVisible: deptPageVisible,
    rowSelection: {
      type: 'radio',
      selectedRowKeys,
      onChange: (keys, selectedRow) => {
        console.log(selectedRow)
        dispatch({
          type: 'verifyDoctorVerify/updateCateState',
          payload: {
            selectedRowKeys: keys,
            selectedCateRows: selectedRow,
          },
        })
      },
    },
    handleOk () {
      // dispatch({
      //   type: 'verifyDoctorVerify/editLookUpValues',
      //   payload: {
      //     lookUpCateValues: selectedRowKeys,
      //     selectedCateRows,
      //   },
      // })
      console.log(selectedCateRows)
      dispatch({
        type: 'verifyDoctorVerify/editHospital',
        payload: {
          setHospital: selectedCateRows,
        },
      })
      dispatch({
        type: 'verifyDoctorVerify/notDeptPageVisible',
      })
      // console.log(`handleok:${selectedRowKeys}`)
      // console.log(`handleok object:${selectedCateRows}`)
    },
      // onOk (data) {
      //   dispatch({
      //     type: `hospitalCate/${modalType}`,
      //     payload: data,
      //   })
      // },
    handleCateDelete (code) {
      console.log(code)
      dispatch({
        type: 'verifyDoctorVerify/deleteLookUpValues',
        payload: code,
      })
    },
    showCateModal () {
      dispatch({
        type: 'verifyDoctorVerify/queryCate',
        payload: {},
      })
      dispatch({
        type: 'verifyDoctorVerify/deptPageVisible',
      })
    },
    handleDeptCancel () {
      dispatch({
        type: 'verifyDoctorVerify/notDeptPageVisible',
      })
    },
    HospitalPagination: {
      ...pagination,
      onChange (page, pageSize) {
        dispatch({
          type: 'verifyDoctorVerify/queryCate',
          payload: { page, pageSize },
        })
      },
    },
    onHosiSearch (kw) {
      dispatch({
        type: 'verifyDoctorVerify/queryCate',
        payload: {
          keyword: kw,
        },
      })
    },
    // /////////////////////////////////////////////////////////////////////////


    // /////////// 科室参照页 /////////
    setDept,
    deptLookUpList: deptList,
    deptLookUpVisible, // 是否显示
    selectedDeptRowKeys,
    deptLookData, // 过滤出的子科室
    deptLookUpSelection: {
      type: 'radio', // 单选多选
      selectedDeptRowKeys,
      onChange: (keys, selectedRow) => {
        console.log(keys)
        dispatch({
          type: 'verifyDoctorVerify/updateCateState',
          payload: {
            selectedDeptRowKeys: keys,
            selectedDeptRows: selectedRow,
          },
        })
      },
    },
    handleDeptLookOk () {
      // dispatch({
      //   type: 'verifyDoctorVerify/editDeptLookUpValues',
      //   payload: {
      //     lookUpCateValues: selectedDeptRowKeys,
      //     selectedDeptRows,
      //   },
      // })
      dispatch({
        type: 'verifyDoctorVerify/editDept',
        payload: {
          setDept: selectedDeptRows,
        },
      })
      dispatch({
        type: 'verifyDoctorVerify/hideLookUpModal',
      })
      // console.log(`lookupmodal:${selectedDeptRowKeys}`)
      // console.log(selectedDeptRows)
    }, // 回掉函数
    DeptLookupCancel () {
      dispatch({
        type: 'verifyDoctorVerify/hideLookUpModal',
      })
    },
    onShow (code) {
      dispatch({
        type: 'verifyDoctorVerify/querySecondDept',
        payload: {
          parentCode: code,
        },
      })
    },
    handleDeptDelete (code) {
      console.log(code)
      dispatch({
        type: 'verifyDoctorVerify/deleteDeptValues',
        payload: code,
      })
    },
    showDeptLookUpModal () {
      dispatch({
        type: 'verifyDoctorVerify/deptLookUpModalVisi',
      })
      dispatch({
        type: 'verifyDoctorVerify/queryDept',
      })
      // dispatch({
      //   type: 'verifyDoctorVerify/querySecondDept',
      //   payload: {
      //     parentCode: currentItem.deptCode || '236',
      //   },
      // })
    },
    onSpecialChange (record, e) {  //  医院科室列表 编辑是否医院特色
      // console.log(e.target.value)
      record.isSpecial = e.target.value
      // console.log(record)
      dispatch({
        type: 'verifyDoctorVerify/editSpecialValues',
        payload: record,
      })
    },
    onDeptSearch (val) {
      dispatch({
        type: 'verifyDoctorVerify/querySecondDept',
        payload: {
          keyword: val,
          parentCode: '',
        },
      })
    },
    // //////////////////////////////////////////////////////////////////////////
    // / ///////////失败标签////////
    handleTagsChange (tag, data) {
      dispatch({
        type: 'verifyDoctorVerify/editTags',
        payload: { tag: tag.content, data },
      })
      // console.log(data)
      console.log(tag)
    },
    failureTag,
    tagList,
    editStatus,

    // ////////////////////////////////////////////////////////////////////////////
    // /////////////////同步至ES //////////////
    handleES (code) {
      dispatch({
        type: 'verifyDoctorVerify/syncES',
        payload: {
          code: code,
        },
      })
    },
    // /////////////////////////////////////////
    // //////////////图片弹窗 //////////////////
    qualifPic () {
      dispatch({
        type: 'verifyDoctorVerify/showPic',
      })
    },
    qualifVisi,
    qualifUNVisi () {
      dispatch({
        type: 'verifyDoctorVerify/unshowPic',
      })
    },
    qualifPic2 () {
      dispatch({
        type: 'verifyDoctorVerify/showPic2',
      })
    },
    qualifVisi2,
    qualifUNVisi2 () {
      dispatch({
        type: 'verifyDoctorVerify/unshowPic2',
      })
    },
    // /////////////////////////////////////////
    failReason,
  }

  return (
    <div className="content-inner">
      <DoctorVerifyModal {...doctorVerifyModalProps} />
    </div>
  )
}

VerifyDoctorVerify.propTypes = {
  verifyDoctorVerify: PropTypes.object,
  loading: PropTypes.object,
 // location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ verifyDoctorVerify, loading }) {
  return { verifyDoctorVerify, loading }
}

export default connect(mapStateToProps)(VerifyDoctorVerify)
