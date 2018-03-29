import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Input, Button, Radio,
} from 'antd'

const RadioGroup = Radio.Group
const { TextArea } = Input
const FormItem = Form.Item


const HospitalCateModal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  const department = item
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      // if (data.parentCode === undefined || data.parentCode === '无父科室') { data.parentCode = '' }
      onOk({
        ...data,
        code: data.categoryCode,
      })
    })
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }

  return (

    <div>

      <Form>
        <Row>
          <Col span={24} style={{ marginBottom: '30px' }}>
            <Link to="/hospital-cates"><Button type="default" style={{ marginLeft: '30px' }}>返回</Button></Link>
            {/* <Popconfirm title={'确定删除这些项?'} placement="right" onConfirm={onDelete1}>
              <Button type="default" style={{ marginLeft: 8 }}>删除</Button>
            </Popconfirm> */}
            <Button type="primary" style={{ marginLeft: 8 }} onClick={handleOk}>保存</Button>
            {/* <Button type="default" style={{ marginLeft: 8 }} onClick={handleYes}>参照页</Button> */}
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="医院分类编码">
              {getFieldDecorator('categoryCode', {
                /* rules: [{
                  required: true,
                  type: 'string',
                  message: '不能为空',
                }], */
                initialValue: department.categoryCode,
              })(
                <Input disabled />
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="医院分类名称">
              {getFieldDecorator('categoryName', {
                rules: [{
                  required: true,
                  type: 'string',
                  message: '不能为空',
                }],
                initialValue: department.categoryName,
                // setFieldsValue: lookUpValues.map((val) => { return val }),
              })(
                <Input required />
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="是否热门分类"
            >
              {getFieldDecorator('isHot', {
                rules: [{
                  required: true,
                  message: '不能为空',
                }],
                initialValue: department.isHot,
              })(
                <RadioGroup>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
                )}
            </FormItem>
          </Col>
          {/* <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="所属医院"
              hasFeedback
            >
              {getFieldDecorator('hospitalName', {
                initialValue: department.hospitalName,
              })(
                <Select placeholder="--请选择--">
                  {
                   hospitalName.map((val) => {
                     return (
                       <Option key={val.code} value={val.code}>{val.name}</Option>
                     )
                   })
                  }
                </Select>
                )}
            </FormItem>
          </Col> */}
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="排序">
              {getFieldDecorator('sort', {
                rules: [{

                  pattern: /^((\d)|([1-9]{1}\d{1})|(1[01][0-9]|12[0-7]))$/,
                  message: '请输入0-127的整数',
                }],
                initialValue: department.sort,
              })(
                <Input required placeholder="请输入0-127的整数" />
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="备注">
              {getFieldDecorator('remark', {
                initialValue: department.remark,
              })(
                <TextArea rows={4} />
                )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

HospitalCateModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  // visible: PropTypes.bool,
  // onCancel: PropTypes.func,
}

export default Form.create()(HospitalCateModal)
