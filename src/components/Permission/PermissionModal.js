import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Row, Col, Input,
  Modal,
} from 'antd'

const FormItem = Form.Item

const PermissionModal = ({
  item = {},
  visible,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      onOk(data)
    })
  }

  const modalOpts = {
    title: '角色',
    visible,
    onOk: handleOk,
    onCancel,
    width: 720,
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }

  const config = {
    rules: [{ type: 'string', required: true, message: '不能为空' }],
  }

  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} label="范围">
              {getFieldDecorator('scope', {
                ...config,
                initialValue: item.scope,
              })(
                <Input placeholder="请输入权限范围" />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="代码">
              {getFieldDecorator('code', {
                ...config,
                initialValue: item.code,
              })(
                <Input placeholder="请输入权限代码" />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator('name', {
                ...config,
                initialValue: item.name,
              })(
                <Input placeholder="请输入权限名称" />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

PermissionModal.propTypes = {
  item: PropTypes.object,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(PermissionModal)
