import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table, Badge, Alert } from 'antd'
import { getHospitalStatus } from '../../utils/helper'

import '../../themes/index.less'

const DoctorVerifyList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  // onVerify,
  // onQuery,
}) => {
  const columns = [
    {
      title: '头像',
      dataIndex: 'image',
      key: 'image',
      width: '60px',
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
      title: '医师姓名',
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
      title: '手机号',
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
      title: '医院名称',
      dataIndex: 'hospitalName',
      key: 'hospitalName',
      render: (text, record) => {
        const hospitalName = record.hospitalName || '未填写'
        return (
        hospitalName
        )
      },
    },
    {
      title: '科室名称',
      dataIndex: 'deptName',
      key: 'deptName',
      render: (text, record) => {
        const deptName = record.deptName || '未填写'
        return (
        deptName
        )
      },
    },
    {
      title: '认证状态',
      dataIndex: 'physicianAuthStatus',
      key: 'physicianAuthStatus',
      className: 'column-center',
      render: (text, record) => {
        const physicianStatus = getHospitalStatus(record.physicianAuthStatus)
        return (
          <Badge status={physicianStatus.status} text={physicianStatus.text} />
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
      onFilter: (value, record) => record.physicianAuthStatus.indexOf(value) === 0,
    },
    // {
    //   title: '提交时间',
    //   dataIndex: 'submitTime',
    //   key: 'submitTime',
    //   className: 'column-center',
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
      render: (text, record) => {
        const { code } = record

        return (
          <span >
            <Link to={`/physician-auths/verify/${code}`} >审核</Link>
          &nbsp;&nbsp;
            {/* <Link to={`/physician-auths/query/${code}`} ><a>详情</a></Link>
          &nbsp;&nbsp; */}
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

DoctorVerifyList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default DoctorVerifyList
