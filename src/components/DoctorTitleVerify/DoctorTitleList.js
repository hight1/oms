import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table, Badge, Alert } from 'antd'
import { getHospitalStatus } from '../../utils/helper'

const DoctorTitleList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  // onEdit,
  // onQuery,

}) => {
  const columns = [
    {
      title: '医生头像',
      dataIndex: 'image',
      key: 'image',
      width: '80px',
      render: (text, record) => {
        const imgUrl = record.image || 'https://gtms03.alicdn.com/tps/i3/TB1opXxHXXXXXahXpXXvBLt6FXX-230-230.png'
        return (
          <img
            src={imgUrl}
            width={50}
            height={50}
            style={{ borderRadius: '50%' }}
            role="presentation"
          />
        )
      },
    },
    {
      title: '医生姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        const name = record.name
        return (
        name
        )
      },
    },
    {
      title: '医院',
      dataIndex: 'hospitalName',
      key: 'hospitalName',
      render: (text, record) => {
        const name = record.hospitalName
        return (
        name
        )
      },
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      key: 'deptName',
      render: (text, record) => {
        const name = record.deptName
        return (
        name
        )
      },
    },
    // {
    //   title: '医生手机号',
    //   dataIndex: 'mobile',
    //   key: 'mobile',
    //   render: (text, record) => {
    //     const mobile = record.mobile || '未填写'
    //     return (
    //     mobile
    //     )
    //   },
    // },
    {
      title: '待审职称名称',
      dataIndex: 'titleNme',
      key: 'titleNme',
      render: (text, record) => {
        const titleName = record.titleName || '未填写'
        return (
        titleName
        )
      },
    },
    {
      title: '审核状态',
      dataIndex: 'titleAuthStatus',
      key: 'titleAuthStatus',
      render: (text, record) => {
        const titleStatus = getHospitalStatus(record.titleAuthStatus)
        return (
          <Badge status={titleStatus.status} text={titleStatus.text} />
        )
      },
      filters: [{
        text: '审核成功',
        value: '2' || 2,
      }, {
        text: '审核失败',
        value: '3' || 3,
      }, {
        text: '审核中',
        value: '1' || 1,
      }],
      filterMultiple: false,
      onFilter: (value, record) => record.titleAuthStatus.indexOf(value) === 0,
    },
    // {
    //   title: '提交时间',
    //   dataIndex: 'submitTime',
    //   key: 'submitTime',
    //   render: (text, record) => {
    //     const submitTime = record.submitTime || '未填写'
    //     return (
    //     format(submitTime)
    //     )
    //   },
    //   sorter: (a, b) => a.submitTime - b.submitTime,
    // },
    {
      title: '操作',
      key: 'operation',
      className: 'column-center',
      render: (text, record) => {
        const { code } = record
        return (
          <div style={{ textAlign: 'center' }}>
            <Link to={`/title-auths/verify/${code}`} >审核</Link>
      &nbsp;&nbsp;
            {/* <Link to={`/title-auths/query/${code}`} ><a>详情</a></Link>
        &nbsp;&nbsp; */}
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

DoctorTitleList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default DoctorTitleList
