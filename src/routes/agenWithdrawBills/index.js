import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import AgenWithdrawBillsList from '../../components/AgenWithdrawBills/AgenWithdrawBillsList'
import AgenWithdrawBillsAction from '../../components/AgenWithdrawBills/AgenWithdrawBillsAction'
// import AgenWithdrawBillsModal from '../../components/AgenWithdrawBills/AgenWithdrawBillsModal'
// import AgenWithdrawBillsModal from '../../components/AgenWithdrawBills/AgenWithdrawBillsModal'

function AgenWithdrawBills ({ agenWB, loading, location, dispatch }) {
  const {
    list,
    searchMode,
    keyword,
    pagination,
    // currentItem,
    selectedRowKeys,
    // modalVisible,
    // withdrawModalVisible,
    // modalType,
    // dataSource,
    confirmLoading,
  } = agenWB

  const agenWBListProps = {
    pagination,
    loading: loading.effects['agenWB/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'agenWB/updateState',
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
        type: 'agenWB/hideModal',
        payload: {
          modalVisible: false,
        },

      })
    },
    // modalVisible,
    onWithdraw (code) {
      dispatch({
        type: 'agenWB/clickWithdraw',
        payload: {
          code: code,
        },
      })
    },

  }

  const agenWBActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'agenWB/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchWithdraw () {
      dispatch({
        type: 'agenWB/multiWithdraw',
        payload: {
          withdrawBillNoList: selectedRowKeys,
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/agencies/withdraw-bills',
          query: { page: 1, keyword: kw },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/agencies/withdraw-bills',
          query: { page: 1, keyword: '' },
        }),
      )
    },
    handleChange (e) {
      dispatch({
        type: 'agenWB/query',
        payload: {
          status: e.target.value,
        },
      })
    },
  }

  // const agenWBModalProps = {
  //   item: currentItem,
  //   visible: withdrawModalVisible,
  //   maskClosable: false,
  //   confirmLoading: loading.effects['agenWB/update'],
  //   title: '提现申请',
  //   wrapClassName: 'vertical-center-modal',
  //   dataSource,
  //   onOk (data) {
  //     dispatch({
  //       type: 'agenWB/withdraw',
  //       payload: data,
  //     })
  //   },
  //   onCancel () {
  //     dispatch({
  //       type: 'agenWB/hideWithdrawModal',
  //     })
  //   },
  // }
  return (
    <div className="content-inner">
      <AgenWithdrawBillsAction {...agenWBActionProps} />
      <AgenWithdrawBillsList {...agenWBListProps} />
      {/* {modalVisible && <AgenWithdrawBillsModal {...agenWBModalProps} />} */}
    </div>
  )
}

AgenWithdrawBills.propTypes = {
  agenWB: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ agenWB, loading }) {
  return { agenWB, loading }
}

export default connect(mapStateToProps)(AgenWithdrawBills)
