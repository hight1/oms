import React from 'react'
import PropTypes from 'prop-types'
import { Table, Alert, Popconfirm, Popover } from 'antd'
import { longText, ListPopOverStyle, left } from '../Department/List.less'
import '../../themes/index.less'

const DiseasesList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: '疾病名称',
      dataIndex: 'name',
      key: 'name',
      className: left,
      width: '200px',
      render: (text, record) => {
        const name = record.name || '未填写'
        return (
          name
        )
      },
    }, {
      title: '疾病描述',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => {
        const content = (
          <div className={ListPopOverStyle}>
            <p> {text}</p>
          </div>
        )
        return (
          <Popover content={content} title="疾病描述详情" trigger="hover" placement="topRight" arrowPointAtCenter>
            <div className={longText}>{record.description}</div>
          </Popover>

        )
      },
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      className: 'column-center',
      width: 200,
      render: (text, record) => {
        const updateTime = record.updateTime || '未填写'
        return (
          updateTime
        )
      },
    },

    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
      className: 'column-center',
      width: 200,
      render: (text, record) => {
        const createTime = record.createTime || '未填写'
        return (
          createTime
        )
      },
    },
    {
      title: '操作',
      key: 'operation',
      className: 'column-center',
      width: 150,
      render: (text, record) => {
        const { code } = record
        return (
          <span>
            <a onClick={() => onEdit(code)} >编辑</a>
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
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.code}
        pagination={pagination}
        onChange={onPageChange}
      />
    </div>
  )
}

DiseasesList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default DiseasesList
