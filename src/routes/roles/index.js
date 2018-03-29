import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import RoleList from '../../components/Role/RoleList'
import RoleSearch from '../../components/Role/RoleSearch'
import RoleAction from '../../components/Role/RoleAction'
import RoleModal from '../../components/Role/RoleModal'
import RoleModalGrant from '../../components/Role/RoleModalGrant'

function Roles ({ roles, loading, location, dispatch }) {
  const {
    list,
    searchMode,
    keyword,
    pagination,
    currentItem,
    selectedRowKeys,
    modalVisible,
    modalType,
    modalGrantVisible,
  } = roles

  const roleListProps = {
    pagination,
    loading: loading.effects['roles/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'roles/updateState',
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
        type: 'roles/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'roles/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'roles/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
  }

  const roleSearchProps = {
    keyword,
    onSearch (fieldsValue) {
      dispatch(
        routerRedux.push({
          pathname: '/role',
          query: { page: 1, ...fieldsValue },
        }),
      )
    },

    onReset () {
      dispatch({
        type: 'roles/updateQueryKey',
        payload: {
          keyword: '',
        },
      })
    },
  }

  const roleModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `roles/${modalType}`,
        payload: data,
      })
    },

    onCancel () {
      dispatch({
        type: 'roles/hideModal',
      })
    },

  }

  const roleModalGrantProps = {
    item: currentItem,
    visible: modalGrantVisible,
    onOk (data) {
      dispatch({
        type: 'roles/grant',
        payload: data,
      })
    },

    onCancel () {
      dispatch({
        type: 'roles/hideModalGrant',
      })
    },

  }

  const roleActionProps = {
    onCreate () {
      dispatch({
        type: 'roles/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'roles/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'roles/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/roles',
          query: { page: 1, keyword: kw },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/roles',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }

  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <RoleSearch {...roleSearchProps} />
      }
      <RoleAction {...roleActionProps} />
      <RoleList {...roleListProps} />
      { modalVisible && <RoleModal {...roleModalProps} />}
      { modalGrantVisible && <RoleModalGrant {...roleModalGrantProps} /> }
    </div>
  )
}

Roles.propTypes = {
  roles: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ roles, loading }) {
  return { roles, loading }
}

export default connect(mapStateToProps)(Roles)
