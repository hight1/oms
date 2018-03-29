import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Input, Tag,
  Modal, Select, message, Button, Checkbox,
} from 'antd'
// import ThumbPic from '../ThumbPic/ThumbPic'
import RotateImage from '../DoctorVerify/RotateImage'
import { formatMsg } from '../../utils/helper'


const Option = Select.Option
const FormItem = Form.Item

const statusList = [
  {
    name: '审核失败',
    code: 3,
  },
  {
    name: '审核通过',
    code: 2,
  },
]
// const pricesList = [
//   {
//     price: 99,
//     label: '主治医生 99元/分钟',
//   },
//   {
//     price: 169,
//     label: '副主任医师 169元/分钟',
//   },
//   {
//     price: 199,
//     label: '主任医师 199元/分钟',
//   },
//   {
//     price: 299,
//     label: '特需专家 299元/分钟',
//   },

// ]
const DoctorTitleVerifyModal = ({
  item = {},
  onOk,
  handleChange,
  // judgeStatus,
  // vcPriceDisable,
  // editVcPrice,
  // vcPriceList,
  failureTag,
  tagList,
  // handleTagsChange,
  handleES,
  isOK,
  isES,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
    setFieldsValue,
  },
}) => {
  const doctorTitle = item

  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      if (data.isSendSms) {
        if (data.authRemark === '') {
          message.error('选择发送短信时，审核备注不能为空')
          return false
        }
      }
      let { titleAuthStatus } = data
      if (titleAuthStatus === 2 || titleAuthStatus === '2' || titleAuthStatus === '认证成功') {
        titleAuthStatus = true
        Modal.info({
          content: '您选择审核成功，此状态不可逆',
        })
      } else {
        if (data.authRemark === '' || data.authRemark === undefined || data.authRemark === null) {
          message.error('审核备注不能为空')
          return false
        }
        titleAuthStatus = false
      }
      onOk({
        code: doctorTitle.code,
        enable: titleAuthStatus,
        authRemark: data.authRemark,
        // vcPrice: data.vcPrice.key,
        isSendSms: data.isSendSms === undefined ? false : data.isSendSms,
       // isExpert: data.isExpert,
      })
    })
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }
  function handleTagsChange (tag, b) {
    if (b === null || b === undefined) { b = '' }
    let mess = formatMsg(tag.content, [`${doctorTitle.name}`, `${doctorTitle.mobile}`, '010-64010-566'])
    tag.content = mess !== false ? mess : tag.content
    setFieldsValue({ authRemark: `${b}${tag.content}  ` })
  }
  function changeAuth () {
    setFieldsValue({ authRemark: doctorTitle.authRemark })
  }
  return (
    <Form>
      <Row>
        <Col span={24}>
          <div style={{ marginBottom: '2rem' }}>
            <Link to="/title-auths"><Button type="default" size="large" style={{ marginLeft: '30px' }}>返回</Button></Link>
            <Button loading={isOK} type="primary" size="large" style={{ marginLeft: '30px' }} onClick={handleOk}>确定</Button>
            <Button loading={isES} type="primary" size="large" style={{ marginLeft: '30px' }} onClick={() => handleES(doctorTitle.code)}>同步至ES</Button>
          </div>


        </Col>
        <Col span={24} >
          <fieldset style={{ border: 0 }}>
            <legend>医师信息</legend>
            <FormItem {...formItemLayout} label="头像     ">
              <RotateImage src={doctorTitle.image === null ? '' : doctorTitle.image} />
              {/* <div><img style={{ width: 100, height: 100 }} src={doctorTitle.image === null ? '' : doctorTitle.image} alt="正在加载数据..." /></div> */}
            </FormItem>
            <FormItem {...formItemLayout} label="姓名">
              <div><span>{doctorTitle.name}</span></div>
            </FormItem>
            <FormItem {...formItemLayout} label="医院">
              <div><span>{doctorTitle.hospitalName}</span></div>
            </FormItem>
            <FormItem {...formItemLayout} label="科室">
              <div><span>{doctorTitle.deptName}</span></div>
            </FormItem>
            <FormItem {...formItemLayout} label="一级科室">
              <div><span>{doctorTitle.parentDeptName}</span></div>
            </FormItem>
          </fieldset>


          {/* <div style={{ marginBottom: 20, marginLeft: '16.6rem' }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>姓名：</div><span>{doctorTitle.name}</span></div>
          <div style={{ marginBottom: 20, marginLeft: '16.6rem' }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>手机号：</div><span>{doctorTitle.mobile}</span></div>
          <div style={{ marginBottom: 20, marginLeft: '16.6rem' }}><div style={{ textAlign: 'right', width: 90, display: 'inline-block', marginLeft: -30 }}>职称认证状态：</div><span>{ getStatus(doctorTitle.titleAuthStatus) }</span></div>
          <div style={{ marginBottom: 20, marginLeft: '16.6rem' }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>提交时间：</div><span>{format(doctorTitle.submitTime)}</span></div> */}

        </Col>
        <fieldset style={{ border: 0 }}>
          <legend>审核信息</legend>
          <FormItem {...formItemLayout} label="职称名称">
            <div><span>{doctorTitle.titleName}</span></div>
          </FormItem>
          <FormItem {...formItemLayout} label="职称证明">
            <div>
              <a href="http://zgcx.nhfpc.gov.cn/doctorsearch.aspx" target="blank">验证网站</a>
              {
                doctorTitle.titleImageList === undefined || doctorTitle.titleImageList === null ? '' :
                doctorTitle.titleImageList.map((val, index) => {
                  // return <ThumbPic item={val} key={index} />

                  return (
                    // <div key={index}><img alt="无图" src={val} key={index} style={{ width: '50%' }} /></div>
                    <RotateImage key={index} src={val} />

                  )
                })

              }</div>
          </FormItem>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="短信通知"
            >
              {getFieldDecorator('isSendSms', {
                valuePropName: 'checked',
                initialValue: doctorTitle.isSendSms || false,
              })(
                <Checkbox>是否发送短信通知（选此项必填备注）</Checkbox>
          )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="审核状态"
            >
              {getFieldDecorator('titleAuthStatus', {
                rules: [
                  { required: true, message: '请填写认证结果' },

                ],
                initialValue: doctorTitle.titleAuthStatus === 2 || doctorTitle.titleAuthStatus === '2' ? '2' : '3',
              })(
                <Select placeholder="--请选择--" onChange={handleChange} disabled={doctorTitle.titleAuthStatus === 2 || doctorTitle.titleAuthStatus === '2'}>
                  {
                    statusList.map((val) => {
                      return (
                        <Option key={val.code} value={`${val.code}`}>{val.name}</Option>
                      )
                    })
                  }
                </Select>
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="审核意见">
              {tagList === null ? '' : tagList.map(tag => (
                <Tag color="blue" key={tag.title} onClick={() => handleTagsChange(tag, getFieldValue('authRemark'))}>{tag.title}</Tag>
                 ))}
              {getFieldDecorator('authRemark', {
                onChange: changeAuth,
                initialValue: failureTag,
              })(
                <Input placeholder="请详细填写失败原因。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }}  /* disabled={judgeStatus === 2}*/ />
                )}
            </FormItem>
          </Col>
        </fieldset>


        {/* <Col span={24}>
          <FormItem
            {...formItemLayout}
            label="是否测试"
          >
            {getFieldDecorator('isExpert', {
              initialValue: doctorTitle.isExpert,
            })(
              <RadioGroup>
                <Radio value={0}>是</Radio>
                <Radio value={1}>否</Radio>
              </RadioGroup>
                )}
          </FormItem>
        </Col> */}
        {/* <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频咨询单价"
            >
              {getFieldDecorator('vcPrice', {
                rules: [
                  { required: true, message: '请选择单价' },

                ],
                initialValue: doctorTitle.vcPrice ? { key: `${doctorTitle.vcPrice}` } : { key: '59' },
              })(
                <Select placeholder="--请选择--" mode="combobox"
                  labelInValue
                  filterOption={false}
                  optionLabelProp="children"
                  style={{ width: 206 }}
                  disabled={vcPriceDisable}
                >
                  {
                    pricesList.map((val) => { // vcPriceList
                      return (
                        <Option key={`${val.price}`} value={`${val.price}`}>{val.label}</Option>
                      )
                    })
                  }
                </Select>
                )}
              <Button onClick={editVcPrice} style={{ marginLeft: 24 }} size={'default'}>编辑</Button>

            </FormItem>
          </Col> */}


      </Row>
    </Form>
  )
}

DoctorTitleVerifyModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(DoctorTitleVerifyModal)
