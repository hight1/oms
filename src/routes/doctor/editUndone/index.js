import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import DoctorSearch from '../../../components/Doctor/DoctorSearch'

import DoctorUndoneModal from '../../../components/Doctor/DoctorUndoneModal'

function Doctor ({ undoneDoctor, loading, dispatch }) {
  const {
 //  list,
    searchMode,
    keyword,
    pagination,
    cateList,
    currentItem,
    selectedRowKeys,
   // modalVisible,
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
    fileList,
  } = undoneDoctor

  const doctorSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'undoneDoctor/updateSearchMode',
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
    item: modalType === 'create' ? currentItem : currentItem,
    type: modalType,
    // visible: modalVisible,
    currentItem,
    modalType,
    maskClosable: false,
    confirmLoading: loading.effects['undoneDoctor/editUndone'],
    title: `${modalType === 'create' ? '创建用户' : '医生信息详情'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'undoneDoctor/update',
        payload: data,
      })
      // dispatch(
      //   routerRedux.push({
      //     pathname: '/doctors',
      //     query: { page: 1, keyword: '' },
      //   }),
      // )
    },
    onChangeHospitalName (old, newHospitalName) {
      dispatch({
        type: 'undoneDoctor/changeHospitalName',
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
        type: 'undoneDoctor/uploadIconSuccess',
        payload: IconUrl,
      })
    },
    updateImage (deg) {
      dispatch({
        type: 'undoneDoctor/getRotateImg',
        payload: {
          deg,
        },
      })
    },
    uploadQualiSuccess (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'undoneDoctor/uploadQualiSuccess',
        payload: IconUrl,
      })
    },
    uploadQuali2Success (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'undoneDoctor/uploadQuali2Success',
        payload: IconUrl,
      })
    },
    uploadTitleSuccess (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'undoneDoctor/uploadTitleSuccess',
        payload: IconUrl,
      })
    },
    uploadTitleSuccess2 (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'undoneDoctor/uploadTitleSuccess2',
        payload: IconUrl,
      })
    },
    uploadTitleSuccess3 (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'undoneDoctor/uploadTitleSuccess3',
        payload: IconUrl,
      })
    },
    uploadTitleSuccess4 (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'undoneDoctor/uploadTitleSuccess4',
        payload: IconUrl,
      })
    },
    uploadTitleSuccess5 (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'undoneDoctor/uploadTitleSuccess5',
        payload: IconUrl,
      })
    },
    uploadToken,
    // /////////////////////////////
    fileList,
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
          type: 'undoneDoctor/updateCateState',
          payload: {
            selectedRowKeys: keys,
            selectedCateRows: selectedRow,
          },
        })
      },
    },
    handleOk () {
       // dispatch({
       //   type: 'undoneDoctor/editLookUpValues',
       //   payload: {
       //     lookUpCateValues: selectedRowKeys,
       //     selectedCateRows,
       //   },
       // })
      dispatch({
        type: 'undoneDoctor/editHospital',
        payload: {
          setHospital: selectedCateRows,
        },
      })
      dispatch({
        type: 'undoneDoctor/notDeptPageVisible',
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
        type: 'undoneDoctor/deleteLookUpValues',
        payload: code,
      })
    },
    showCateModal () {
      console.log('a')
      dispatch({
        type: 'undoneDoctor/queryCate',
        payload: {},
      })
      dispatch({
        type: 'undoneDoctor/deptPageVisible',
      })
    },
    handleDeptCancel () {
      dispatch({
        type: 'undoneDoctor/notDeptPageVisible',
      })
    },
    HospitalPagination: {
      ...pagination,
      onChange (page, pageSize) {
        dispatch({
          type: 'undoneDoctor/queryCate',
          payload: { page, pageSize },
        })
      },
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
          type: 'undoneDoctor/updateCateState',
          payload: {
            selectedDeptRowKeys: keys,
            selectedDeptRows: selectedRow,
          },
        })
      },
    },
    handleDeptLookOk () {
      // dispatch({
      //   type: 'undoneDoctor/editDeptLookUpValues',
      //   payload: {
      //     lookUpCateValues: selectedDeptRowKeys,
      //     selectedDeptRows,
      //   },
      // })
      dispatch({
        type: 'undoneDoctor/editDept',
        payload: {
          setDept: selectedDeptRows,
        },
      })
      dispatch({
        type: 'undoneDoctor/hideLookUpModal',
      })
      // console.log(`lookupmodal:${selectedDeptRowKeys}`)
      // console.log(selectedDeptRows)
    }, // 回掉函数
    DeptLookupCancel () {
      dispatch({
        type: 'undoneDoctor/hideLookUpModal',
      })
    },
    onShow (code) {
      dispatch({
        type: 'undoneDoctor/querySecondDept',
        payload: {
          parentCode: code,
        },
      })
    },
    handleDeptDelete (code) {
      console.log(code)
      dispatch({
        type: 'undoneDoctor/deleteDeptValues',
        payload: code,
      })
    },
    showDeptLookUpModal () {
      dispatch({
        type: 'undoneDoctor/deptLookUpModalVisi',
      })
      dispatch({
        type: 'undoneDoctor/queryDept',
      })
    },
    onSpecialChange (record, e) {  //  医院科室列表 编辑是否医院特色
      // console.log(e.target.value)
      record.isSpecial = e.target.value
      // console.log(record)
      dispatch({
        type: 'undoneDoctor/editSpecialValues',
        payload: record,
      })
    },
    onDeptSearch (val) {
      dispatch({
        type: 'undoneDoctor/querySecondDept',
        payload: {
          keyword: val,
          parentCode: '',
        },
      })
    },
    ////////////////////////////////////////////////////////////////////////////

  }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <DoctorSearch {...doctorSearchProps} />
      }
      <DoctorUndoneModal {...doctorModalProps} />

    </div>
  )
}

Doctor.propTypes = {
  undoneDoctor: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ undoneDoctor, loading }) {
  return { undoneDoctor, loading }
}

export default connect(mapStateToProps)(Doctor)
