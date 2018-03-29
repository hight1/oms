import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'


import HospitalCateLookupModal from '../../../components/HospitalCate/HospitalCateLookupModal'
import HospitalCateModal from '../../../components/HospitalCate/HospitalCateModal'


function editHospitalCate ({ hospitalCate, loading, dispatch }) {
  const {
   list,
    currentItem,
    selectedRowKeys,
    modalType,
    hospitalName,
    hospitalDept,
    lookupModalVisible,
    lookUpValues,
  } = hospitalCate

  const hospitalCateModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    // visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['hospitalCate/update'],
    title: `${modalType === 'create' ? '新增科室' : '科室编辑'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `hospitalCate/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'hospitalCate/hideModal',
      })
    },
    hospitalName,
    hospitalDept,
    onDelete (code) {
      dispatch({
        type: 'hospitalCate/delete',
        payload: code,
      })
    },
    handleYes () {
      dispatch({
        type: 'hospitalCate/showLookUpModal',
      })
    },
    lookUpValues,
  }
  const hospitalCateLookupModalProps = {
    cateDataSource: list,
    rowSelection: {
      type: 'radio',
      selectedRowKeys,
      onChange: (keys) => {
        console.log(keys)
        dispatch({
          type: 'hospitalCate/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    handleOk () {
      dispatch({
        type: 'hospitalCate/editLookUpValues',
        payload: selectedRowKeys,
      })
      dispatch({
        type: 'hospitalCate/hideLookUpModal',
      })
      console.log(selectedRowKeys)
    },
    // onOk (data) {
    //   dispatch({
    //     type: `hospitalCate/${modalType}`,
    //     payload: data,
    //   })
    // },
    onCancel () {
      dispatch({
        type: 'hospitalCate/hideLookUpModal',
      })
    },
    visible: lookupModalVisible,
    width: '1000px',
    title: '医院分类参照页',
  }
  return (
    <div className="content-inner">
      <HospitalCateModal {...hospitalCateModalProps} />
      <HospitalCateLookupModal {...hospitalCateLookupModalProps} />
    </div>
  )
}

editHospitalCate.propTypes = {
  hospitalCate: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ hospitalCate, loading }) {
  return { hospitalCate, loading }
}

export default connect(mapStateToProps)(editHospitalCate)
