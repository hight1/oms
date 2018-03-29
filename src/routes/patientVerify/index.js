import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PatientVerifyList from '../../components/PatientVerify/PatientVerifyList'
import PatientVerifySearch from '../../components/PatientVerify/PatientVerifySearch'
import PatientVerifyAction from '../../components/PatientVerify/PatientVerifyAction'
import PatientVerifyModal from '../../components/PatientVerify/PatientVerifyModal'

function PatientVerifys ({ PatientVerify, loading, dispatch }) {
  const {
    list,
    searchMode,
    keyword,
    pagination,
    currentItem,
    selectedRowKeys,
    modalVisible,
    modalType,
    judgeStatus,
    idCardPicAuthStatus,
  } = PatientVerify

  const PatientVerifySearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'PatientVerify/updateSearchMode',
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
          pathname: '/idcard-pic-auths',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }

  const PatientVerifyListProps = {
    pagination,
    loading: loading.effects['users/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'PatientVerify/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    onPageChange (page) {
      dispatch({
        type: 'PatientVerify/query',
        payload: {
          page: page.current,
          pageSize: page.pageSize,
          idCardPicAuthStatus: idCardPicAuthStatus.idCardPicAuthStatus === undefined ? 0 : idCardPicAuthStatus.idCardPicAuthStatus,
          keyword: keyword,
        },
      })
      dispatch({
        type: 'PatientVerify/changeType',
        payload: {
          idCardPicAuthStatus: idCardPicAuthStatus.idCardPicAuthStatus,
        },
      })
    },
    onEdit (code, status) {
      dispatch({
        type: 'PatientVerify/edit',
        payload: {
          code: code,
          idCardPicStatus: status,
        },
      })
    },
    onDelete (id) {
      dispatch({
        type: 'PatientVerify/delete',
        payload: id,
      })
    },
  }

  const PatientVerifyActionProps = {
    idCardPicAuthStatus: idCardPicAuthStatus.idCardPicAuthStatus,
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'PatientVerify/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'PatientVerify/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'PatientVerify/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch({
        type: 'PatientVerify/query',
        payload: {
          page: 1,
          keyword: kw,
          idCardPicAuthStatus: idCardPicAuthStatus.idCardPicAuthStatus === undefined ? 0 : idCardPicAuthStatus.idCardPicAuthStatus,
        },
      })
      dispatch({
        type: 'PatientVerify/changeType',
        payload: {
          idCardPicAuthStatus: idCardPicAuthStatus.idCardPicAuthStatus === undefined ? 0 : idCardPicAuthStatus.idCardPicAuthStatus,
        },
      })
    },
    onResetSearch () {
      dispatch({
        type: 'PatientVerify/query',
        payload: {
          idCardPicAuthStatus: 0,
        },
      })
      dispatch({
        type: 'PatientVerify/changeType',
        payload: {
          idCardPicAuthStatus: 0,
        },
      })
    },
    solvingItem (e) {
      dispatch({
        type: 'PatientVerify/query',
        payload: {
          idCardPicAuthStatus: e.target.value,
        },
      })
      dispatch({
        type: 'PatientVerify/changeType',
        payload: {
          idCardPicAuthStatus: e.target.value,
        },
      })
    },
  }

  const PatientVerifyModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['users/update'],
    title: `${modalType === 'create' ? '创建用户' : '会员身份证照认证'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `PatientVerify/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'PatientVerify/hideModal',
      })
    },
    handleChange (val) {
      const value = val
      dispatch({
        type: 'PatientVerify/changeTextarea',
        payload: {
          judgeStatus: value,
        },
      })
    },
    judgeStatus,
  }


  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <PatientVerifySearch {...PatientVerifySearchProps} />
      }
      <PatientVerifyAction {...PatientVerifyActionProps} />
      <PatientVerifyList {...PatientVerifyListProps} />
      { modalVisible && <PatientVerifyModal {...PatientVerifyModalProps} />}

    </div>
  )
}

PatientVerifys.propTypes = {
  PatientVerify: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ PatientVerify, auth, loading }) {
  return { PatientVerify, auth, loading }
}

export default connect(mapStateToProps)(PatientVerifys)
