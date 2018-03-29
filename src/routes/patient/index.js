import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PatientList from '../../components/Patient/PatientList'
import PatientSearch from '../../components/Patient/PatientSearch'
import PatientAction from '../../components/Patient/PatientAction'
import PatientModal from '../../components/Patient/PatientModal'

function Patients ({ Patient, loading, location, dispatch }) {
  const {
    list,
    searchMode,
    keyword,
    pagination,
    currentItem,
    selectedRowKeys,
    modalVisible,
    modalType,
  } = Patient

  const patientSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'Patient/updateSearchMode',
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
          pathname: '/patients',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }

  const patientListProps = {
    pagination,
    loading: loading.effects['Patient/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'Patient/updateState',
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
          pageSize: page.pageSize,
        },
      }))
    },
    onEdit (id) {
      dispatch({
        type: 'Patient/edit',
        payload: {
          id: id,
        },
      })
    },
    onDeny (id, enable) {
      dispatch({
        type: 'Patient/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'Patient/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
    onDelete (id) {
      dispatch({
        type: 'Patient/delete',
        payload: id,
      })
    },
  }

  const patientActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'Patient/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'Patient/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'Patient/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/patients',
          query: { page: 1, keyword: kw },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/patients',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }

  const patientModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['Patient/update'],
    title: `${modalType === 'create' ? '创建用户' : '更新用户'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `Patient/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'Patient/hideModal',
      })
    },
  }

  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <PatientSearch {...patientSearchProps} />
      }
      <PatientAction {...patientActionProps} />
      <PatientList {...patientListProps} />
      { modalVisible && <PatientModal {...patientModalProps} />}
    </div>
  )
}

Patients.propTypes = {
  Patient: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ Patient, auth, loading }) {
  return { Patient, auth, loading }
}

export default connect(mapStateToProps)(Patients)
