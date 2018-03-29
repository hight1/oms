import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'


import WithdrawBillsModal from '../../../components/AgenWithdrawBills/AgenWithdrawBillsModal'


function editAgency ({ agenWB, loading, dispatch }) {
  const {
    currentItem,
    modalType,
    hospitalName,
    hospitalDept,
    lookUpValues,
    currentArea,
    areaName,
  } = agenWB

  const agenWBModalProps = {
    currentArea,
    areaName,
    item: currentItem,
    type: modalType,
    // visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['agenWB/update'],
    title: `${modalType === 'create' ? '新增科室' : '科室编辑'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log(data)
      dispatch({
        type: 'agenWB/withdraw',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'agenWB/hideModal',
      })
    },
    hospitalName,
    hospitalDept,
    onDelete (code) {
      dispatch({
        type: 'agenWB/delete',
        payload: code,
      })
    },
    handleYes () {
      dispatch({
        type: 'agenWB/showLookUpModal',
      })
    },
    lookUpValues,
    addNewArea (value, code) {
      if (!code) {
        return true
      }
      dispatch({
        type: 'agenWB/addArea',
        payload: {
          areaCode: value.value,
          areaName: value.label,
          code: code,
        },
      })
    },
    deleteOldArea (code, areaCode) {
      dispatch({
        type: 'agenWB/deleteArea',
        payload: {
          areaCode: areaCode,
          code: code,
        },
      })
    },
    onChange (value, selectedOptions) {
      dispatch({
        type: 'agenWB/changeArea',
        payload: {
          areaName: selectedOptions[2].label,
        },
      })
    },
  }
  return (
    <div className="content-inner">
      <WithdrawBillsModal {...agenWBModalProps} />
    </div>
  )
}

editAgency.propTypes = {
  agenWB: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ agenWB, loading }) {
  return { agenWB, loading }
}

export default connect(mapStateToProps)(editAgency)
