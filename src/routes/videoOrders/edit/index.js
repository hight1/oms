import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import VideoOrdersModal from '../../../components/VideoOrders/VideoOrdersModal'


function VideoOrders1 ({ videoOrders, loading, dispatch }) {
  const {
    currentItem,
    // modalVisible,
    modalType,
    targetKeys,
    dataSource,
    selectedKeys,
  } = videoOrders

  const videoOrdersModalProps = {
    item: modalType === 'create' ? currentItem : currentItem,
    type: modalType,
    // visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['videoOrders/queryDoctor'],
    title: `${modalType === 'create' ? '创建用户' : '医生信息详情'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      if (!data.orderNo) {
        dispatch({
          type: 'videoOrders/create',
          payload: data,
        })
        return true
      }
      dispatch({
        type: `videoOrders/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'videoOrders/hideModal',
      })
      dispatch({
        type: 'videoOrders/docPageDisvisible',
      })
      dispatch({
        type: 'videoOrders/docPageDisvisible2',
      })
      dispatch({
        type: 'videoOrders/patPageDisvisible',
      })
    },
    dataSource,
    targetKeys,
    selectedKeys,
    // /// 解除订单 /////////////
    cancelOrder (orderNo) {
      console.log(orderNo)
      dispatch({
        type: 'videoOrders/cancelOrder',
        payload: { orderNo: orderNo },
      })
    },

  }
  return (
    <div className="content-inner">

      <VideoOrdersModal {...videoOrdersModalProps} />

    </div>
  )
}

VideoOrders1.propTypes = {
  loading: PropTypes.object,
  // location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ videoOrders, loading }) {
  return { videoOrders, loading }
}

export default connect(mapStateToProps)(VideoOrders1)
