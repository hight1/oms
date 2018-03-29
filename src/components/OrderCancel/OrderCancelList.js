import React from 'react'
import { Input, Row, Col, Form, Button } from 'antd'
import '../../themes/index.less'

const FormItem = Form.Item
const { TextArea } = Input

const OrderCancelList = ({
  onOk,
  form: {
    getFieldDecorator,
    getFieldsValue,
    validateFields,
  },
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      onOk({
        ...data,
      })
    })
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }
  return (
    <Form>
      <Row>
        <fieldset style={{ border: 0 }}>
          <legend>解除订单</legend>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="订单号"
            >
              {getFieldDecorator('orderNo', {

              })(
                <Input />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="解除原因"
            >
              {getFieldDecorator('remark', {

              })(
                <TextArea rows={5} />

                )}
            </FormItem>
          </Col>
          <Col offset={18} span={24}>
            <Button type="primary" onClick={handleOk}>解除订单</Button>
          </Col>
        </fieldset>
      </Row>
    </Form>

  )
}

export default Form.create()(OrderCancelList)
