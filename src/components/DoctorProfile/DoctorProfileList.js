import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table, Alert } from 'antd'
// import { getHospitalStatus } from '../../utils/helper'

const DoctorProfileList = ({
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
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text, record) => {
        const mobile = record.mobile
        return (
          mobile
        )
      },
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      render: (text, record) => {
        const submitTime = record.submitTime
        return (
        submitTime
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
      title: '擅长疾病',
      dataIndex: 'special',
      key: 'special',
      render: (text, record) => {
        const special = `${record.special}` === 'null' ? '未填写' : `${record.special}`
        return special
      },
    },
    {
      title: '操作',
      key: 'operation',
      className: 'column-center',
      render: (text, record) => {
        const { code } = record
        return (
          <div style={{ textAlign: 'center' }}>
            <Link to={`/doctor-profiles/verify/${code}`} >审核</Link>
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

DoctorProfileList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default DoctorProfileList
