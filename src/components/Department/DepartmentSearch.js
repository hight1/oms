import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Button } from 'antd'

const FormItem = Form.Item

const HosiptalSearch = ({
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
      <Col span={24}>
        <FormItem {...formItemLayout} label="科室名称">
          {getFieldDecorator('name', {
            initialValue: keyword || '',
          })(
            <Input placeholder="请输入科室名称" maxLength={20} />
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

HosiptalSearch.propTypes = {
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
}

export default Form.create()(HosiptalSearch)
