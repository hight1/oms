import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import QuestionsList from '../../components/Questions/QuestionsList'
import QuestionsModal from '../../components/Questions/QuestionsModal'

function Questions ({ questions, loading, /* location, */dispatch }) {
  const {
    list,
    pagination,
    currentItem,
    selectedRowKeys,
    modalVisible,
    // modalType,
    // hospitalName,
    // hospitalDept,
    status,
    type,
  } = questions


  const questionsProps = {
    pagination,
    loading: loading.effects['questions/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'questions/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    onPageChange (page) {
      dispatch({
        type: 'questions/query',
        payload: {
          page: page.current,
          pageSize: page.pageSize,
          type: type,
          status: status,
        },
      })
    },
    onDeny (id, enable) {
      dispatch({
        type: 'questions/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'questions/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
    onDelete (code) {
      dispatch({
        type: 'questions/delete',
        payload: code,
      })
    },
    onSearch (val) {
      dispatch({
        type: 'questions/query',
        payload: {
          keyword: val },
      })
    },
    handleTabClick (val) {
      dispatch({
        type: 'questions/query',
        payload: {
          status: 0,
          page: 1,
          pageSize: 10,
          type: val,
        },
      })
      dispatch({
        type: 'questions/changeStatus',
        payload: {
          status: 0,
        },
      })
      dispatch({
        type: 'questions/changeType',
        payload: {
          type: val,
        },
      })
    },
    handleChange (e) {
      dispatch({
        type: 'questions/query',
        payload: {
          status: e.target.value,
          page: 1,
          pageSize: 20,
          type: 1,
        },
      })
      dispatch({
        type: 'questions/changeStatus',
        payload: {
          status: e.target.value,
        },
      })
    },
    handleChange2 (e) {
      dispatch({
        type: 'questions/query',
        payload: {
          status: e.target.value,
          page: 1,
          pageSize: 20,
          type: 2,
        },
      })
      dispatch({
        type: 'questions/changeStatus',
        payload: {
          status: e.target.value,
        },
      })
    },
    status,
    replyQuestion (record) {
      dispatch({
        type: 'questions/showModal',
      })
      dispatch({
        type: 'questions/changeCurItem',
        payload: {
          item: record,
        },
      })
    },
  }
  const QuestionsModalProps = {
    item: currentItem,
    type,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['users/update'],
    title: '回复详情',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'questions/update',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'questions/hideModal',
      })
    },
    handleChange (val) {
      const value = val
      dispatch({
        type: 'questions/changeTextarea',
        payload: {
          judgeStatus: value,
        },
      })
    },
  }


  return (
    <div className="content-inner">
      <QuestionsList {...questionsProps} />
      { modalVisible && <QuestionsModal {...QuestionsModalProps} />}

    </div>
  )
}

Questions.propTypes = {
  questions: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ questions, loading }) {
  return { questions, loading }
}

export default connect(mapStateToProps)(Questions)
