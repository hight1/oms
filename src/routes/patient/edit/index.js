import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import PatientModal from '../../../components/Patient/PatientModal'

function Patients ({ Patient, loading, dispatch }) {
  const {
    currentItem,
    // modalVisible,
    modalType,
  } = Patient


  const patientModalProps = {
    item: currentItem,
    type: modalType,
    confirmLoading: loading.effects['Patient/update'],
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
      <PatientModal {...patientModalProps} />
    </div>
  )
}

Patients.propTypes = {
  Patient: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ Patient, auth, loading }) {
  return { Patient, auth, loading }
}

export default connect(mapStateToProps)(Patients)
