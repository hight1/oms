import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../../components/User/UserList'
import UserSearch from '../../components/User/UserSearch'
import UserAction from '../../components/User/UserAction'
import UserModalGrant from '../../components/User/UserModalGrant'
import UserModal from '../../components/User/UserModal'

function Users ({ users, auth, loading, location, dispatch }) {
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
  } = users

  const currentUser = auth.user

  const userSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'users/updateSearchMode',
        payload: {
          searchMode: 'simple',
        },
      })
    },
    onSearch (fieldsValue) {
      dispatch(
        routerRedux.push({
          pathname: '/users',
          query: { page: 1, ...fieldsValue },
        }),
      )
    },
    onReset () {
      dispatch(
        routerRedux.push({
          pathname: '/users',
        }),
      )
    },
  }

  const userListProps = {
    pagination,
    loading: loading.effects['users/query'],
    currentUser,
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'users/updateState',
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
    onEdit (id) {
      dispatch({
        type: 'users/edit',
        payload: {
          id: id,
        },
      })
    },
    onDeny (id, enable) {
      dispatch({
        type: 'users/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'users/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
    onDelete (id) {
      dispatch({
        type: 'users/delete',
        payload: id,
      })
    },
  }

  const userActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'users/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'users/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/users',
          query: { page: 1, keyword: kw },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/users',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }

  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['users/update'],
    title: `${modalType === 'create' ? '创建用户' : '更新用户'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `users/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'users/hideModal',
      })
    },
  }

  const userModalGrantProps = {
    item: currentItem,
    visible: modalGrantVisible,
    onOk (data) {
      dispatch({
        type: 'users/grant',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'users/hideModalGrant',
      })
    },

  }

  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <UserSearch {...userSearchProps} />
      }
      <UserAction {...userActionProps} />
      <UserList {...userListProps} />
      { modalVisible && <UserModal {...userModalProps} />}
      { modalGrantVisible && <UserModalGrant {...userModalGrantProps} /> }
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.object,
  auth: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ users, auth, loading }) {
  return { users, auth, loading }
}

export default connect(mapStateToProps)(Users)
