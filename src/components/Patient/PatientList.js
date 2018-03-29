import React from 'react'
import PropTypes from 'prop-types'
import { Table, Alert } from 'antd'
import { Link } from 'dva/router'

import { getGender } from '../../utils/helper.js'

const PatientList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  rowSelection,
  onPageChange,

}) => {
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => {
      const name = record.name
      return (
        name
      )
    },
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render: (text, record) => {
      const sex = record.sex || '未填写'
      return (
        getGender(sex)
      )
    },
  }, {
    title: '手机',
    dataIndex: 'mobile',
    key: 'mobile',
    render: (text, record) => {
      const mobile = record.mobile || '未填写'
      return (
        mobile
      )
    },
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    key: 'birthday',
    render: (text, record) => {
      const birthday = record.birthday || '未填写'
      return (
        birthday
      )
    },
  },
  // {
  //   title: '区域名称',
  //   dataIndex: 'areaName',
  //   key: 'areaName',
  //   render: (text, record) => {
  //     const areaName = record.areaName || '未填写'
  //     return (
  //       areaName
  //     )
  //   },
  // },
  // {
  //   title: '称呼',
  //   dataIndex: 'nickName',
  //   key: 'nickName',
  //   render: (text, record) => {
  //     const nickName = record.nickName || '未填写'
  //     return (
  //       nickName
  //     )
  //   },
  // },
  // {
  //   title: '病例数',
  //   dataIndex: 'caseNum',
  //   key: 'caseNum',
  //   render: (text, record) => {
  //     const caseNum = record.caseNum || '未填写'
  //     return (
  //       caseNum
  //     )
  //   },
  // },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
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
    render: (text, record) => {
      const { code } = record
      return (
        <span>
          <Link to={`/patients/edit/${code}`}>详情</Link>
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
        rowSelection={rowSelection}
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

PatientList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default PatientList
