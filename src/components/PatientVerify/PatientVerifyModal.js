import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Row, Col, Input,
  Modal, Card, Select, message,
} from 'antd'

import { getStatus } from '../../utils/helper'

import ThumbPic from '../ThumbPic/ThumbPic'

const FormItem = Form.Item
const Option = Select.Option

const statusList = [
  {
    name: '认证失败',
    code: 3,
  },
  {
    name: '认证成功',
    code: 2,
  },
]

const PatientVerifyModal = ({
  item = {},
  onOk,
  handleChange,
  judgeStatus,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  // let card = item.idCardFrontPic.slice(1, -1)
  // let num = card.indexOf(',')
  // let frontPic = card.slice(0, num).slice(1, -1)
  // let backPic = card.slice(num + 1).slice(1, -1)
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      let { idCardPicAuthStatus } = data
      if (idCardPicAuthStatus === '2' || idCardPicAuthStatus === '认证成功') {
        idCardPicAuthStatus = true
      } else {
        if (data.authRemark === null || data.authRemark === '' || data.authRemark === undefined) {
          message.error('审核备注不能为空')
          return false
        }
        idCardPicAuthStatus = false
      }
      onOk({
        code: item.code,
        enable: idCardPicAuthStatus,
        authRemark: data.authRemark,
        idCardPicAuthStatus: item.type,
      })
    })
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={24} >
            <Card bordered={false} style={{ width: 300, marginLeft: 20, color: '#000' }} noHovering>
              <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>姓名：</div><span>{item.name}</span></div>
              <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>手机号：</div><span>{item.mobile}</span></div>
              <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>提交时间：</div><span>{item.submitTime}</span></div>
              <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>审核结果：</div><span>{item.result}</span></div>
              <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>认证结果：</div><span>{getStatus(item.idCardPicAuthStatus)}</span></div>
              <div><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>身份证号：</div><span>{item.idCard}</span></div>

            </Card>
          </Col>
          <Col span={24}>
            <div>
              <span style={{ marginLeft: 23, marginBottom: 20, display: 'block', color: '#000' }}>身份证正面照:</span>
              <ThumbPic item={item.idCardPics === null ? '' : item.idCardPics[0]} />
            </div>
          </Col>
          <Col span={24}>
            <div>
              <span style={{ marginLeft: 23, marginBottom: 20, display: 'block', color: '#000' }}>身份证反面照:</span>

              <ThumbPic item={item.idCardPics === null ? '' : item.idCardPics[1]} />
            </div>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="认证结果"
              hasFeedback
            >
              {getFieldDecorator('idCardPicAuthStatus', {
                rules: [
                  { required: true, message: '请填写认证结果' },

                ],
                initialValue: item.idCardPicAuthStatus === 2 || item.idCardPicAuthStatus === '2' ? '2' : '3',
              })(
                <Select placeholder="--请选择--" onChange={handleChange}>
                  {
                    statusList.map((val) => {
                      return (
                        <Option key={val.code} value={`${val.code}`}>{val.name}</Option>
                      )
                    })
                  }
                </Select>
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="审核备注">
              {getFieldDecorator('authRemark', {
                initialValue: item.authRemark,
              })(
                <Input placeholder="请详细填写失败原因。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }}  /* disabled={judgeStatus === 2}*/ />
                )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

PatientVerifyModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(PatientVerifyModal)
