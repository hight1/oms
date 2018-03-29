import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table } from 'antd'

import '../../themes/index.less'

const RCHospitalList = ({
  realPagination,
  loading,
  realDataSource,
  onRealPageChange,
  onQuery,
  realRowSelection,
}) => {
  const columns = [
    {
      title: '医院Logo',
      dataIndex: 'hospitalIcon',
      key: 'hospitalIcon',
      width: '70px',
      render: (text, record) => {
        const imgUrl = (record.hospitalIcon === null ? '' : record.hospitalIcon)
        return (
          <img
            src={imgUrl}
            width={40}
            height={40}
            style={{ borderRadius: '50%' }}
            role="presentation"
          />
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
      title: '管理员账号',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => {
        const username = record.username || '未填写'
        return (
          username
        )
      },
    },
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
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text, record) => {
        const updateTime = record.updateTime || '未填写'
        return (
          updateTime
        )
      },
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        const { uid } = record
        return (
          <span>
            <Link to={`/rc-hospital/edit/${uid}`} ><span onClick={() => onQuery(uid)}>详情</span></Link>
            &nbsp;&nbsp;
            {/* <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDelete(code)}>
              <a>删除</a>
            </Popconfirm> */}
          </span>
        )
      },
    }]
  return (
    <div>
      <Table
        rowSelection={realRowSelection}
        columns={columns}
        dataSource={realDataSource}
        loading={loading}
        rowKey={record => record.uid}
        pagination={realPagination}
        onChange={onRealPageChange}
      />
    </div>
  )
}

RCHospitalList.propTypes = {
  loading: PropTypes.bool,
}

export default RCHospitalList
