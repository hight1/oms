import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Button, Select } from 'antd'

import { doctorRank, officeName, isVerify } from '../../utils/helper.js'

const Option = Select.Option

const FormItem = Form.Item


const DoctorSearch = ({
  keyword,
  onSimpleSearchMode,
  onSearch,
  onReset,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
  },

}) => {
  function handleSubmit (e) {
    e.preventDefault()
    validateFields((errors) => {
      if (errors) {
        return
      }
      onSearch(getFieldsValue())
    })
  }

  function handleReset () {
    resetFields()
    onReset()
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  }

  const children = [
    <Row key={1} type="flex" justify="space-between">
      <Col span={8}>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            initialValue: keyword || '',
          })(
            <Input placeholder="请输入姓名" maxLength={20} />
            )}
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem {...formItemLayout} label="手机号">
          {getFieldDecorator('mobile', {
            initialValue: keyword || '',
          })(
            <Input placeholder="请输入手机号" maxLength={15} />
            )}
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem {...formItemLayout} label="医院名称">
          {getFieldDecorator('hosiptalName', {
            initialValue: keyword || '',
          })(
            <Input placeholder="请输入医院名称" maxLength={50} />
            )}
        </FormItem>
      </Col>
    </Row>,
    <Row key={2} type="flex" justify="space-between">
      <Col span={8}>
        <FormItem
          {...formItemLayout}
          label="医生职称"
          hasFeedback
        >
          {getFieldDecorator('医生职称', {
            rules: [
              { required: true, message: '--请选择--' },
            ],
          })(
            <Select placeholder="--请选择--">
              {
                    doctorRank.map((val) => {
                      return (
                        <Option key={val.code} value={val.name}>{val.name}</Option>
                      )
                    })
                  }
            </Select>
            )}
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem
          {...formItemLayout}
          label="所属科室"
          hasFeedback
        >
          {getFieldDecorator('所属科室', {
            rules: [
              { required: true, message: '--请选择--' },
            ],
          })(
            <Select placeholder="--请选择--">
              {
                    officeName.map((val) => {
                      return (
                        <Option key={val.code} value={val.name}>{val.name}</Option>
                      )
                    })
                  }
            </Select>
            )}
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem
          {...formItemLayout}
          label="资格认证"
          hasFeedback
        >
          {getFieldDecorator('资格认证', {
            rules: [
              { required: true, message: '--请选择--' },
            ],
          })(
            <Select placeholder="--请选择--">
              {
                    isVerify.map((val) => {
                      return (
                        <Option key={val.code} value={val.name}>{val.name}</Option>
                      )
                    })
                  }
            </Select>
            )}
        </FormItem>
      </Col>
    </Row>,
  ]

  const showCount = 2

  return (
    <Form
      layout="horizontal"
      className="ant-advanced-search-form"
      onSubmit={handleSubmit}
    >
      {children.slice(0, showCount)}
      <Row type="flex" justify="end">
        <Col span={24} style={{ textAlign: 'right' }} >
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>搜索</Button>
          <Button style={{ marginRight: 8 }} onClick={handleReset}>
            清空
          </Button>
          <a onClick={onSimpleSearchMode}>简易搜索</a>
        </Col>
      </Row>
    </Form>
  )
}

DoctorSearch.propTypes = {
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
}

export default Form.create()(DoctorSearch)
