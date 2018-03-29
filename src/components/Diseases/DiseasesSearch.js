import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Button, Select } from 'antd'

const Option = Select.Option

const FormItem = Form.Item

const DiseasesSearch = ({
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
  hospitalSpecial,
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
      <Col span={12}>
        <FormItem {...formItemLayout} label="疾病名称">
          {getFieldDecorator('name', {
            initialValue: keyword || '',
          })(
            <Input placeholder="请输入疾病名称" maxLength={20} />
            )}
        </FormItem>
      </Col>

      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="所属科室"
          hasFeedback
        >
          {getFieldDecorator('deptName', {
            rules: [
              { message: '--请选择--' },
            ],
          })(
            <Select placeholder="--请选择--">
              {hospitalSpecial.content.map((val) => {
                return (
                  <Option key={val.code} value={val.name}>{val.name}&nbsp;</Option>
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

DiseasesSearch.propTypes = {
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
}

export default Form.create()(DiseasesSearch)
