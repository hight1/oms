import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, Badge, Alert } from 'antd'
import { getUserStatus, getIsAdminStatus } from '../../utils/helper'

const UserList = ({
  pagination,
  loading,
  currentUser,
  dataSource,
  selectedRowKeys,
  rowSelection,
  onPageChange,
  onEdit,
  onDeny,
  onGrant,
  onDelete,
}) => {
  const columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  }, {
    title: '手机',
    dataIndex: 'mobile',
    key: 'mobile',
    render: (text, record) => {
      const mobile = record.mobile || '---'
      return (
        mobile
      )
    },
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    render: (text, record) => {
      const email = record.email || '---'
      return (
        email
      )
    },
  }, {
    title: '状态',
    dataIndex: 'isEnabled',
    key: 'isEnabled',
    render: (text, record) => {
      const userStatus = getUserStatus(record.isEnabled)
      return (
        <Badge status={userStatus.status} text={userStatus.text} />
      )
    },
  }, {
    title: '管理员',
    dataIndex: 'isAdmin',
    key: 'isAdmin',
    render: (text, record) => {
      const adminStatus = getIsAdminStatus(record.isAdmin)
      return (
        <Badge status={adminStatus.status} text={adminStatus.text} />
      )
    },
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => {
      const { id, isEnabled } = record
      const active = currentUser.id === id
      let displayText

      if (isEnabled === true) {
        displayText = '禁用'
      } else {
        displayText = '启用'
      }

      return (
        <span className={'table-operation'}>
          <a onClick={() => onEdit(id)} disabled={active}>编辑</a>
          &nbsp;&nbsp;
          <a onClick={() => onGrant(record)}>授权</a>
          &nbsp;&nbsp;
          <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDeny(id, !isEnabled)}>
            <a disabled={active}>{displayText}</a>
          </Popconfirm>
          &nbsp;&nbsp;
          <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDelete(id)}>
            <a>删除</a>
          </Popconfirm>
        </span>
      )
    },
  }]

  return (
    <div>
      {
         selectedRowKeys.length > 0 &&
         <Alert message={`已选${selectedRowKeys.length}项`} type="info" showIcon style={{ marginBottom: 16 }} />
      }
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={pagination}
        onChange={onPageChange}
      />
    </div>
  )
}

UserList.propTypes = {
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDeny: PropTypes.func,
  onGrant: PropTypes.func,
  onDelete: PropTypes.func,
}

export default UserList
