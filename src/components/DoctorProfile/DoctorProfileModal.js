import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Card, Button,
} from 'antd'
import ThumbPic from '../ThumbPic/ThumbPic'

import { getStatus, format } from '../../utils/helper'

const DoctorProfileModal = ({
  item = {},
  // onOk,
  // handleChange,
  // judgeStatus,
  // form: {
  //   validateFields,
  // },
  // ...modalProps
}) => {
  const doctorTitle = item

  // function handleOk () {
  //   validateFields((errors) => {
  //     if (errors) {
  //       return
  //     }
  //     onOk()
  //   })
  // }
  // const modalOpts = {
  //   ...modalProps,
  //   onOk: handleOk,
  // }

  return (
    <Form>
      <Row>
        <Col span={24} >
          <Card bordered={false} style={{ width: 300, marginLeft: 20, color: '#000' }} noHovering>
            <div style={{ marginBottom: 20 }}>
              <div style={{ textAlign: 'right',
                width: '60px',
                display: 'inline-block' }}
              >头像：</div>
              <div style={{ paddingLeft: 70, lineHeight: 2 }}><img style={{ width: 100, height: 100 }} src={doctorTitle.image === null ? '' : doctorTitle.image} alt="正在加载数据..." /></div>
            </div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>姓名：</div><span>{ doctorTitle.name}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>手机号：</div><span>{ doctorTitle.mobile}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>是否测试：</div><span>{
                  doctorTitle.isExpert === 1 || doctorTitle.isExpert === '1' ? '否' : '是'}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>职称名称：</div><span>{ doctorTitle.titleName}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 90, display: 'inline-block', marginLeft: -30 }}>职称认证状态：</div><span>{getStatus(doctorTitle.titleAuthStatus)}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: '90px', display: 'inline-block', marginLeft: '-30px' }}>视频咨询单价：</div><span>{doctorTitle.vcPrice}元/分钟</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>提交时间：</div><span>{format(doctorTitle.submitTime)}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>审核备注：</div><div style={{ paddingLeft: 70,
              width: 250,
              lineHeight: 2,
              marginTop: -20,
              wordWrap: 'break-word' }}
            >{ doctorTitle.authRemark}</div></div>
          </Card>
        </Col>
        <Col span={24}>
          <div>
            <span style={{ marginLeft: 43, marginBottom: 20, display: 'block', color: '#000' }}>职称证明:</span>
            <div style={{ marginLeft: '4rem', marginBottom: '1rem' }}><a href="http://zgcx.nhfpc.gov.cn/doctorsearch.aspx" target="blank">验证网站</a></div>
            { doctorTitle.titleImageList === undefined ? '' :
                doctorTitle.titleImageList.map((val, index) => {
                  return <ThumbPic item={val} key={index} />
                })

              }
            {/* <ThumbPic item={doctorTitle.titleImageList === null ? '' : doctorTitle.titleImageList[0]} />
              <ThumbPic item={doctorTitle.titleImageList === null ? '' : doctorTitle.titleImageList[1]} /> */}
          </div>
        </Col>
        <Col span={24}>
          <Link to="/doctor-profiles"><Button type="primary" size="large" style={{ marginLeft: '30px' }}>返回</Button></Link>

        </Col>

      </Row>
    </Form>
  )
}

DoctorProfileModal.propTypes = {
  item: PropTypes.object,
  // onOk: PropTypes.func,
  // visible: PropTypes.bool,
  // onCancel: PropTypes.func,
}

export default Form.create()(DoctorProfileModal)
