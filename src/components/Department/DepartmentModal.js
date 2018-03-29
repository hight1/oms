import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Input,
  Select, Button, Popconfirm, Radio,
} from 'antd'
import HospitalLookupModal from '../Hospital/HospitalLookupModal.js'

const RadioGroup = Radio.Group
const Option = Select.Option

const { TextArea } = Input
const FormItem = Form.Item


const DepartmentModal = ({
  item = {},
  onOk,
  form,
  hospitalName,
  hospitalDept,
  onDelete,
  showCateModal,
  handleDeptCancel,
  deptPageVisible,
  rowSelection,
  currentItem,
  type,
  handleStandard,
  hospitalVisi,
  onHosiSearch,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...hospitalCateLookupModalProps
}) => {
  const department = item
  let code = department.code
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      if (data.parentCode === undefined || data.parentCode === '无父科室') { data.parentCode = '' }
      type === 'create' ? (
        data.isStandard === 1 ?
        onOk({
          ...data,
          code,
        })
        :
        onOk({
          ...data,
          code,
          hospitalCode: currentItem.hospitalCode,
        })
      ) : (
        onOk({
          ...data,
          code,
        })
      )
    })
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }
  function onDelete1 () {
    onDelete(code)
  }

  return (

    <div>

      <Form>
        <Row>
          <Col span={24} style={{ marginBottom: '30px' }}>
            <Link to="/departments"><Button type="default" style={{ marginLeft: '30px' }}>返回</Button></Link>
            <Popconfirm title={'确定删除这些项?'} placement="right" onConfirm={onDelete1}>
              <Button type="primary" style={{ marginLeft: 8 }}>删除</Button>
            </Popconfirm>
            <Button type="primary" style={{ marginLeft: 8 }} onClick={handleOk}>保存</Button>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="科室名称">
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  type: 'string',
                  message: '不能为空',
                }],
                initialValue: department.name,
              })(
                <Input required />
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="一级科室"
              hasFeedback
            >
              {getFieldDecorator('parentCode', {
                rules: [{
                  required: true,
                  message: '不能为空',
                }],
                initialValue: department.parentCode === null || department.parentCode === undefined || department.parentCode === 0 || department.parentCode === '0' ? '264' : `${department.parentCode}`,
              })(
                <Select placeholder="--请选择--">
                  {
                   hospitalDept.map((val) => {
                     return (
                       <Option key={val.code} value={val.code}>{val.name}</Option>
                     )
                   })
                  }
                </Select>
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="是否标准科室"
            >
              {getFieldDecorator('isStandard', {
                rules: [{
                  required: true,
                  message: '不能为空',
                }],
                initialValue: department.isStandard,
              })(
                <RadioGroup onChange={handleStandard}>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="是否热门科室"
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
          {
             type === 'create' ?
               <Col span={24}>
                 <FormItem
                   {...formItemLayout}
                   label="医院名称"
                   help="选择非标准科室时，必填医院名称"
                 >
                   <div>
                     {getFieldDecorator('hospitalName', {
                       rules: [],
                       initialValue: department.hospitalName || currentItem.hospitalName,
                     })(
                       <Input disabled={hospitalVisi} />
                       )}
                     <Button disabled={hospitalVisi} type="primary" icon="search" onClick={showCateModal} style={{ marginRight: '20px', marginTop: '10px' }} />
                     <div>
                       <div>
                         <HospitalLookupModal
                           onCancel={handleDeptCancel}
                           visible={deptPageVisible}
                           onHosiSearch={onHosiSearch}
                           width="1000px"
                           rowSelection={rowSelection}
                           {...hospitalCateLookupModalProps}
                         />
                       </div>
                     </div>
                   </div>
                 </FormItem>
               </Col>

             : ''
            }
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="排序">
              {getFieldDecorator('sort', {
                rules: [{

                  pattern: /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])$/,
                  message: '请输入0-255的整数',
                }],
                initialValue: department.sort,
              })(
                <Input required placeholder="请输入0-255的整数" min={0} max={255} />
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="备注">
              {getFieldDecorator('description', {
                initialValue: department.description,
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

DepartmentModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(DepartmentModal)
