import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Row, Col, Input,
  Modal, Select,
} from 'antd'

const Option = Select.Option
const { TextArea } = Input

const FormItem = Form.Item

const DiseasesModal = ({
  item = {},
  onOk,
  hospitalSpecial,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps

}) => {
  const diseases = item

  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      onOk(
        {
          code: diseases.code,
          ...data,
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
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="疾病名称">
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  type: 'string',
                  message: '不能为空',
                }],
                initialValue: diseases.name,
              })(
                <Input required />
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="科室名称"
              hasFeedback
            >
              {getFieldDecorator('deptId', {
                rules: [
                  { required: true, message: '请选择科室名称！' },

                ],
                initialValue: diseases.deptId === undefined ? '' : `${diseases.deptId}`,

              })(
                <Select
                  placeholder="请选择科室名称"
                >
                  {hospitalSpecial.data === undefined ? '' : hospitalSpecial.data.map((val) => {
                    return (
                      <Option key={val.id} value={`${val.id}`}>{val.name}&nbsp;</Option>
                    )
                  })}
                </Select>
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="疾病描述">
              {getFieldDecorator('description', {
                rules: [{
                  required: true,
                  message: '请简单描述疾病症状',
                }],
                initialValue: diseases.description,
              })(
                <TextArea rows={5} />
                )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

DiseasesModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(DiseasesModal)
