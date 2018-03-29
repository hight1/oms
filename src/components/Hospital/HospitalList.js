import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table, Alert, Popover, Popconfirm } from 'antd'
// import { getHospitalStatus } from '../../utils/helper'
import { ListPopOverStyle, longText } from '../Department/List.less'

import '../../themes/index.less'

const HospitalList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  // onEdit,
  // onVerify,
  onDelete,
  rowSelection,
}) => {
  const columns = [
    {
      title: '医院名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        const content = (
          <div className={ListPopOverStyle}>
            <p> {text}</p>
          </div>
        )
        return (
          <Popover content={content} title="医院名称" trigger="hover" placement="topRight" arrowPointAtCenter>
            <div className={longText}>{record.name}</div>
          </Popover>
        )
      },

    }, {
      title: '医院等级',
      dataIndex: 'levelName',
      key: 'levelName',
      className: 'column-center',
      render: (text, record) => {
        const levelName = record.levelName || '未填写'
        return (
          levelName
        )
      },
    },
    // {
    //   title: '审核状态',
    //   dataIndex: 'verify',
    //   key: 'verify',
    //   className: 'column-center',
    //   render: (text, record) => {
    //     const hospitalStatus = getHospitalStatus(record.verify)
    //     return (
    //       <Badge status={hospitalStatus.status} text={hospitalStatus.text} />
    //     )
    //   },
    // },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      className: 'column-right',
    },
    // {
    //   title: '地域',
    //   dataIndex: 'areaName',
    //   key: 'areaName',
    //   className: 'column-center',
    // },
    {
      title: '医院地址',
      dataIndex: 'address',
      key: 'address',
      className: 'longText',
      render: (text, record) => {
        const content = (
          <div className={ListPopOverStyle}>
            <p> {text}</p>
          </div>
        )
        return (
          <Popover content={content} title="地址详情" trigger="hover" placement="topRight" arrowPointAtCenter>
            <div className={longText}>{record.address}</div>
          </Popover>
        )
      },

    },
    {
      title: '专家人数',
      dataIndex: 'experts',
      key: 'experts',
      className: 'column-right',

    },
    {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
      className: 'column-right',

    },
    {
      title: '是否医保',
      dataIndex: 'isInsurance',
      key: 'isInsurance',
      className: 'column-center',
      render: (text, record) => {
        return record.isInsurance === 1 ? '是' : '否'
      },
    },
    {
      title: '是否顶级医院',
      dataIndex: 'isTop',
      key: 'isTop',
      className: 'column-center',
      render: (text, record) => {
        const isTop = record.isTop || '未填写'
        return (
          isTop === 1 ? '是' : '否'
        )
      },
    },
    {
      title: '是否开通义诊',
      dataIndex: 'isOpenTms',
      key: 'isOpenTms',
      className: 'column-center',
      render: (text, record) => {
        const isOpenTms = record.isOpenTms || '未填写'
        return (
          isOpenTms === 1 ? '是' : '否'
        )
      },
    },
    {
      title: '特色科室数量',
      dataIndex: 'specialDeptNum',
      key: 'specialDeptNum',
      className: 'column-center',
      render: (text, record) => {
        const specialDeptNum = record.specialDeptNum || '未填写'
        return (
          specialDeptNum
        )
      },
    },
    // {
    //   title: '创建时间',
    //   dataIndex: 'createTime',
    //   key: 'createTime',
    //   width: 200,
    //   className: 'column-center',
    //   render: (text, record) => {
    //     const ctime = new Date(record.createTime)
    //     return ctime.format('yyyy-MM-dd HH:mm:ss')
    //   },
    // },
    // {
    //   title: '修改时间',
    //   dataIndex: 'updateTime',
    //   key: 'updateTime',
    //   width: 200,
    //   className: 'column-center',
    //   render: (text, record) => {
    //     const ctime = new Date(record.updateTime)
    //     return ctime.format('yyyy-MM-dd HH:mm:ss')
    //   },
    // },
    {
      title: '操作',
      key: 'operation',
      className: 'column-center',
      width: 150,
      render: (text, record) => {
        const { code } = record
        return (
          // record.verify === 2 ?
          //   <span>
         //      <a onClick={() => onEdit(code)} >编辑</a>
        //    &nbsp;&nbsp;
        //       {/* <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDelete(code)}>
        //         <a>删除</a>
         //      </Popconfirm> */}
         //    </span>
       // :
          <span>
            <Link to={`/hospitals/update/${code}`} >编辑</Link>
            &nbsp;&nbsp;
            {/* <Link to="/hospitals/verify"><a onClick={() => onVerify(code)}>审核</a></Link>
            &nbsp;&nbsp; */}
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

HospitalList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default HospitalList
