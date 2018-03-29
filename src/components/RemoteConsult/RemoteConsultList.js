import React from 'react'
import PropTypes from 'prop-types'
import { Table, Badge, Popover } from 'antd'
import { Link } from 'dva/router'
import styles from './RemoteConsult.less'
import { ListPopOverStyle, longText } from '../Department/List.less'
import { getRemoteConsultStatus, getPayStatus } from '../../utils/helper'
// import { ListPopOverStyle, longText } from '../Department/List.less'

import '../../themes/index.less'

const RemoteConsultList = ({
  pagination,
  loading,
  dataSource,
  onPageChange,
  // onQuery,
  rowSelection,
}) => {
  const columns = [
    {
      title: '订单号',
      key: 'orderNo',
      className: 'column-center',
      render: (text, record) => {
        const orderNo = record.orderNo || '未填写'
        return (
          <div>
            {

              <div style={{ float: 'left' }}>
                <div>
                  {orderNo}
                </div>

              </div>
               }
          </div>
        )
      },
    },
    {
      title: '服务方信息',
      className: 'column-center',
      render: (text, record) => {
        const content = (
          <div className={ListPopOverStyle}>
            <p style={{ marginBottom: '1rem' }}>{`${record.service.hospitalName}`}</p>
            <p> {`${record.service.name}  ·  ${record.service.titleName}  ·  ${record.service.deptName}`}</p>
          </div>
        )
        return (
          <div>
            {
              <div className={styles.infoBlock}>
                <div style={{ width: '50px', marginLeft: '-50px', float: 'left' }}>
                  <div>
                    <img src={record.service.image} role="presentation"
                      width={50}
                      height={50}
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                </div>
                <div style={{ width: '100%', float: 'left' }}>
                  <div style={{ marginLeft: '1rem' }}>
                    <Popover content={content} title="服务方信息" trigger="hover" placement="topRight" arrowPointAtCenter>
                      <div className={longText} style={{ textAlign: 'left', marginBottom: '1rem' }}>{`${record.service.hospitalName}`}</div>
                      <div className={longText} style={{ textAlign: 'left', marginBottom: '1rem' }}>{`${record.service.name}  ·  ${record.service.titleName}  ·  ${record.service.deptName}`}</div>
                    </Popover>
                  </div>
                </div>
              </div>}
          </div>
        )
      },
      // children: [
      //   {
      //     title: '头像',
      //     key: 'image',
      //   },
      //   {
      //     title: '姓名',
      //     key: 'service.name',
      //     className: 'column-center',
      //   },
      //   {
      //     title: '医院名称',
      //     key: 'service.hospitalName',
      //   },
      //   {
      //     title: '科室名称',
      //     key: 'service.deptName',
      //     className: 'column-center',
      //   },
      //   {
      //     title: '职称名称',
      //     key: 'service.title',
      //     className: 'column-center',
      //   },
      // ],
    },
    {
      title: '申请方信息',
      className: 'column-center',
      render: (text, record) => {
        return (
          <div className={styles.infoBlock2}>
            <div>
              {record.apply.name}
            </div>
            <div>
              {record.apply.hospitalName}
            </div>
            <div>
              {`就诊人：${record.apply.patientName}`}
            </div>
          </div>
        )
      },
    },
    // {
    //   title: '会诊开始时间',
    //   dataIndex: 'startTime',
    //   key: 'startTime',
    //   className: 'column-center',
    //   render: (text, record) => {
    //     const startTime = record.startTime || '未填写'
    //     return (
    //       startTime
    //     )
    //   },
    // },
    // {
    //   title: '会诊结束时间',
    //   dataIndex: 'endTime',
    //   key: 'endTime',
    //   className: 'column-center',
    //   render: (text, record) => {
    //     const endTime = record.endTime || '未填写'
    //     return (
    //       endTime
    //     )
    //   },
    // },
    // {
    //   title: '视频频道',
    //   dataIndex: 'channelToken',
    //   key: 'channelToken',
    //   className: 'column-center',
    //   render: (text, record) => {
    //     const channel = record.channelToken || '未填写'
    //     return (
    //       channel
    //     )
    //   },
    // },
    {
      title: '订单信息',
      key: 'orderInfo',
      className: 'column-center',
      render: (text, record) => {
        return (
          <div className={styles.infoBlock3}>
            <div>
              {<Badge status={getRemoteConsultStatus(record.status).status} text={getRemoteConsultStatus(record.status).text} />}
            </div>
            <div>
              {<Badge status={getPayStatus(record.payStatus).status} text={getPayStatus(record.payStatus).text} />}
            </div>
            <div>
              {`会诊时间：${record.consultTime}`}
            </div>
          </div>

        )
      },
    },

    // {
    //   title: '会诊创建时间',
    //   dataIndex: 'createTime',
    //   key: 'createTime',
    //   className: 'column-center',
    //   render: (text, record) => {
    //     const createTime = record.createTime || '未填写'
    //     return (
    //       createTime
    //     )
    //   },
    // },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        const orderNo = record.orderNo || '未填写'
        return (
          <span>
            <Link to={`/remote-consult/edit/${orderNo}`} >详情</Link>
&nbsp;&nbsp;
          </span>
        )
      },
    },
  ]

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.orderNo}
        pagination={pagination}
        onChange={onPageChange}
        rowSelection={rowSelection}

      />
    </div>
  )
}

RemoteConsultList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default RemoteConsultList
