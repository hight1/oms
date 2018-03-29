import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table, Popover, Row, Col } from 'antd'
import styles from './VideoOrders.less'
import { getVideoOrdersStatus } from '../../utils/helper'
import { ListPopOverStyle, longText } from '../Department/List.less'

import '../../themes/index.less'

const VideoOrdersList = ({
  pagination,
  loading,
  dataSource,
  onPageChange,
  // onQuery,
}) => {
  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      render: (text, record) => {
        const orderNo = record.orderNo || '未填写'
        return (
          orderNo
        )
      },
    },
    {
      title: '医生',
      className: 'column-center',
      render: (text, record) => {
        const content = (
          <div className={ListPopOverStyle}>
            <p style={{ marginBottom: '1rem' }}>{`${record.doctor.hospitalName}`}</p>
            <p> {`${record.doctor.name}  ·  ${record.doctor.titleName}  ·  ${record.doctor.deptName}`}</p>
          </div>
        )
        return (
          <div>
            {
              <div className={styles.infoBlock}>
                <div style={{ width: '50px', marginLeft: '-50px', float: 'left' }}>
                  <div>
                    <img src={record.doctor.image} role="presentation"
                      width={50}
                      height={50}
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                </div>
                <div style={{ width: '100%', float: 'left' }}>
                  <div style={{ marginLeft: '1rem' }}>
                    <Popover content={content} title="医院信息" trigger="hover" placement="topRight" arrowPointAtCenter>
                      <div className={longText} style={{ textAlign: 'left', marginBottom: '1rem' }}>{`${record.doctor.hospitalName}`}</div>
                      <div className={longText} style={{ textAlign: 'left', marginBottom: '1rem' }}>{`${record.doctor.name}  ·  ${record.doctor.titleName}  ·  ${record.doctor.deptName}`}</div>
                    </Popover>
                  </div>
                </div>
              </div>}
          </div>
        )
      },
    },
    {
      title: '患者',
      className: 'column-center',
      render: (text, record) => {
        const content = (
          <div className={ListPopOverStyle}>
            <p style={{ marginBottom: '1rem' }}> {`${record.patient.name}  ·  ${record.patient.sex === 0 ? '男' : '女'}  ·  ${record.patient.age}岁`}</p>
            <p>{`${record.patient.diagnose}`}</p>
          </div>
        )
        return (
          <div>
            {
              <div className={styles.infoBlock}>
                <div style={{ width: '50px', marginLeft: '-50px', float: 'left' }}>
                  <div>
                    <img src={record.patient.image} role="presentation"
                      width={50}
                      height={50}
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                </div>
                <div style={{ width: '100%', float: 'left' }}>
                  <div style={{ marginLeft: '1rem' }}>
                    <Popover content={content} title="患者信息" trigger="hover" placement="topRight" arrowPointAtCenter>
                      <div className={longText} style={{ textAlign: 'left', marginBottom: '1rem' }}>{`${record.patient.diagnose}`}</div>
                      <div className={longText} style={{ textAlign: 'left', marginBottom: '1rem' }}>{`${record.patient.name}  ·  ${record.patient.sex === 0 ? '男' : '女'}  ·  ${record.patient.age}岁`}</div>
                    </Popover>
                  </div>
                </div>
              </div>}
          </div>
        )
      },
    },
    // {
    //   title: '医生',
    //   className: 'column-center',
    //   children: [{
    //     title: '头像',
    //     dataIndex: 'image',
    //     key: 'image',
    //     render: (text, record) => {
    //       const image = record.image || '未填写1'
    //       return (
    //         image
    //       )
    //     },
    //   },
    //   {
    //     title: '姓名',
    //     dataIndex: 'name',
    //     key: 'name',
    //     render: (text, record) => {
    //       const name = record.name || '未填写2'
    //       return (
    //         name
    //       )
    //     },
    //   },
    //   {
    //     title: '职称名称',
    //     dataIndex: 'titleName',
    //     key: 'titleName',
    //     render: (text, record) => {
    //       const titleName = record.titleName || '未填写3'
    //       return (
    //         titleName
    //       )
    //     },
    //   },
    //   {
    //     title: '医院名称',
    //     dataIndex: 'hospitalName',
    //     key: 'hospitalName',
    //     render: (text, record) => {
    //       const hospitalName = record.hospitalName || '未填写4'
    //       return (
    //         hospitalName
    //       )
    //     },
    //   },
    //   {
    //     title: '科室名称',
    //     dataIndex: 'deptName',
    //     key: 'deptName',
    //     render: (text, record) => {
    //       const orderStatus = record.orderStatus || '未填写5'
    //       return (
    //         orderStatus
    //       )
    //     },
    //   },
    //   ],
    // },
    // {
    //   title: '患者',
    //   children: [{
    //     title: '头像',
    //     dataIndex: 'image',
    //     key: 'patientImage',
    //     render: (text, record) => {
    //       const imgUrl = (record.image == null ? '用户未上传头像' : record.image)
    //       return (
    //         <img
    //           src={imgUrl}
    //           width={40}
    //           height={40}
    //           style={{ borderRadius: '50%' }}
    //           role="presentation"
    //         />
    //       )
    //     },
    //   },
    //   {
    //     title: '姓名',
    //     dataIndex: 'name',
    //     key: 'patientName',
    //     render: (text, record) => {
    //       const name = record.name || '未填写7'
    //       return (
    //         name
    //       )
    //     },
    //   },
    //   {
    //     title: '性别',
    //     dataIndex: 'sex',
    //     key: 'sex',
    //     render: (text, record) => {
    //       const sex = record.sex || '未填写8'
    //       return (
    //         sex
    //       )
    //     },
    //   },
    //   {
    //     title: '年龄',
    //     dataIndex: 'age',
    //     key: 'age',
    //     render: (text, record) => {
    //       const age = record.age || '未填写9'
    //       return (
    //         age
    //       )
    //     },
    //   },
    //   ],
    // },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      className: 'center',
      render: (text, record) => {
        const orderStatus = record.orderStatus || '未填写'
        return (
          getVideoOrdersStatus(orderStatus)
        )
      },
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        const { orderNo } = record
        return (
          <span>
            <Link to={`/video-orders/edit/${orderNo}`} >详情</Link>
            &nbsp;&nbsp;
          </span>
        )
      },
    }]

  return (
    <Row>
      <Col span={24} >
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.orderNo}
          pagination={pagination}
          onChange={onPageChange}
        />
      </Col>

    </Row>
  )
}

VideoOrdersList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default VideoOrdersList
