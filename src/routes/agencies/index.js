import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import AgencyList from '../../components/Agencies/AgencyList'
import AgencyAction from '../../components/Agencies/AgencyAction'


function Agencies ({ agency, loading, dispatch }) {
  const {
   list,
    searchMode,
    keyword,
    pagination,
    // currentItem,
    selectedRowKeys,
    // modalVisible,
    // modalType,
    // hospitalName,
    // hospitalDept,
    rank,
  } = agency


  const agentsListProps = {
    pagination,
    loading: loading.effects['agency/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'agency/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    onPageChange (page) {
      dispatch({
        type: 'agency/query',
        payload: {
          rank: rank,
          page: page.current,
          size: page.pageSize,
          keyword: keyword,
        },
      })
    },
    onEdit (code) {
      dispatch({
        type: 'agency/edit',
        payload: {
          code: code,
        },
      })
      dispatch({
        type: 'agency/queryArea',
        payload: {
          code: code,
        },
      })
    },
    onDeny (id, enable) {
      dispatch({
        type: 'agency/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'agency/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
    onDelete (code) {
      dispatch({
        type: 'agency/delete',
        payload: code,
      })
    },
    onChangeSort  (record, sort) {
      dispatch({
        type: 'agency/updateSort',
        payload: {
          record,
          sort,
        },
      })
    },
  }

  const agentsActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'agency/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'agency/multiDelete',
        payload: {
          codes: selectedRowKeys,
        },
      })
    },
    onSearch (kw) {
      dispatch({
        type: 'agency/query',
        payload: {
          keyword: kw,
          rank: rank,
        },
      })
    },
    handleChange (e) {
      dispatch({
        type: 'agency/query',
        payload: {
          rank: e.target.value,
        },
      })
      dispatch({
        type: 'doctorVerify/changeType',
        payload: {
          rank: e.target.value,
        },
      })
    },
    rank,
  }
  return (
    <div className="content-inner">
      <AgencyAction {...agentsActionProps} />
      <AgencyList {...agentsListProps} />
    </div>
  )
}

Agencies.propTypes = {
  agency: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ agency, loading }) {
  return { agency, loading }
}

export default connect(mapStateToProps)(Agencies)
