import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

import DepartmentModal from '../../../components/Department/DepartmentModal'


function editDepartment ({ department, loading, dispatch }) {
  const {
   // list,
    // searchMode,
    // keyword,
    pagination,
    currentItem,
   // selectedRowKeys,
    // modalVisible,
    modalType,
    hospitalName,
    hospitalDept,
    // isParent,
    setHospital,
    selectedRowKeys1,
    cateList,
    deptPageVisible,
    selectedCateRows,
    hospitalVisi,
  } = department

  const departmentModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    // visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['departments/update'],
    title: `${modalType === 'create' ? '新增科室' : '科室编辑'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `department/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'department/hideModal',
      })
      dispatch({
        type: 'department/notDeptPageVisible',
      })
    },
    hospitalName,
    hospitalDept,
    onDelete (code) {
      dispatch({
        type: 'department/delete',
        payload: code,
      })
    },
    // /////////////// 医院参照页 ////////////////////////
    setHospital,
    cateDataSource: cateList,
    deptPageVisible: deptPageVisible,
    rowSelection: {
      type: 'radio',
      selectedRowKeys1,
      onChange: (keys, selectedRow) => {
        dispatch({
          type: 'department/updateCateState',
          payload: {
            selectedRowKeys1: keys,
            selectedCateRows: selectedRow,
          },
        })
      },
    },
    handleOk () {
  // dispatch({
  //   type: 'department/editLookUpValues',
  //   payload: {
  //     lookUpCateValues: selectedRowKeys,
  //     selectedCateRows,
  //   },
  // })
      console.log(selectedCateRows)
      dispatch({
        type: 'department/editHospital',
        payload: {
          setHospital: selectedCateRows,
        },
      })
      dispatch({
        type: 'department/notDeptPageVisible',
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
    showCateModal () {
      dispatch({
        type: 'department/queryCate',
        payload: {},
      })
      dispatch({
        type: 'department/deptPageVisible',
      })
    },
    handleDeptCancel () {
      dispatch({
        type: 'department/notDeptPageVisible',
      })
    },
    HospitalPagination: {
      ...pagination,
      onChange (page, pageSize) {
        dispatch({
          type: 'department/queryCate',
          payload: { page, pageSize },
        })
      },
    },
    currentItem,
    onHosiSearch (val) {
      dispatch({
        type: 'department/queryCate',
        payload: { keyword: val },
      })
    },
// /////////////////////////////////////////////////////////////////////////
    handleStandard (val) {
      dispatch({
        type: 'department/changeHospitalVisi',
        payload: val.target.value,
      })
    },
    hospitalVisi,

  }
  // const departmentActionProps = {
  //   searchMode,
  //   keyword,
  //   selectedRowKeys,
  //   onCreate () {
  //     dispatch({
  //       type: 'department/showModal',
  //       payload: {
  //         modalType: 'create',
  //       },
  //     })
  //   },
  //   onBatchDelete () {
  //     dispatch({
  //       type: 'department/multiDelete',
  //       payload: {
  //         ids: selectedRowKeys,
  //       },
  //     })
  //   },
  //   onAdvanceSearchMode () {
  //     dispatch({
  //       type: 'department/updateSearchMode',
  //       payload: {
  //         searchMode: 'advance',
  //       },
  //     })
  //   },
  //   onSearch (kw) {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/departments',
  //         query: { page: 1, keyword: kw },
  //       }),
  //     )
  //   },
  //   onResetSearch () {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/departments',
  //         query: { page: 1, keyword: '' },
  //       }),
  //     )
  //   },
  //   onReturn () {
  //     dispatch(routerRedux.push({
  //       pathname: '/departments',

  //     }))
  //     dispatch({
  //       type: 'department/isParent',
  //     })
  //   },
  // }
  return (
    <div className="content-inner">
      <DepartmentModal {...departmentModalProps} />
    </div>
  )
}

editDepartment.propTypes = {
  department: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ department, loading }) {
  return { department, loading }
}

export default connect(mapStateToProps)(editDepartment)
