import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Card, Button, Input, Select,
} from 'antd'

import { doctorBlockStyle } from '../../themes/index.less'

const Option = Select.Option
const FormItem = Form.Item


const TagTemplatesModal = ({
  item = {},
  onOk,
  tabList,
  form: {
    validateFields,
    getFieldDecorator,
    getFieldsValue,
  },

}) => {
  const tag = item
  // let special = doctor.personal === undefined ? '' : (doctor.personal.specials === '' ? '' : doctor.personal.specials.slice(1, -1).split(','))
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      onOk({
        code: tag.code || '',
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
        <Col span={24} >
          <Link to="/tag-templates"><Button type="default" size="large" style={{ marginBottom: '30px' }}>返回</Button></Link>
          <Button type="primary" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={handleOk}>确定</Button>
          {/* <Button type="primary" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={() => handleES(doctor.code)}>同步到ES</Button> */}
          <Card bordered style={{ width: '50%', margin: '0 auto', color: '#000' }} noHovering>
            <div className={doctorBlockStyle} >
              <fieldset style={{ border: 0 }}>
                <legend>详细信息</legend>
                <FormItem
                  {...formItemLayout}
                  label="类型"
                >
                  {getFieldDecorator('type', {
                    rules: [{
                      required: true,

                      message: '必须填写',
                    }],
                    initialValue: tag.type === undefined ? '' : `${tag.type}`,
                  })(
                    <Select placeholder="--请选择--">
                      {
                        tabList.map((val) => {
                          return (
                            <Option value={`${val.id}`} key={`${val.id}`}>{val.content}</Option>

                          )
                        })
                      }
                    </Select>
                )}
                </FormItem>
                <FormItem {...formItemLayout} hasFeedback label="标题">
                  {getFieldDecorator('title', {
                    rules: [{
                      required: true,

                      message: '必须填写',
                    }],
                    initialValue: tag.title,
                  })(
                    <Input placeholder="请输入标题" required />
                )}
                </FormItem>
                <FormItem {...formItemLayout} hasFeedback label="内容">
                  {getFieldDecorator('content', {
                    rules: [{
                      required: true,

                      message: '必须填写',
                    }],
                    initialValue: tag.content,
                  })(
                    <Input placeholder="请输入内容" required />
                )}
                </FormItem>
              </fieldset>
            </div>
          </Card>
        </Col>
      </Row>
    </Form>
  )
}

TagTemplatesModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(TagTemplatesModal)
