import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import VideoOrdersList from '../../components/VideoOrders/VideoOrdersList'

import VideoOrdersAction from '../../components/VideoOrders/VideoOrdersAction'


function VideoOrders ({ videoOrders, loading, dispatch }) {
  const {
   list,
    searchMode,
    keyword,
    pagination,
    selectedRowKeys,
    // value,
    orderStatus,
    bizType,
    updateStartTime,
    updateEndTime,

  } = videoOrders
  const videoOrdersListProps = {
    keyword,
    pagination,
    loading: loading.effects['videoOrders/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'videoOrders/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    onPageChange (page) {
      dispatch({
        type: 'videoOrders/query',
        payload: {
          bizType: bizType === ' ' ? '' : bizType,
          orderStatus: orderStatus,
          page: page.current,
          size: page.pageSize,
          keyword: keyword,
          updateStartTime,
          updateEndTime,
        },
      })
      if (bizType === ' ') {
        dispatch({
          type: 'videoOrders/changeType',
          payload: {
            bizType: ' ',
          },
        })
      }
    },
    onQuery (orderNo) {
      dispatch({
        type: 'videoOrders/queryVideoOrder',
        payload: {
          code: orderNo,
        },
      })
    },
  }

  const videoOrdersActionProps = {
    bizType,
    clickMenu (val) {
      console.log(val)
      orderStatus === ['00'] ?
      (dispatch({
        type: 'videoOrders/query',
        payload: {
          bizType: val === ' ' ? '' : val,
          updateStartTime,
          updateEndTime,
        },
      }))
      :
      (
        dispatch({
          type: 'videoOrders/query',
          payload: {
            bizType: val === ' ' ? '' : val,
            orderStatus: orderStatus,
            updateStartTime,
            updateEndTime,
          },
        })
      )

      dispatch({
        type: 'videoOrders/changeType',
        payload: {
          bizType: val,
        },
      })
    },
    orderStatus,
    handleChange (val) {
      console.log(val)
      let arr = []
      val.map((va) => { // eslint-disable-line
        if (va === '已取消') {
          arr.push('20', '21', '22', '23', '24', '25', '26')
        } else if (va === '已付款') {
          arr.push('30', '40', '41', '42', '43')
        } else if (va === '已完成') {
          arr.push('50', '51')
        } else if (va === '待付款') {
          arr.push('10', '11')
        } else {
          arr.push(va)
        }
      })
      console.log(arr)

      bizType === ' ' ?
      (dispatch({
        type: 'videoOrders/query',
        payload: {
          orderStatus: arr,
          updateStartTime,
          updateEndTime,
        },
      }))
      :
      (dispatch({
        type: 'videoOrders/query',
        payload: {
          orderStatus: arr,
          bizType: bizType,
          updateStartTime,
          updateEndTime,
        },
      }))


      dispatch({
        type: 'videoOrders/changeStatus',
        payload: {
          orderStatus: arr,
        },
      })
    },
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'videoOrders/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'videoOrders/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (val) {
      dispatch({
        type: 'videoOrders/query',
        payload: {
          keyword: val,
          updateStartTime,
          updateEndTime,
        },
      })
      dispatch({
        type: 'videoOrders/updateQueryKey',
        payload: {
          bizType: ' ',
        },
      })
      dispatch({
        type: 'videoOrders/changeStatus',
        payload: {
          orderStatus: ['00'],
        },
      })
    },
    updateStartTime,
    updateEndTime,
    onStartDate (val) {
      console.log(val._d.format('yyyy-MM-dd hh:mm:ss'))
      dispatch({
        type: 'videoOrders/createSuccess',
        payload: {
          updateStartTime: val._d.format('yyyy-MM-dd hh:mm:ss'),
        },
      })
      if (updateEndTime !== '') {
        dispatch({
          type: 'videoOrders/query',
          payload: {
            updateStartTime: val._d.format('yyyy-MM-dd hh:mm:ss'),
            updateEndTime,
            keyword,
            orderStatus,
            bizType,
          },
        })
      }
    },
    onEndDate (val) {
      console.log(val._d.format('yyyy-MM-dd hh:mm:ss'))
      dispatch({
        type: 'videoOrders/createSuccess',
        payload: {
          updateEndTime: val._d.format('yyyy-MM-dd hh:mm:ss'),
        },
      })
      if (updateStartTime !== '') {
        dispatch({
          type: 'videoOrders/query',
          payload: {
            updateStartTime,
            updateEndTime: val._d.format('yyyy-MM-dd hh:mm:ss'),
            keyword,
            orderStatus,
            bizType,
          },
        })
      }
    },

  }
  return (
    <div className="content-inner">
      <VideoOrdersAction {...videoOrdersActionProps} />
      <VideoOrdersList {...videoOrdersListProps} />

    </div>
  )
}

VideoOrders.propTypes = {
  videoOrders: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ videoOrders, loading }) {
  return { videoOrders, loading }
}

export default connect(mapStateToProps)(VideoOrders)
