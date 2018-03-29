import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import WithdrawBillsList from '../../components/WithdrawBills/WithdrawBillsList'
import WithdrawBillsSearch from '../../components/WithdrawBills/WithdrawBillsSearch'
import WithdrawBillsAction from '../../components/WithdrawBills/WithdrawBillsAction'
// import WithdrawBillsModal from '../../components/WithdrawBills/WithdrawBillsModal'
import WithdrawBillsModal from '../../components/WithdrawBills/WithdrawBillsModal'

function WithdrawBills ({ withdrawBills, loading, location, dispatch }) {
  const {
    list,
    searchMode,
    keyword,
    pagination,
    currentItem,
    selectedRowKeys,
    // modalVisible,
    withdrawModalVisible,
    // modalType,
    dataSource,
    confirmLoading,

  } = withdrawBills

  const withdrawBillsSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'withdrawBills/updateSearchMode',
        payload: {
          searchMode: 'simple',
        },
      })
    },
    onSearch (fieldsValue) {
      dispatch(
        routerRedux.push({
          pathname: '/withdraw-bills',
          query: { page: 1, ...fieldsValue },
        }),
      )
    },
    onReset () {
      dispatch(
        routerRedux.push({
          pathname: '/withdraw-bills',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }

  const withdrawBillsListProps = {
    pagination,
    loading: loading.effects['withdrawBills/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'withdrawBills/updateState',
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
    confirmLoading,
    handleCancel () {
      dispatch({
        type: 'withdrawBills/hideModal',
        payload: {
          modalVisible: false,
        },

      })
    },
    // modalVisible,
    onWithdraw (code) {
      dispatch({
        type: 'withdrawBills/clickWithdraw',
        payload: {
          code: code,
        },
      })
    },

  }

  const withdrawBillsActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    // rank,
    onCreate () {
      dispatch({
        type: 'withdrawBills/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchWithdraw () {
      dispatch({
        type: 'withdrawBills/multiWithdraw',
        payload: {
          withdrawBillNoList: selectedRowKeys,
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/withdraw-bills',
          query: { page: 1, keyword: kw },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/withdraw-bills',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }

  const withdrawBillsModalProps = {
    item: currentItem,
    visible: withdrawModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['withdrawBills/update'],
    title: '提现申请',
    wrapClassName: 'vertical-center-modal',
    dataSource,
    onOk (data) {
      dispatch({
        type: 'withdrawBills/withdraw',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'withdrawBills/hideWithdrawModal',
      })
    },
  }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <WithdrawBillsSearch {...withdrawBillsSearchProps} />
      }
      <WithdrawBillsAction {...withdrawBillsActionProps} />
      <WithdrawBillsList {...withdrawBillsListProps} />
      {/* {modalVisible && <WithdrawBillsModal {...withdrawBillsModalProps} />} */}
      {withdrawModalVisible && <WithdrawBillsModal {...withdrawBillsModalProps} />}
    </div>
  )
}

WithdrawBills.propTypes = {
  withdrawBills: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ withdrawBills, loading }) {
  return { withdrawBills, loading }
}

export default connect(mapStateToProps)(WithdrawBills)
