import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Button, Input, Checkbox, Radio, Select,
} from 'antd'

import { doctorBlockStyle } from '../../themes/index.less'


const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

const HelpModal = ({
  item = {},
  onOk,
  chooseApp,
  cateList,
  modalType,
  changeType,
  form: {
    validateFields,
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const help = item
  console.log(modalType)
  // let special = doctor.personal === undefined ? '' : (doctor.personal.specials === '' ? '' : doctor.personal.specials.slice(1, -1).split(','))
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      onOk({
        id: help.id || '',
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
          <Link to="/help"><Button type="default" size="large" style={{ marginBottom: '30px' }} onClick={changeType}>返回</Button></Link>
          <Button type="primary" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={handleOk}>确定</Button>
          {/* <Button type="primary" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={() => handleES(doctor.code)}>同步到ES</Button> */}
          <div className={doctorBlockStyle} >
            <fieldset style={{ border: 0 }}>
              <legend>详细信息</legend>
              <FormItem {...formItemLayout} hasFeedback label="标题">
                {getFieldDecorator('title', {
                  rules: [{
                    required: true,
                    message: '必须填写',
                  }],
                  initialValue: help.title,
                })(
                  <Input placeholder="请输入内容" required />
                )}
              </FormItem>
              <FormItem {...formItemLayout} hasFeedback label="静态文件路径">
                {getFieldDecorator('staticHtmlPath', {
                  rules: [{
                    required: true,

                    message: '必须填写',
                  }],
                  initialValue: help.staticHtmlPath,
                })(
                  <Input placeholder="请输入内容" required />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="客户端">
                {getFieldDecorator('app', {
                  initialValue: help.app || 1,
                })(
                  <RadioGroup onChange={chooseApp} disabled={modalType !== 'create'}>
                    <Radio value={1}>医生端</Radio>
                    <Radio value={2}>患者端</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="帮助文档分类"
              >
                {getFieldDecorator('categoryCode', {
                  initialValue: help.categoryCode,
                })(
                  <Select placeholder="--请选择--" disabled={modalType !== 'create'}>
                    {
                    cateList === undefined ? '' : cateList.map((val) => {
                      return (
                        <Option key={val.code} value={val.code}>{val.title}</Option>
                      )
                    })
                  }
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="置顶至分类">
                {getFieldDecorator('isCategoryTop', {
                  rules: [{
                    required: true,
                    message: '必须选择',
                  }],
                  valuePropName: 'checked',
                  initialValue: help.isCategoryTop,

                })(
                  <Checkbox />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="置顶至首页">
                {getFieldDecorator('isTop', {
                  rules: [{
                    required: true,
                    message: '必须选择',
                  }],
                  valuePropName: 'checked',
                  initialValue: help.isTop,

                })(
                  <Checkbox />
                 )}
              </FormItem>

            </fieldset>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

HelpModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(HelpModal)
