import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

import DoctorProfileVerifyModal from '../../../components/DoctorProfile/DoctorProfileVerifyModal'


function VerifyDoctorProfile ({ verifyDoctorProfile, /* auth, */loading, dispatch }) {
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
    uploadToken,
    isOK,
    isES,
  } = verifyDoctorProfile

 // const currentUser = auth.user

  const DoctorProfileVerifyModalProps = {
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
        type: 'verifyDoctorProfile/update',
        payload: data,
      })
      dispatch({
        type: 'verifyDoctorProfile/changeOK',
        payload: {
          isOK: true,
        },
      })
      dispatch({
        type: 'verifyDoctorProfile/notEditVcPrice',
      })
    },
    onCancel () {
      dispatch({
        type: 'verifyDoctorProfile/hideModal',
      })
      dispatch({
        type: 'verifyDoctorProfile/notEditVcPrice',
      })
    },
    judgeStatus,
    vcPriceDisable,
      // vcPriceList,
    editVcPrice () {
      dispatch({
        type: 'verifyDoctorProfile/editVcPrice',
      })
    },
    // //////////// 失败标签 ///////////////
    failureTag,
    tagList,
    handleTagsChange (tag, data) {
      dispatch({
        type: 'verifyDoctorProfile/editTags',
        payload: { tag: tag.content, data },
      })
    },
    // ////////////////////////////////////
    handleES (code) {
      // console.log(code)
      dispatch({
        type: 'verifyDoctorProfile/syncES',
        payload: {
          code: code,
        },
      })
    },
      // ////////// 头像图片 ///////////
    uploadIconSuccess (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'verifyDoctorProfile/uploadIconSuccess',
        payload: IconUrl,
      })
    },
    uploadToken,
    updateImage (deg) {
      dispatch({
        type: 'verifyDoctorProfile/getRotateImg',
        payload: {
          deg: deg,
        },
      })
    },
  }
  return (
    <div className="content-inner">
      <DoctorProfileVerifyModal {...DoctorProfileVerifyModalProps} />

    </div>
  )
}

VerifyDoctorProfile.propTypes = {
  verifyDoctorProfile: PropTypes.object,
  // auth: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ verifyDoctorProfile, auth, loading }) {
  return { verifyDoctorProfile, auth, loading }
}

export default connect(mapStateToProps)(VerifyDoctorProfile)
