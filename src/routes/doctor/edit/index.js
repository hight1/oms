import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import DoctorSearch from '../../../components/Doctor/DoctorSearch'

import DoctorModal from '../../../components/Doctor/DoctorModal'

function Doctor ({ doctor, loading, dispatch }) {
  const {
  // list,
    searchMode,
    keyword,
    pagination,
    cateList,
    currentItem,
    selectedRowKeys,
 //   modalVisible,
    modalType,
    targetKeys,
    dataSource,
    selectedKeys,
    value,
    deptPageVisible,
    selectedCateRows,
    setHospital,
    setDept,
    deptList,
    deptLookUpVisible,
    selectedDeptRowKeys,
    deptLookData,
    selectedDeptRows,
    uploadToken,
    qualifVisi,
    qualifVisi2,
    tagList,
    isOK,
    isES,
  } = doctor

  const doctorSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'doctor/updateSearchMode',
        payload: {
          searchMode: 'simple',
        },
      })
    },
    onSearch (fieldsValue) {
      console.log(fieldsValue)
    },
    onReset () {
      dispatch(
        routerRedux.push({
          pathname: '/doctors',
          query: { page: 1, keyword: '' },
        }),
      )
    },
    value,
  }
  const doctorModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    // visible: modalVisible,
    modalType,
    maskClosable: false,
    confirmLoading: loading.effects['doctor/edit'],
    title: `${modalType === 'create' ? '创建用户' : '医生信息详情'}`,
    wrapClassName: 'vertical-center-modal',
    isOK,
    isES,
    onOk (data) {
      dispatch({
        type: 'doctor/update',
        payload: data,
      })
      dispatch({
        type: 'doctor/changeOk',
        payload: {
          isOK: true,
        },
      })
    },
    handleES (code) {
      dispatch({
        type: 'doctor/syncES',
        payload: {
          code: code,
        },
      })
    },
    onChangeHospitalName (old, newHospitalName) {
      dispatch({
        type: 'doctor/changeHospitalName',
        payload: {
          old,
          newHospitalName,
        },
      })
    },
    dataSource,
    targetKeys,
    selectedKeys,
     // ////////// 头像图片 ///////////
    uploadIconSuccess (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'doctor/uploadIconSuccess',
        payload: IconUrl,
      })
    },
    uploadToken,
    updateImage (deg) {
      dispatch({
        type: 'doctor/getRotateImg',
        payload: {
          deg,
        },
      })
    },
     // /////////// 医院分类参照页 /////////
    setHospital,
    cateDataSource: cateList,
    deptPageVisible: deptPageVisible,
    rowSelection: {
      type: 'radio',
      selectedRowKeys,
      onChange: (keys, selectedRow) => {
        dispatch({
          type: 'doctor/updateCateState',
          payload: {
            selectedRowKeys: keys,
            selectedCateRows: selectedRow,
          },
        })
      },
    },
    handleOk () {
       // dispatch({
       //   type: 'doctor/editLookUpValues',
       //   payload: {
       //     lookUpCateValues: selectedRowKeys,
       //     selectedCateRows,
       //   },
       // })
      dispatch({
        type: 'doctor/editHospital',
        payload: {
          setHospital: selectedCateRows,
        },
      })
      dispatch({
        type: 'doctor/notDeptPageVisible',
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
      dispatch({
        type: 'doctor/deleteLookUpValues',
        payload: code,
      })
    },
    showCateModal () {
      dispatch({
        type: 'doctor/queryCate',
        payload: {},
      })
    },
    handleDeptCancel () {
      dispatch({
        type: 'doctor/notDeptPageVisible',
      })
    },
    HospitalPagination: {
      ...pagination,
      onChange (page, pageSize) {
        dispatch({
          type: 'doctor/queryCate',
          payload: { page, pageSize },
        })
      },
    },
    onHosiSearch (val) {
      dispatch({
        type: 'doctor/queryCate',
        payload: {
          keyword: val,
          pageSize: 100,
        },
      })
    },
     // /////////////////////////////////////////////////////////////////////////
    qualifPic () {
      dispatch({
        type: 'doctor/showPic',
      })
    },
    qualifUNVisi () {
      dispatch({
        type: 'doctor/unshowPic',
      })
    },
    qualifVisi,
    qualifPic2 () {
      dispatch({
        type: 'doctor/showPic2',
      })
    },
    qualifUNVisi2 () {
      dispatch({
        type: 'doctor/unshowPic2',
      })
    },
    qualifVisi2,

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
        dispatch({
          type: 'doctor/updateCateState',
          payload: {
            selectedDeptRowKeys: keys,
            selectedDeptRows: selectedRow,
          },
        })
      },
    },
    handleDeptLookOk () {
      // dispatch({
      //   type: 'doctor/editDeptLookUpValues',
      //   payload: {
      //     lookUpCateValues: selectedDeptRowKeys,
      //     selectedDeptRows,
      //   },
      // })
      dispatch({
        type: 'doctor/editDept',
        payload: {
          setDept: selectedDeptRows,
        },
      })
      dispatch({
        type: 'doctor/hideLookUpModal',
      })
      // console.log(`lookupmodal:${selectedDeptRowKeys}`)
      // console.log(selectedDeptRows)
    }, // 回掉函数
    DeptLookupCancel () {
      dispatch({
        type: 'doctor/hideLookUpModal',
      })
    },
    onShow (code) {
      dispatch({
        type: 'doctor/querySecondDept',
        payload: {
          parentCode: code,
        },
      })
    },
    handleDeptDelete (code) {
      dispatch({
        type: 'doctor/deleteDeptValues',
        payload: code,
      })
    },
    showDeptLookUpModal () {
      dispatch({
        type: 'doctor/deptLookUpModalVisi',
      })
      dispatch({
        type: 'doctor/queryDept',
      })
    },
    onSpecialChange (record, e) {  //  医院科室列表 编辑是否医院特色
      // console.log(e.target.value)
      record.isSpecial = e.target.value
      // console.log(record)
      dispatch({
        type: 'doctor/editSpecialValues',
        payload: record,
      })
    },
    onDeptSearch (val) {
      dispatch({
        type: 'doctor/querySecondDept',
        payload: {
          keyword: val,
          parentCode: '',
        },
      })
    },
    // //////////////////////////////////////////////////////////////////////////
    // ////////////////////////// 是否发送义诊短信////////////////
    sendFcSms (uid, sms, content) {
      if (sms) {
        Modal.confirm({
          title: '提示',
          content: '您已经发送过短信，是否再次发送短信？',
          onOk () {
            dispatch({
              type: 'doctor/sendFcSms',
              payload: {
                uid: uid,
                smsContent: content,
              },
            })
          },
          onCancel () {
          },
        })
      } else {
        dispatch({
          type: 'doctor/sendFcSms',
          payload: {
            uid: uid,
            smsContent: content,
          },
        })
      }
    },
    // /////////////// 短信模板 /////////
    tagList,
    // /////////

  }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <DoctorSearch {...doctorSearchProps} />
      }
      <DoctorModal {...doctorModalProps} />

    </div>
  )
}

Doctor.propTypes = {
  doctor: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ doctor, loading }) {
  return { doctor, loading }
}

export default connect(mapStateToProps)(Doctor)
