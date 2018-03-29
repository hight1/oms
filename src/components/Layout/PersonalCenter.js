import React from 'react'
import { Modal, Row, Col, Form, Input } from 'antd'

const FormItem = Form.Item

class PersonalCenter extends React.Component {
  constructor () {
    super()
    this.state = {
      visible: false,
      handleOk: this.props.handleOk,
    }
  }
  hideCenter = () => {
    this.setState({
      visible: false,
    })
  }

  render () {
    // const { visible } = this.state
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    }
    return (
      <div>
        <Modal visible={this.props.visible} onCancel={this.hideCenter} title="个人中心" onOk={this.props.handleOk}>
          <Form>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label="旧密码">
                  {getFieldDecorator('oldPassword', {
                    rules: [{
                      required: true,
                      message: '不能为空',
                    }],
                  })(
                    <Input />
              )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem {...formItemLayout} label="新密码">
                  {getFieldDecorator('newPassword', {
                    rules: [{
                      required: true,
                      message: '不能为空',
                    }],
                  })(
                    <Input />
              )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem {...formItemLayout} label="确认新密码">
                  {getFieldDecorator('newPassword2', {
                    rules: [{
                      required: true,
                      message: '不能为空',
                    }],
                  })(
                    <Input />
              )}
                </FormItem>
              </Col>
            </Row>
          </Form>

        </Modal>
      </div>
    )
  }
}

export default Form.create()(PersonalCenter)
