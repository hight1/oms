import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import PermissionList from '../../components/Permission/PermissionList'
import PermissionSearch from '../../components/Permission/PermissionSearch'
import PermissionAction from '../../components/Permission/PermissionAction'
import PermissionModal from '../../components/Permission/PermissionModal'

function Permissions ({ permissions, loading, location, dispatch }) {
  const {
    list,
    searchMode,
    keyword,
    pagination,
    currentItem,
    selectedRowKeys,
    modalVisible,
    modalType,
  } = permissions

  const permissionListProps = {
    pagination,
    loading: loading.effects['permissions/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'permissions/updateState',
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
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'permissions/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'permissions/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const permissionSearchProps = {
    keyword,
    onSearch (fieldsValue) {
      dispatch(
        routerRedux.push({
          pathname: '/permissions',
          query: { page: 1, ...fieldsValue },
        }),
      )
    },

    onReset () {
      dispatch({
        type: 'permissions/updateQueryKey',
        payload: {
          keyword: '',
        },
      })
    },
  }

  const permissionModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `permissions/${modalType}`,
        payload: data,
      })
    },

    onCancel () {
      dispatch({
        type: 'permissions/hideModal',
      })
    },

  }

  const permissionActionProps = {
    onCreate () {
      dispatch({
        type: 'permissions/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'permissions/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'permissions/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/permissions',
          query: { page: 1, keyword: kw },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/permissions',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }

  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <PermissionSearch {...permissionSearchProps} />
      }
      <PermissionAction {...permissionActionProps} />
      <PermissionList {...permissionListProps} />
      { modalVisible && <PermissionModal {...permissionModalProps} /> }
    </div>
  )
}

Permissions.propTypes = {
  permissions: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ permissions, loading }) {
  return { permissions, loading }
}

export default connect(mapStateToProps)(Permissions)
