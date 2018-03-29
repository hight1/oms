import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, Alert } from 'antd'

const PermissionList = ({
  pagination,
  selectedRowKeys,
  loading,
  dataSource,
  rowSelection,
  onPageChange,
  onDeleteItem,
  onEditItem,
}) => {
  const columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '范围',
    dataIndex: 'scope',
    key: 'scope',
  }, {
    title: '代码',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '创建时间',
    dataIndex: 'createdDate',
    key: 'createdDate',
  }, {
    title: '更新时间',
    dataIndex: 'lastModifiedDate',
    key: 'lastModifiedDate',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => {
      return (
        <div>
          <a onClick={() => onEditItem(record)}>编辑</a>
          &nbsp;&nbsp;
          <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </div>
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

PermissionList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
}

export default PermissionList
