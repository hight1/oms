import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Input, Button, Radio, Select, Cascader,
} from 'antd'
import AgencyAreaComponent from './AgencyArea.js'
import city2 from '../../utils/newCity'
import { findKey } from '../../utils/helper.js'


const Option = Select.Option
const RadioGroup = Radio.Group
const FormItem = Form.Item


const AgencyModal = ({
  item = {},
  onOk,
  currentArea,
  addNewArea,
  deleteOldArea,
  areaName,
  onChange,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,

  },
}) => {
  const agency = item
  let areaName1 = (agency.townName === undefined || agency.townName === null ? [] : agency.townName.split(' '))
  let name1
  if (areaName1.length !== 0) {
    name1 = findKey(areaName1, city2)
  }
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      data.areaCode = data.areaCode[2]
      if (areaName === '') {
        data.areaName = agency.townName === undefined || agency.townName === null ? '' : (agency.townName.split(' ')[agency.townName.split(' ').length - 1])
      } else {
        data.areaName = areaName
      }

      onOk({
        ...data,
        code: agency.code,
      })
    })
  }
  function addArea (value) {
    addNewArea(value, agency.code)
  }
  function deleteArea (code, areaCode) {
    deleteOldArea(code, areaCode)
  }
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }

  return (
    <div>
      <Form>
        <fieldset style={{ border: 0 }}>
          <legend>基本信息</legend>
          <Row>
            <Col span={24} style={{ marginBottom: '30px' }}>
              <Link to="/agencies"><Button type="default" style={{ marginLeft: '30px' }}>返回</Button></Link>
              {/* <Popconfirm title={'确定删除这些项?'} placement="right" onConfirm={onDelete1}>
              <Button type="default" style={{ marginLeft: 8 }}>删除</Button>
            </Popconfirm> */}
              <Button type="primary" style={{ marginLeft: 8 }} onClick={handleOk}>保存</Button>
              {/* <Button type="default" style={{ marginLeft: 8 }} onClick={handleYes}>参照页</Button> */}
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} hasFeedback label="用户名">
                {getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    type: 'string',
                    message: '不能为空',
                  }],
                  initialValue: agency.username,
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} hasFeedback label="密码">
                {getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    type: 'string',
                    message: '不能为空',
                  }],
                  initialValue: agency.password,
                })(
                  <Input type="password" />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} hasFeedback label="姓名">
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    type: 'string',
                    message: '不能为空',
                  }],
                  initialValue: agency.name,
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} hasFeedback label="显示名称">
                {getFieldDecorator('displayName', {
                  rules: [{
                    required: true,
                    type: 'string',
                    message: '不能为空',
                  }],
                  initialValue: agency.displayName,
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} hasFeedback label="手机号">
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: true,
                    type: 'string',
                    // pattern: /^[0-9]{11}$/,
                    message: '不能为空',
                  }],
                  initialValue: agency.mobile,
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} hasFeedback label="邮箱">
                {getFieldDecorator('email', {
                  rules: [{
                    required: true,
                    type: 'string',
                    message: '不能为空',
                  }],
                  initialValue: agency.email,
                })(
                  <Input placeholder="xyz@xx.com" />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} hasFeedback label="级别">
                {getFieldDecorator('rank', {
                  rules: [{
                    required: true,
                    type: 'number',
                    message: '不能为空',
                  }],
                  initialValue: agency.rank,
                })(
                  <Select placeholder="--请选择--">
                    <Option key={1} value={1}>个人</Option>
                    <Option key={2} value={2}>县代</Option>
                    <Option key={3} value={3}>市代</Option>
                    <Option key={4} value={4}>省代</Option>
                    <Option key={5} value={5}>官方</Option>

                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="是否可用"
              >
                {getFieldDecorator('isEnable', {
                  rules: [{
                    required: true,
                    message: '不能为空',
                  }],
                  initialValue: agency.isEnable,
                })(
                  <RadioGroup>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="所在区域"
              >
                {getFieldDecorator('areaCode', {
                  rules: [
                  { required: true, message: '不能为空' },
                  ],
                  initialValue: name1,
                })(
                  <Cascader allowClear onChange={onChange} options={city2} />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="创建时间">
                <div><span>{agency.createTime}</span></div>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="创建人">
                <div><span>{agency.createBy}</span></div>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="更新时间">
                <div><span>{agency.updateTime}</span></div>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="更新人">
                <div><span>{agency.updateBy}</span></div>
              </FormItem>
            </Col>
          </Row>
        </fieldset>
        <fieldset style={{ border: 0 }}>
          <legend>代理商所辖区县</legend>
          {/* {
            window.location.hash.split('/')[3].split('?')[0] === 'new' ? '' :
            <AgencyAreaComponent data={currentArea} />
          } */}
          <AgencyAreaComponent deleteArea={deleteArea} addArea={addArea} data={currentArea} />

        </fieldset>

      </Form>
    </div>
  )
}

AgencyModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  // visible: PropTypes.bool,
  // onCancel: PropTypes.func,
}

export default Form.create()(AgencyModal)
