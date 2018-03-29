import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Modal, Select, Card, Input } from 'antd'
import { labelStyle, blockStyle } from '../../themes/index.less'
import { format, getWithdrawBillStatus } from '../../utils/helper.js'


const Option = Select.Option
const FormItem = Form.Item


const WithdrawBillsModal = ({
  item = {},
  onOk,
  judgeStatus,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
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

        withdrawBillNo: withdrawBills.code,
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
    <Modal {...modalOpts} >
      <Form>
        <Row>
          <Col span={24} >
            <Card bordered={false} style={{ width: 350, marginLeft: 10, color: '#000' }} noHovering>
              <div className={blockStyle}><div className={labelStyle}>提现单号：</div><span>{withdrawBills.code}</span></div>
              <div className={blockStyle}><div className={labelStyle}>提现人：</div><span>{withdrawBills.name}</span></div>
              <div className={blockStyle}><div className={labelStyle}>手机号：</div><span>{withdrawBills.mobile}</span></div>
              <div className={blockStyle}><div className={labelStyle}>提现金额：</div><span>{withdrawBills.amount}</span></div>
              <div className={blockStyle}><div className={labelStyle}>提现状态：</div><span>{ getWithdrawBillStatus(withdrawBills.status) }</span></div>
              <div className={blockStyle}><div className={labelStyle}>申请时间：</div><span >{ format(withdrawBills.createTime) }</span></div>
              <div className={blockStyle}><div className={labelStyle}>提现方式：</div><span >{withdrawBills.paymentName}</span></div>
              <div className={blockStyle}><div className={labelStyle}>提现账号：</div><span>{withdrawBills.account}</span></div>
            </Card>
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
    </Modal>
  )
}

WithdrawBillsModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(WithdrawBillsModal)
