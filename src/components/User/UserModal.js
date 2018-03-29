import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Row, Col, Input,
  Modal,
} from 'antd'

const FormItem = Form.Item

const UserModal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const user = item

  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      onOk(data)
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
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="姓名">
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  type: 'string',
                  message: '不能为空',
                }],
                initialValue: user.name,
              })(
                <Input required />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="用户名">
              {getFieldDecorator('username', {
                rules: [{
                  required: true,
                  type: 'string',
                  message: '不能为空',
                }],
                initialValue: user.username,
              })(
                <Input placeholder="请输入用户名" required />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="手机号">
              {getFieldDecorator('mobile', {
                rules: [{
                  required: true,
                  pattern: /^[0-9]{11}$/,
                  message: '必须填写正确的手机号',
                }],
                initialValue: user.mobile,
              })(
                <Input placeholder="请输入手机号" required />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="邮箱地址">
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email',
                  required: true,
                  message: '必须填写正确的邮箱地址',
                }],
                initialValue: user.email,
              })(
                <Input placeholder="xyz@xx.com" required />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="密码">
              {getFieldDecorator('password', {
              })(
                <Input type="password" />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: user.remark,
              })(
                <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

UserModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(UserModal)
