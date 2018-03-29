import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Modal, Select, InputNumber, Radio, TreeSelect } from 'antd'
import city from '../../utils/city'
import SingleImagePicker from '../SingleImagePicker/SingleImagePicker.js'
import { env } from '../../utils/config'

const { TextArea } = Input
const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group

const MembersModal = ({
  item = {},
  onOk,
  hospitalRank,
  hospitalCategories,
  hospitalLevels,
  hospitalRegion,
  hospitalSpecial,
  specialName,
  getHospitalSpecial,
  uploadToken,
  uploadIconSuccess,
  uploadImageSuccess,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const hospital = item
  let special = []
  hospital.hospitalDepartments === undefined ? '' : hospital.hospitalDepartments.map((val) => {
    special.push(val.code)
    return true
  })

  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      const deptIds = data.deptIds
      let dept = ''
      deptIds.map((val) => {
        dept = `${dept + val},`
        return dept
      })
      data.deptIds = dept
      onOk({
        code: hospital.code,
        ...data,
      })
    })
  }
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const imagePickerStyle = {
    position: 'relative',
    width: 100,
    height: 100,
    border: '1px solid #A7ADBD',
    margin: 'auto',
    marginTop: '5%',
    marginBottom: '5%',
    borderRadius: '10px',
    borderStyle: 'dashed',
  }
  const imageStyle = {
    margin: 0,
    padding: 0,
    height: 100,
    display: 'block',
    width: '100%',
    position: 'relative',
  }
  const fileStyle = {
    height: 100,
    width: 100,
    position: 'absolute',
    left: '0',
    top: '0',
    bottom: '0',
    right: '0',
    margin: 'auto',
  }
  const sip = {
    margin: 'auto',
    marginTop: '10%',
    marginBottom: '10%',
  }
  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={24}>
            <div style={{ marginLeft: 30 }}>医院Icon：</div>
            <SingleImagePicker imgSrc={hospital.hospitalIcon} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadIconSuccess} />
          </Col>
          <Col span={24}>
            <div style={{ marginLeft: 30 }}>医院图片：</div>
            <SingleImagePicker imgSrc={hospital.hospitalImg} keyPrefix={`pic/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadImageSuccess} />
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="医院名称">
              {getFieldDecorator('name', {
                rules: [{
                  required: true,

                  message: '必须填写医院名称',
                }],
                initialValue: hospital.name,
              })(
                <Input placeholder="请输入医院名称" required />
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="所在区域"
              hasFeedback
            >
              {getFieldDecorator('areaCode', {
                rules: [
                  { required: true, message: '不能为空' },
                ],
                initialValue: hospital.areaCode,
              })(
                <TreeSelect
                  style={{ width: 300 }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={city}
                  placeholder="请选择医院所在区域"
                />
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="医院级别"
              hasFeedback
            >
              {getFieldDecorator('levelCode', {
                rules: [
                  { required: true, message: '请选择医院级别' },

                ],
                initialValue: hospital.levelCode,
              })(
                <Select placeholder="--请选择--">
                  {
                    hospitalRank.data.map((val) => {
                      return (
                        <Option key={val.hospitalLevelName} value={val.hospitalLevelCode}>{val.hospitalLevelName}</Option>
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
              label="特色科室"
            >
              {getFieldDecorator('deptIds', {
                rules: [
                  { required: true, message: '请选择特色科室，可多选！', type: 'array' },

                ],
                initialValue: special,
              })(
                <Select
                  mode="multiple"
                  placeholder="请选择特色科室，可多选！"

                >
                  {hospitalSpecial.content.map((val) => {
                    return (
                      <Option key={val.code} value={val.code}>{val.name}&nbsp;</Option>
                    )
                  })}
                </Select>
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="医院分类"
            >
              {getFieldDecorator('typeCode', {
                rules: [
                  { required: true,
                    message: '请选择医院种类',
                  },

                ],
                initialValue: hospital.typeCode,
              })(
                <Select placeholder="--请选择--">
                  {hospitalCategories.data.map((val) => {
                    return (
                      <Option key={val.categoryCode} value={val.categoryCode}>{val.categoryName}</Option>
                    )
                  })}
                </Select>
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="联系电话">
              {getFieldDecorator('phone', {
                rules: [{

                   // pattern: /^[0-9]{11}$/,
                  message: '请填写正确的电话号码',
                }],
                initialValue: hospital.phone,
              })(
                <Input placeholder="请输入电话号码" />
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="医院简介">
              {getFieldDecorator('summary', {
                rules: [{

                  message: '请简单描述医院概况',
                }],
                initialValue: hospital.summary,
              })(
                <TextArea placeholder="请简单描述医院概况" rows={5} />
                )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="医院地址">
              {getFieldDecorator('address', {
                rules: [{
                  required: true,
                  message: '必须填写正确的地址',
                }],
                initialValue: hospital.address,
              })(
                <Input placeholder="请输入医院地址" />
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="医院坐标经度">
              {getFieldDecorator('lon', {
                rules: [{
                  required: true,
                  pattern: /^[-+]?(0?\d{1,2}(\.\d{1,8})?|1[0-7]?\d{1}(\.\d{1,8})?|180(\.0{1,8})?)$/,
                  message: ' 经度范围：-180.0～+180.0，最多八位小数',
                }],
                initialValue: hospital.lon,
              })(
                <Input placeholder=" 经度范围：-180.0～+180.0，最多八位小数" />
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="医院坐标纬度">
              {getFieldDecorator('lat', {
                rules: [{
                  required: true,
                  pattern: /^[-+]?([0-8]?\d{1}(\.\d{1,8})?|90(\.0{1,8})?)$/,
                  message: '纬度范围：-90.0～+90.0，最多八位小数',
                }],
                initialValue: hospital.lat,
              })(
                <Input placeholder="纬度范围：-90.0～+90.0，最多八位小数" />
                )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="医院评分">
              {getFieldDecorator('score', {
                rules: [{
                  pattern: /^[0-9]{1}$/,
                  required: true,
                  message: '最低分0分，最高分9分！',
                }],
                initialValue: hospital.score,
              })(
                <InputNumber min={0} max={9} />
                )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="专家人数"
            >
              {getFieldDecorator('experts', {
                rules: [{
                  required: true,
                  message: '最少零位专家！',
                }],
                initialValue: hospital.experts,
              })(
                <InputNumber min={0} required />
                )}
              <span className="ant-form-text"> 人数</span>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="是否医保"
            >
              {getFieldDecorator('isInsurance', {
                rules: [{
                  required: true,
                  message: '不能为空',
                }],
                initialValue: hospital.isInsurance,
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
              label="分类推荐"
            >
              {getFieldDecorator('isClassification', {
                rules: [{
                  required: true,
                  message: '不能为空',
                }],
                initialValue: hospital.isClassification,
              })(
                <RadioGroup>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
                )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

MembersModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  hospitalRank: PropTypes.object,
  hospitalRegion: PropTypes.object,
}

export default Form.create()(MembersModal)

