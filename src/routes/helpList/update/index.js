import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import HelpModal from '../../../components/HelpList/HelpModal'

function Help ({ helpModal, dispatch }) {
  const {
  // list,
    currentItem,
 //   modalVisible,
    modalType,
    cateList,
    // dataSource,
  } = helpModal

  const helpModalModalProps = {
    item: modalType === 'create' ? currentItem : currentItem,
    type: modalType,
    // visible: modalVisible,
    modalType,
    maskClosable: false,
    title: `${modalType === 'create' ? '创建用户' : '医生信息详情'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      if (data.id === '') {
        dispatch({
          type: 'helpModal/create',
          payload: data,
        })
      } else {
        dispatch({
          type: 'helpModal/update',
          payload: data,
        })
        // dispatch(
        //   routerRedux.push({
        //     pathname: '/help',
        //     query: { page: 1, keyword: '' },
        //   }),
        // )
      }
    },
    chooseApp (e) {
      dispatch({
        type: 'helpModal/queryHelpCate',
        payload: {
          app: e.target.value,
        },
      })
    },
    cateList,
    changeType () {
      dispatch({
        type: 'helpModal/queryValue',
        payload: {
          modalType: 'create',
        },
      })
    },
  }
  return (
    <div className="content-inner">
      <HelpModal {...helpModalModalProps} />
    </div>
  )
}

Help.propTypes = {
  helpModal: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ helpModal, loading }) {
  return { helpModal, loading }
}

export default connect(mapStateToProps)(Help)
