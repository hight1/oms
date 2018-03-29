import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import DepartmentList from '../../components/Department/DepartmentList'
import DepartmentAction from '../../components/Department/DepartmentAction'
import DeptLookupModal from '../../components/Department/DeptLookupModal'

function Department ({ department, loading, location, dispatch }) {
  const {
   list,
    searchMode,
    keyword,
    pagination,
    // currentItem,
    selectedRowKeys,
    selectedRowKeys1,
    // modalVisible,
    // modalType,
    // hospitalName,
    // hospitalDept,
    isParent,
    deptLookUpVisible,
    deptLookData,
    selectedRows,
  } = department


  const departmentListProps = {
    pagination,
    loading: loading.effects['department/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'department/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          size: page.pageSize,
        },
      }))
    },
    onEdit (code) {
      dispatch({
        type: 'department/edit',
        payload: {
          code: code,
        },
      })
    },
    onDeny (id, enable) {
      dispatch({
        type: 'department/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'department/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
    onDelete (code) {
      dispatch({
        type: 'department/delete',
        payload: code,
      })
    },
    onChangeSort  (record, sort) {
      dispatch({
        type: 'department/updateSort',
        payload: {
          record,
          sort,
        },
      })
    },
    rowClick (code) {
      dispatch({
        type: 'department/queryChildDept',
        payload: {

          parentCode: code,
        },
      })
      dispatch({
        type: 'department/isNotParent',
      })
    },
    isParent,
    onRowClick (code) {
      dispatch({
        type: 'department/showLookUpModal',
        payload: {
          code: code,
        },
      })
    },
  }

  const departmentActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'department/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'department/multiDelete',
        payload: {
          codes: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'department/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      if (kw === '') {
        dispatch({
          type: 'department/isParent',
        })
        dispatch({
          type: 'department/query',
        })
      } else {
        dispatch({
          type: 'department/isNotParent',
        })
      }
      dispatch({
        type: 'department/querySecondDept',
        payload: {
          keyword: kw,
          parentCode: '',
        },
      })
    },
    onResetSearch () {
    },
    onReturn () {
      dispatch(routerRedux.push({
        pathname: '/departments',

      }))
      dispatch({
        type: 'department/isParent',
      })
    },
  }
  const deptLookupModalProps = {
    deptLookUpList: list,
    visible: deptLookUpVisible, // 是否显示
    selectedRowKeys1,
    deptLookData,
    deptLookUpSelection: {
      type: 'radio', // 单选多选
      selectedRowKeys1,
      onChange: (keys, selectedRow) => {
        console.log(keys)
        dispatch({
          type: 'department/updateListState',
          payload: {
            selectedRowKeys1: keys,
            selectedRows: selectedRow,
          },
        })
      },
    },
    handleOk () {
      dispatch({
        type: 'department/hideLookUpModal',
      })
      console.log(`lookupmodal:${selectedRowKeys1}`)
      console.log(selectedRows)
    }, // 回掉函数
    onCancel () {
      dispatch({
        type: 'department/hideLookUpModal',
      })
    },
    width: '1000px',
    onShow (code) {
      dispatch({
        type: 'department/querySecondDept',
        payload: {
          code: code,
        },
      })
    },
  }
  return (
    <div className="content-inner">
      <DepartmentAction {...departmentActionProps} />
      <DepartmentList {...departmentListProps} />
      <DeptLookupModal {...deptLookupModalProps} />
    </div>
  )
}

Department.propTypes = {
  department: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ department, loading }) {
  return { department, loading }
}

export default connect(mapStateToProps)(Department)
