import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

import DoctorTitleVerifyModal from '../../../components/DoctorTitleVerify/DoctorTitleVerifyModal'


function VerifyDoctorTitle ({ verifyDoctorTitle, /* auth, */loading, dispatch }) {
  const {
    // list,
    // searchMode,
    // keyword,
    // pagination,
    currentItem,
   // selectedRowKeys,
    modalVisible,
    // / QuerymodalVisible,
    modalType,
    judgeStatus,
    vcPriceDisable,
      // vcPriceList,
    failureTag,
    tagList,
    isOK,
    isES,
  } = verifyDoctorTitle

 // const currentUser = auth.user

  const DoctorTitleVerifyModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['users/update'],
    title: `${modalType === 'create' ? '创建用户' : '认证职称'}`,
    wrapClassName: 'vertical-center-modal',
    isOK,
    isES,
    onOk (data) {
      dispatch({
        type: 'verifyDoctorTitle/update',
        payload: data,
      })
      dispatch({
        type: 'verifyDoctorTitle/changeOK',
        payload: {
          isOK: true,
        },
      })
      dispatch({
        type: 'verifyDoctorTitle/notEditVcPrice',
      })
    },
    onCancel () {
      dispatch({
        type: 'verifyDoctorTitle/hideModal',
      })
      dispatch({
        type: 'verifyDoctorTitle/notEditVcPrice',
      })
    },
    handleChange (val) {
      // const value = val
      // dispatch({
      //   type: 'verifyDoctorTitle/changeTextarea',
      //   payload: {
      //     judgeStatus: value,
      //   },
      // })
      dispatch({
        type: 'verifyDoctorTitle/queryTag',
        payload: {
          type: val === '2' ? 2 : 1,
        },
      })
    },
    judgeStatus,
    vcPriceDisable,
      // vcPriceList,
    editVcPrice () {
      dispatch({
        type: 'verifyDoctorTitle/editVcPrice',
      })
    },
    // //////////// 失败标签 ///////////////
    failureTag,
    tagList,
    handleTagsChange (tag, data) {
      dispatch({
        type: 'verifyDoctorTitle/editTags',
        payload: { tag: tag.content, data },
      })
    },
    // ////////////////////////////////////
    handleES (code) {
      // console.log(code)
      dispatch({
        type: 'verifyDoctorTitle/syncES',
        payload: {
          code: code,
        },
      })
    },
  }
  return (
    <div className="content-inner">
      <DoctorTitleVerifyModal {...DoctorTitleVerifyModalProps} />

    </div>
  )
}

VerifyDoctorTitle.propTypes = {
  verifyDoctorTitle: PropTypes.object,
  // auth: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ verifyDoctorTitle, auth, loading }) {
  return { verifyDoctorTitle, auth, loading }
}

export default connect(mapStateToProps)(VerifyDoctorTitle)
