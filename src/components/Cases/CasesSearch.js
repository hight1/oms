import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Button, Select } from 'antd'


const Option = Select.Option

const FormItem = Form.Item

const CasesSearch = ({
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
  rank,
  sort,
  hospitalRank,
  hospitalCategories,

}) => {
  const mockData = []
  sort.map((val) => {
    return (
      mockData.push(<Option key={val.id}>{val.sort}</Option>)
    )
  })
  const mockData2 = []
  rank.map((val) => {
    return (
      mockData2.push(<Option key={val.id}>{val.rank}</Option>)
    )
  })
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
        <FormItem {...formItemLayout} label="邮箱">
          {getFieldDecorator('email', {
            initialValue: keyword || '',
          })(
            <Input placeholder="请输入邮箱" maxLength={50} />
            )}
        </FormItem>
      </Col>
    </Row>,
    <Row key={2} type="flex" justify="space-between">
      <Col span={8}>
        <FormItem
          {...formItemLayout}
          label="医院级别"
          hasFeedback
        >
          {getFieldDecorator('levelName', {
            rules: [
              { message: '--请选择--', type: 'number' },
            ],
          })(
            <Select placeholder="--请选择--">
              {hospitalRank.data.map((val) => {
                return (
                  <Option key={val.hospitalLevelCode} value={val.hospitalLevelCode}>{val.hospitalLevelName}</Option>
                )
              })}
            </Select>
            )}
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem
          {...formItemLayout}
          label="审核状态"
          hasFeedback
        >
          {getFieldDecorator('verify', {
            rules: [
              { message: '--请选择--' },
            ],
          })(
            <Select placeholder="--请选择--">
              <Option value="2" >通过</Option>
              <Option value="3">未通过</Option>
            </Select>
            )}
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem
          {...formItemLayout}
          label="医院种类"
          hasFeedback
        >
          {getFieldDecorator('typeCode', {
            rules: [
              { message: '--请选择--' },
            ],
          })(
            <Select placeholder="--请选择--">
              {hospitalCategories.data.map((val) => {
                return (
                  <Option key={val.categoryCode} value={val.categoryName}>{val.categoryName}</Option>
                )
              })}
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

CasesSearch.propTypes = {
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
}

export default Form.create()(CasesSearch)
