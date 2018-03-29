import React from 'react'
import { connect } from 'dva'
import OrderCancelList from '../../components/OrderCancel/OrderCancelList'

function OrderCancel ({ dispatch }) {
  const orderCancelProps = {
    onOk (data) {
      console.log(data)
      dispatch({
        type: 'orderCancel/edit',
        payload: data,
      })
    },
  }


  return (
    <div className="content-inner">
      <OrderCancelList {...orderCancelProps} />
    </div>
  )
}

function mapStateToProps ({ orderCancel, loading }) {
  return { orderCancel, loading }
}

export default connect(mapStateToProps)(OrderCancel)
