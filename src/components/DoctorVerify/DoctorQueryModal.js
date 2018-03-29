import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col,
  Card, Button,
} from 'antd'
// import ThumbPic from '../ThumbPic/ThumbPic'

import { getDoctorStatus, format } from '../../utils/helper'

const DoctorQueryModal = ({
  item = {},
  // onOk,
  // judgeStatus,
  // handleChange,
  // form: {
  //   validateFields,
  // },
  // ...modalProps
}) => {
  const doctorVerify = item
 // let special = doctorVerify.specialization === null ? '' : doctorVerify.specialization.slice(1, -1).split(',')
  // function handleOk () {
  //   validateFields((errors) => {
  //     if (errors) {
  //       return
  //     }
  //     onOk()
  //   })
  // }

  return (

    <Form>
      <Row>
        <Col span={24}>
          <Link to="/physician-auths"><Button type="primary" size="large" style={{ marginLeft: '30px' }}>返回</Button></Link>

        </Col>
        <Col span={24} >
          <Card bordered={false} style={{ width: '300px', marginLeft: '20px', color: '#000' }} noHovering>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ textAlign: 'right',
                width: '60px',
                display: 'inline-block' }}
              >医师头像：</div>
              <div style={{
                height: 100,
                width: 100,
                display: 'inline-block',
                borderWidth: 1,
                borderColor: '#000',
              }}
              >
                <img style={{
                  height: 101,
                  width: 101,
                }} src={doctorVerify.image === null ? '' : doctorVerify.image} alt="正在加载..."
                />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: '60px', display: 'inline-block' }}>医师姓名：</div><span>{doctorVerify.name}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: '60px', display: 'inline-block' }}>手机号：</div><span>{doctorVerify.mobile}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: '60px', display: 'inline-block' }}>身份证号：</div><span>{doctorVerify.idCard}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: '60px', display: 'inline-block' }}>医院名称：</div><span>{doctorVerify.hospitalName}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: '60px', display: 'inline-block' }}>一级科室：</div><span>{doctorVerify.deptParentName}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: '60px', display: 'inline-block' }}>科室名称：</div><span>{doctorVerify.deptName}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: '60px', display: 'inline-block' }}>认证状态：</div><span>{getDoctorStatus(doctorVerify.physicianAuthStatus)}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>是否测试：</div><span>{
                  doctorVerify.isExpert === 1 || doctorVerify.isExpert === '1' ? '否' : '是'}</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: '90px', display: 'inline-block', marginLeft: '-30px' }}>视频咨询单价：</div><span>{doctorVerify.vcPrice}元/分钟</span></div>
            <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: '60px', display: 'inline-block' }}>提交时间：</div><span>{format(doctorVerify.submitTime)}</span></div>
            <div style={{ marginBottom: 40 }}><div style={{ textAlign: 'right', width: '60px', display: 'inline-block' }}>审核备注：</div><div style={{ paddingLeft: 70, lineHeight: 2, marginTop: -20 }}>{doctorVerify.authRemark}</div></div>
            {/* <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: '60px', display: 'inline-block' }}>擅长疾病：</div>
                <span>{
                  doctorVerify.specialization.map((val) => {
                    return val
                  })
                  }</span>
              </div> */}
            {/* <div><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>擅长疾病：</div><span>
                {
                  special === null || special === '' ? '' :
                  special.map((val) => {
                    let specialName = val.slice(1, -1)
                    return `${specialName}    `
                  })

                }</span></div> */}
          </Card>
        </Col>
        {/* <Col span={24}>
            <div>
              <span style={{ marginLeft: 43, marginBottom: 20, display: 'block', color: '#000' }}>执业证书:</span>
              <ThumbPic item={doctorVerify.qualificationImages === null ? '' : doctorVerify.qualificationImages[0]} />
              <ThumbPic item={doctorVerify.qualificationImages === null ? '' : doctorVerify.qualificationImages[1]} />
            </div>
          </Col> */}


      </Row>
    </Form>
  )
}

DoctorQueryModal.propTypes = {
  item: PropTypes.object,
}

export default Form.create()(DoctorQueryModal)
