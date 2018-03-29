import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import RemoteConsultModal from '../../../components/RemoteConsult/RemoteConsultModal'


function RemoteConsult ({ remoteConsult, loading, dispatch }) {
  const {
    currentItem,
    // modalVisible,
    modalType,
    targetKeys,
    dataSource,
    selectedKeys,
    pagination,
    docLookUpVisible,
    docList,
    selectedDocKeys,
    setDoc,
    selectedDocRows,
    docLookUpVisible2,
    setDoc2,
    setPat,
    patList,
    patLookUpVisible,
    selectedPatKeys,
    selectedPatRows,
  } = remoteConsult

  const remoteConsultModalProps = {
    item: modalType === 'create' ? currentItem : currentItem,
    type: modalType,
    // visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['remoteConsult/queryDoctor'],
    title: `${modalType === 'create' ? '创建用户' : '医生信息详情'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      if (!data.orderNo) {
        dispatch({
          type: 'remoteConsult/create',
          payload: data,
        })
        return true
      }
      dispatch({
        type: `remoteConsult/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'remoteConsult/hideModal',
      })
      dispatch({
        type: 'remoteConsult/docPageDisvisible',
      })
      dispatch({
        type: 'remoteConsult/docPageDisvisible2',
      })
      dispatch({
        type: 'remoteConsult/patPageDisvisible',
      })
    },
    dataSource,
    targetKeys,
    selectedKeys,
      // /////////////////////////// 医生参照页 /////////////////////
    showDocLookUpModal () {
      dispatch({
        type: 'remoteConsult/queryDoc',
        payload: {},
      })
      dispatch({
        type: 'remoteConsult/docPageVisible',
      })
    },
    DocPagination: {
      ...pagination,
      onChange (page, pageSize) {
        dispatch({
          type: 'remoteConsult/queryDoc',
          payload: { page, pageSize },
        })
      },
    },
    setDoc,
    docDataSource: docList,
    docLookUpVisible: docLookUpVisible,
    docLookUpSelection: {
      type: 'radio',
      selectedDocKeys,
      onChange: (keys, selectedRow) => {
        dispatch({
          type: 'remoteConsult/updateDocState',
          payload: {
            selectedDocKeys: keys,
            selectedDocRows: selectedRow,
          },
        })
      },
    },
    handleDocLookOk () {
      dispatch({
        type: 'remoteConsult/editDoc',
        payload: {
          setDoc: selectedDocRows,
        },
      })
      dispatch({
        type: 'remoteConsult/docPageDisvisible',
      })
    },
    serviceSearch (val) {
      dispatch({
        type: 'remoteConsult/queryDoc',
        payload: { pageSize: 40, keyword: val },
      })
    },
      // /////////////////////////// 医生参照页2 /////////////////////
    showDocLookUpModal2 () {
      dispatch({
        type: 'remoteConsult/queryDoc',
        payload: {},
      })
      dispatch({
        type: 'remoteConsult/docPageVisible2',
      })
    },
    DocPagination2: {
      ...pagination,
      onChange (page, pageSize) {
        dispatch({
          type: 'remoteConsult/queryDoc',
          payload: { page, pageSize },
        })
      },
    },
    setDoc2,
    docLookUpVisible2: docLookUpVisible2,
    docLookUpSelection2: {
      type: 'radio',
      selectedDocKeys,
      onChange: (keys, selectedRow) => {
        dispatch({
          type: 'remoteConsult/updateDocState',
          payload: {
            selectedDocKeys: keys,
            selectedDocRows: selectedRow,
          },
        })
      },
    },
    handleDocLookOk2 () {
      dispatch({
        type: 'remoteConsult/editDoc2',
        payload: {
          setDoc2: selectedDocRows,
        },
      })
      dispatch({
        type: 'remoteConsult/docPageDisvisible2',
      })
    },
    applySearch (val) {
      dispatch({
        type: 'remoteConsult/queryDoc',
        payload: { pageSize: 40, keyword: val },
      })
    },
    // ////////////////////////患者参照页 ////////////////
    showPatLookUpModal () {
      dispatch({
        type: 'remoteConsult/queryPatient',
        payload: {},
      })
      dispatch({
        type: 'remoteConsult/patPageVisible',
      })
    },
    PatPagination: {
      ...pagination,
      onChange (page, pageSize) {
        dispatch({
          type: 'remoteConsult/queryPatient',
          payload: { page, pageSize },
        })
      },
    },
    setPat,
    patDataSource: patList,
    patLookUpVisible: patLookUpVisible,
    patLookUpSelection: {
      type: 'radio',
      selectedPatKeys,
      onChange: (keys, selectedRow) => {
        dispatch({
          type: 'remoteConsult/updateDocState',
          payload: {
            selectedPatKeys: keys,
            selectedPatRows: selectedRow,
          },
        })
      },
    },
    handlePatLookOk () {
      dispatch({
        type: 'remoteConsult/editPat',
        payload: {
          setPat: selectedPatRows,
        },
      })
      dispatch({
        type: 'remoteConsult/patPageDisvisible',
      })
    },
    patientSearch (val) {
      dispatch({
        type: 'remoteConsult/queryPatient',
        payload: { keyword: val, pageSize: 40 },
      })
    },
    onPatiSearch (val) {
      dispatch({
        type: 'remoteConsult/queryPatient',
        payload: { keyword: val },
      })
    },
    // / 解除订单 /////////
    cancelOrder (orderNo) {
      dispatch({
        type: 'remoteConsult/cancelOrder',
        payload: { orderNo: orderNo },
      })
    },
  }
  return (
    <div className="content-inner">

      <RemoteConsultModal {...remoteConsultModalProps} />

    </div>
  )
}

RemoteConsult.propTypes = {
  loading: PropTypes.object,
  // location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ remoteConsult, loading }) {
  return { remoteConsult, loading }
}

export default connect(mapStateToProps)(RemoteConsult)
