import React from 'react'
import PropTypes from 'prop-types'
import { Table, Alert } from 'antd'
// import { getHospitalStatus } from '../../utils/helper'
// import { ListPopOverStyle, longText } from '../Department/List.less'

import '../../themes/index.less'

const MembersList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  onEdit,
  onVerify,
}) => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        const name = record.name || '未填写'
        return (
          name
        )
      },

    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      className: 'column-center',
      render: (text, record) => {
        const sex = record.sex || '未填写'
        return (
          sex === 0 ? '男' : '女'
        )
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      className: 'column-right',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      className: 'column-right',
    },
    {
      title: '区域名称',
      dataIndex: 'areaName',
      key: 'areaName',
      className: 'column-center',
    },
    {
      title: '就诊人数',
      dataIndex: 'patientNum',
      key: 'patientNum',
      className: 'column-center',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      className: 'column-center',
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
            <a onClick={() => onVerify(code)} >审核</a>
            &nbsp;&nbsp;
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

MembersList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default MembersList
