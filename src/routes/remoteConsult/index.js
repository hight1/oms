import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import RemoteConsultList from '../../components/RemoteConsult/RemoteConsultList'
import RemoteConsultSearch from '../../components/RemoteConsult/RemoteConsultSearch'
import RemoteConsultAction from '../../components/RemoteConsult/RemoteConsultAction'
// import RemoteConsultModal from '../../components/RemoteConsult/RemoteConsultModal'


function RemoteConsult ({ remoteConsult, loading, location, dispatch }) {
  const {
    list,
    searchMode,
    keyword,
    pagination,
    // currentItem,
    selectedRowKeys,
    // modalVisible,
    // modalType,
    // targetKeys,
    // dataSource,
    // selectedKeys,
    value,
    type,
  } = remoteConsult

  const remoteConsultSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'remoteConsult/updateSearchMode',
        payload: {
          searchMode: 'simple',
        },
      })
    },
    onSearch (fieldsValue) {
      console.log(fieldsValue)
    },
    onReset () {
      dispatch(
        routerRedux.push({
          pathname: '/remote-consult',
          query: { page: 1, keyword: '' },
        }),
      )
    },
    value,
  }

  const remoteConsultListProps = {
    pagination,
    loading: loading.effects['remoteConsult/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'remoteConsult/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
          status: type,
        },
      }))
    },
    onQuery (code) {
      dispatch({
        type: 'remoteConsult/edit',
        payload: {
          code: code,
        },
      })
    },
    onDelete (id) {
      dispatch({
        type: 'remoteConsult/delete',
        payload: id,
      })
    },

  }

  const remoteConsultActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'remoteConsult/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch(
        routerRedux.push({
          pathname: '/remote-consult/edit/new',
        }),
      )
    },
    onBatchDelete () {
      dispatch({
        type: 'remoteConsult/multiDelete',
        payload: {
          orderNos: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'remoteConsult/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/remote-consult',
          query: {
            page: 1,
            keyword: kw,
            status: type,
          },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/remote-consult',
          query: {
            page: 1,
            keyword: '',
            status: type,
          },
        }),
      )
    },
    type,
    handleChange (e) {
      dispatch({
        type: 'remoteConsult/query',
        payload: {
          status: e.target.value,
        },
      })
      dispatch({
        type: 'remoteConsult/changeType',
        payload: {
          type: e.target.value,
        },
      })
    },
  }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <RemoteConsultSearch {...remoteConsultSearchProps} />
      }
      <RemoteConsultAction {...remoteConsultActionProps} />
      <RemoteConsultList {...remoteConsultListProps} />

    </div>
  )
}

RemoteConsult.propTypes = {
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ remoteConsult, loading }) {
  return { remoteConsult, loading }
}

export default connect(mapStateToProps)(RemoteConsult)
