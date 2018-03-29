import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table, Alert, Popconfirm } from 'antd'

import { left } from './List.less'
import '../../themes/index.less'

const AgencyList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  // onChangeSort,
  onEdit,
  onDelete,
  // rowClick,
  // isParent,
  rowSelection,
}) => {
  const columns = [
    {
      title: '编号',
      dataIndex: 'code',
      key: 'code',
      className: left,
      render: (text, record) => {
        const code = record.code
        return (
          code
        )
      },
    },
    {
      title: '名称',
      dataIndex: 'displayName',
      key: 'displayName',
      className: left,
      render: (text, record) => {
        const displayName = record.displayName
        return (
          displayName
        )
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      className: left,
      render: (text, record) => {
        const username = record.username
        return (
          username
        )
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      className: left,
      render: (text, record) => {
        const mobile = record.mobile
        return (
          mobile
        )
      },
    },
    {
      title: '级别',
      dataIndex: 'rank',
      key: 'rank',
      className: left,
      render: (text, record) => {
        const rank = record.rank
        if (rank === 1) {
          return (
            '个人'
          )
        } else if (rank === 2) {
          return (
            '县代'
          )
        } else if (rank === 3) {
          return (
            '市代'
          )
        } else if (rank === 4) {
          return (
            '省代'
          )
        } else if (rank === 5) {
          return (
            '官方'
          )
        }
      },
    },
    // {
    //   title: '顺序',
    //   dataIndex: 'sort ',
    //   key: 'sort',
    //   width: 100,
    //   render: (text, record) => {
    //     return (
    //       <EditableCell
    //         value={record.sort}
    //         onChange={(sort) => { onChangeSort(record, sort) }}
    //       />
    //     )
    //   },
    // },
    // {
    //   title: '是否测试账号',
    //   dataIndex: 'isEnable',
    //   key: 'isEnable',
    //   className: left,
    //   render: (text, record) => {
    //     const isEnable = record.isEnable
    //     return (
    //       isEnable === 1 ? '是' : '否'
    //     )
    //   },
    // },
    // {
    //   title: '备注',
    //   dataIndex: 'remark',
    //   key: 'remark',
    //   render: (text, record) => {
    //     const remark = record.remark
    //     return (
    //       remark
    //     )
    //   },
    // },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text, record) => {
        const createTime = record.createTime
        return (
          createTime
        )
      },
    },
    {
      title: '操作',
      key: 'operation',
      width: 200,
      render: (text, record) => {
        const { code } = record
        return (
          <span>
            <Link to={`/agencies/edit/${code}`} ><span onClick={() => onEdit(code)}>编辑</span></Link>
            &nbsp;&nbsp;
            <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDelete(code)}>
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
        columns={columns}
        rowSelection={rowSelection}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.code}
        pagination={pagination}
        onChange={onPageChange}
      />
    </div>
  )
}

AgencyList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default AgencyList
