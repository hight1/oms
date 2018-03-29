import React from 'react'
import {
  Form, Row, Col, Button, Table,
} from 'antd'
import { Link } from 'dva/router'
import { getType, getPatStatus } from '../../utils/helper'


const FormItem = Form.Item

const PatientModal = ({
  item = {},
  // onOk,
  // form: {
    // getFieldDecorator,
    // validateFields,
    // getFieldsValue,
  // },
}) => {
  const patient = item

  // function handleOk () {
  //   validateFields((errors) => {
  //     if (errors) {
  //       return
  //     }
  //     const data = { ...getFieldsValue() }
  //     onOk(data)
  //   })
  // }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }


  return (
    <Form>
      <Row>
        <Col span={24}>
          <Link to="/patients"><Button type="default" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }}>返回</Button></Link>
        </Col>
      </Row>
      <fieldset style={{ border: 0 }}>
        <legend>基本信息</legend>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="头像">
              <img alt="无图" style={{ width: '100px', marginLeft: '2rem' }} src={patient.image} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="手机号">
              <div><span>{patient.mobile}</span></div>
            </FormItem>
          </Col>
        </Row>
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>实名信息</legend>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="姓名">
              <div><span>{!patient.realname ? '' : patient.realname.name}</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="性别">
              <div><span>{!patient.realname ? '' : (patient.realname.sex === 1 ? '女' : '男')}</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="生日">
              <div><span>{!patient.realname ? '' : patient.realname.birthday}</span></div>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="身份证号">
              <div><span>{!patient.realname ? '' : patient.realname.idCard}</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="银行卡号">
              <div><span>{!patient.realname ? '' : patient.realname.bankCard}</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="预留手机号">
              <div><span>{!patient.realname ? '' : patient.realname.phone}</span></div>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="认证种类">
              <div><span>{!patient.realname ? '' : getType(patient.realname.type)}</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="认证状态">
              <div><span>{!patient.realname ? '' : getPatStatus(`${patient.realname.status}`) }</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="最新修改时间">
              <div><span>{!patient.realname ? '' : patient.realname.updateTime}</span></div>
            </FormItem>
          </Col>
        </Row>
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>就诊人列表</legend>
        <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
          <Col span={24}>
            <Table
              columns={[
                { title: '就诊人标识',
                  dataIndex: 'patientCode',
                  key: 'patientCode' },
                { title: '群组',
                  dataIndex: 'group',
                  key: 'group',
                  render: (text, record) => {
                    return (
                    record.group === 1 ? '好友' : '家庭成员'
                    )
                  },
                },
                { title: '渠道来源',
                  dataIndex: 'channel',
                  key: 'channel',
                  render: (text, record) => {
                    if (record.channel === 1) {
                      return '扫一扫添加'
                    } else if (record.channel === 2) {
                      return '添加好友'
                    } else if (record.channel === 3) {
                      return '添加家庭成员'
                    } else {
                      return '未知来源'
                    }
                  },
                },
                { title: '是否默认',
                  dataIndex: 'isDefault',
                  key: 'isDefault',
                  render: (text, record) => {
                    return (
                    record.isDefault ? '是' : '否'
                    )
                  },
                },
                { title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (text, record) => {
                    return (
                    record.status === 0 ? '无效' : '有效'
                    )
                  },
                },
              ]}
              dataSource={!patient.patients ? [] : patient.patients}
              pagination={false}
              rowKey={record => record.patientCode}
            />
          </Col>
        </Row>
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>订单队列</legend>
        <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
          <Col span={24}>
            <Table
              columns={[
                { title: '订单号',
                  dataIndex: 'orderNo',
                  key: 'orderNo' },
                { title: '排队位置',
                  dataIndex: 'position',
                  key: 'position',
                },
                { title: '队列长度',
                  dataIndex: 'waittingCount',
                  key: 'waittingCount' },
                { title: '时间',
                  dataIndex: 'inTime',
                  key: 'inTime' },
              ]}
              dataSource={!patient.orderQueue ? [] :
                patient.orderQueue}
              pagination={false}
              rowKey={record => record.orderNo}
            />
          </Col>
        </Row>
      </fieldset>
      {/*
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
              <Input disabled={!!user.name} required />
              )}
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem {...formItemLayout} hasFeedback label="昵称">
            {getFieldDecorator('nickName', {
              rules: [{
                required: true,
                type: 'string',
                message: '不能为空',
              }],
              initialValue: user.nickName,
            })(
              <Input placeholder="请输入昵称" required />
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
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('remark', {
              initialValue: user.remark,
            })(
              <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
              )}
          </FormItem>
        </Col>
      </Row> */}
    </Form>
  )
}


export default Form.create()(PatientModal)
