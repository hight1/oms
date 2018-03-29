import React from 'react'
import { Link } from 'dva/router'
import { Form, Row, Col, Select, Input, Button } from 'antd'


const Option = Select.Option
const FormItem = Form.Item


const WithdrawBillsModal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  const withdrawBills = item

  const statusList = [
    {
      name: '处理失败',
      code: 2,
    },
    {
      name: '已处理',
      code: 1,
    },
    {
      name: '处理中',
      code: 0,
    },

  ]
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
        <Col span={24}>
          <Link to="/agencies/withdraw-bills"><Button type="default" size="large" style={{ marginLeft: '30px' }}>返回</Button></Link>
          <Button type="primary" size="large" style={{ marginLeft: '30px' }} onClick={handleOk} /* disabled={!editStatus}*/ >确定</Button>
          {/* <Button disabled={!(doctorVerify.physicianAuthStatus === 1 || doctorVerify.physicianAuthStatus === '1')} loading={isES} type="primary" size="large" style={{ marginLeft: '30px' }} onClick={() => handleES(doctorVerify.code)} >同步至ES</Button> */}
        </Col>
        <Col span={24}>
          <FormItem
            {...formItemLayout}
            label="提现单号"
            hasFeedback
          >
            {getFieldDecorator('withdrawBillNo', {
              rules: [
                  { required: true, message: '请选择提现结果' },

              ],
              initialValue: withdrawBills.code,
            })(
              <Input disabled />
                )}
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem
            {...formItemLayout}
            label="提现结果"
            hasFeedback
          >
            {getFieldDecorator('status', {
              rules: [
                  { required: true, message: '请选择提现结果' },

              ],
              initialValue: `${withdrawBills.status}`,
            })(
              <Select placeholder="--请选择--">
                {
                    statusList.map((val) => {
                      return (
                        <Option key={val.code} value={`${val.code}`} >{val.name}</Option>
                      )
                    })
                  }
              </Select>
                )}
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('remark', {
              initialValue: withdrawBills.remark,
            })(
              <Input placeholder="填写备注信息。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} /* disabled={judgeStatus === 2}*/ />
                )}
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(WithdrawBillsModal)
