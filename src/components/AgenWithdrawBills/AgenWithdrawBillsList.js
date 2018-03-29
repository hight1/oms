import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table, Alert, Badge } from 'antd'
import { getWithdrawBillsStatus } from '../../utils/helper'
// import { ListPopOverStyle, longText } from '../Department/List.less'

import '../../themes/index.less'

const WithdrawBillsList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  rowSelection,
  onWithdraw,
}) => {
  const columns = [
    {
      title: '提现单号',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => {
        const code = record.code || '未填写'
        return (
          code
        )
      },
    },
    {
      title: '代理商编号',
      dataIndex: 'agentCode',
      key: 'agentCode',
      render: (text, record) => {
        const agentCode = record.agentCode || '未填写'
        return (
          agentCode
        )
      },
    },
    {
      title: '代理商名称',
      dataIndex: 'name',
      key: 'name',
      className: 'column-center',
      render: (text, record) => {
        const name = record.name || '未填写'
        return (
          name
        )
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      className: 'column-right',
      render: (text, record) => {
        const mobile = record.mobile || '未填写'
        return (
          mobile
        )
      },
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
      key: 'amount',
      className: 'column-right',
      render: (text, record) => {
        const amount = record.amount || '未填写'
        return (
          amount
        )
      },
    },
    {
      title: '提现状态',
      dataIndex: 'status',
      key: 'status',
      className: 'column-center',
      render: (text, record) => {
        const billsStatus = getWithdrawBillsStatus(record.status)
        return (
          <Badge status={billsStatus.status} text={billsStatus.text} />
        )
      },
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      className: 'column-center',
      render: (text, record) => {
        return record.createTime
      },
    },
    {
      title: '提现方式',
      dataIndex: 'paymentName',
      key: 'paymentName',
      className: 'column-center',
      render: (text, record) => {
        const paymentName = record.paymentName || '未填写'
        return (
          paymentName
        )
      },
    },
    {
      title: '提现账号',
      dataIndex: 'account',
      key: 'account',
      width: 200,
      className: 'column-center',
      render: (text, record) => {
        const account = record.account || '未填写'
        return (
          account
        )
      },
    },
    {
      title: '操作',
      key: 'operation',
      className: 'column-center',
      width: 100,
      render: (text, record) => {
        const { code } = record
        return (
          <span onClick={() => onWithdraw(code)}>
            {/* <a onClick={() => onEdit(code)} >编辑</a>
            &nbsp;&nbsp; */}
            <Link to={`agencies/withdraw-bills/edit/${code}`} >处理</Link>
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

WithdrawBillsList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default WithdrawBillsList
