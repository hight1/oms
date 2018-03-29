import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'


import AgencyModal from '../../../components/Agencies/AgencyModal'


function editAgency ({ agency, loading, dispatch }) {
  const {
    currentItem,
    modalType,
    hospitalName,
    hospitalDept,
    lookUpValues,
    currentArea,
    areaName,
  } = agency

  const agencyModalProps = {
    currentArea,
    areaName,
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    // visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['agency/update'],
    title: `${modalType === 'create' ? '新增科室' : '科室编辑'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      data.code === undefined ?
      dispatch({
        type: 'agency/create',
        payload: data,
      })
      :
      dispatch({
        type: 'agency/update',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'agency/hideModal',
      })
    },
    hospitalName,
    hospitalDept,
    onDelete (code) {
      dispatch({
        type: 'agency/delete',
        payload: code,
      })
    },
    handleYes () {
      dispatch({
        type: 'agency/showLookUpModal',
      })
    },
    lookUpValues,
    addNewArea (value, code) {
      if (!code) {
        return true
      }
      dispatch({
        type: 'agency/addArea',
        payload: {
          areaCode: value.value,
          areaName: value.label,
          code: code,
        },
      })
    },
    deleteOldArea (code, areaCode) {
      dispatch({
        type: 'agency/deleteArea',
        payload: {
          areaCode: areaCode,
          code: code,
        },
      })
    },
    onChange (value, selectedOptions) {
      dispatch({
        type: 'agency/changeArea',
        payload: {
          areaName: selectedOptions[2].label,
        },
      })
    },
  }
  return (
    <div className="content-inner">
      <AgencyModal {...agencyModalProps} />
    </div>
  )
}

editAgency.propTypes = {
  agency: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ agency, loading }) {
  return { agency, loading }
}

export default connect(mapStateToProps)(editAgency)
