import React from 'react'
import PropTypes from 'prop-types'

import {
  Form, Row, Col, Input,
  Modal, Card,
} from 'antd'

import RotateImage from '../DoctorVerify/RotateImage'
import { getQueStatus } from '../../utils/helper'

const FormItem = Form.Item


const QuestionsModal = ({
  item = {},
  onOk,
  handleChange,
  judgeStatus,
  type,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      onOk({
        code: item.code,
        from: '9999',
        to: item.imGroupId,
        ext: {
          content: data.content,
          type: 0,
          duration: 0,
          title: item.title,
        },
        toUid: item.uid,
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
              <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>标题：</div><span>{item.title}</span></div>
              <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>订单号：</div><span>{item.orderNo}</span></div>
              <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>标签：</div><span>{item.tags}</span></div>
              <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>内容：</div><span>{item.content}</span></div>
              <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>回复状态：</div>
                <span>{getQueStatus(`${item.status}`).text}</span></div>
              <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>问题截图：</div>
                {(item.images === null || item.images === undefined) ? '' :
              item.images.map((val, index) => {
                return (
                  <RotateImage key={index} src={val} />
                )
              })
              }
              </div>
            </Card>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="回复内容">
              {getFieldDecorator('content', {
              })(
                <Input placeholder="回复问题。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }}  /* disabled={judgeStatus === 2}*/ />
                )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

QuestionsModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(QuestionsModal)
