import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Input, Tag,
 Select, message, Button, Checkbox,
} from 'antd'
// import ThumbPic from '../ThumbPic/ThumbPic'
import { formatMsg } from '../../utils/helper'
import SingleImagePicker from '../SingleImagePicker/SingleImagePicker.js'
import { env } from '../../utils/config'

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
  {
    name: '审核中',
    code: 1,
  },
  {
    name: '未完善',
    code: 0,
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
const DoctorProfileVerifyModal = ({
  item = {},
  onOk,
  // judgeStatus,
  // vcPriceDisable,
  // editVcPrice,
  // vcPriceList,
  failureTag,
  tagList,
  // handleTagsChange,
  handleES,
  uploadToken,
  uploadIconSuccess,
  updateImage,
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
  const doctorProfile = item

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
      if (doctorProfile.image === null) {
        message.error('图片不能为空')
        return false
      }
      onOk({
        code: doctorProfile.code,
        authRemark: data.authRemark,
        ...data,
        isSendSms: data.isSendSms === undefined ? false : data.isSendSms,
        image: doctorProfile.image,
      })
    })
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
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
  const infoStyle = {
    paddingTop: '31px',
    fontSize: '50px',
    color: '#A7ADBD',
    textAlign: 'center',
  }
  function handleTagsChange (tag, b) {
    if (b === null || b === undefined) { b = '' }
    let mess = formatMsg(tag.content, [`${doctorProfile.name}`, `${doctorProfile.mobile}`, '010-64010-566'])
    tag.content = mess !== false ? mess : tag.content
    setFieldsValue({ authRemark: `${b} ${tag.content}  ` })
  }
  function changeAuth () {
    setFieldsValue({ authRemark: doctorProfile.authRemark })
  }
  return (
    <Form>
      <Row>
        <Col span={24}>
          <div style={{ marginBottom: '2rem' }}>
            <Link to="/doctor-profiles"><Button type="default" size="large" style={{ marginLeft: '30px' }}>返回</Button></Link>
            <Button loading={isOK} type="primary" size="large" style={{ marginLeft: '30px' }} onClick={handleOk}>确定</Button>
            <Button loading={isES} type="primary" size="large" style={{ marginLeft: '30px' }} onClick={() => handleES(doctorProfile.code)}>同步至ES</Button>
          </div>


        </Col>
        <Col span={24} >
          <fieldset style={{ border: 0 }}>
            <legend>医师信息</legend>
            <FormItem {...formItemLayout} label="头像">
              <SingleImagePicker Rotate={updateImage} infoStyle={infoStyle} imgSrc={doctorProfile.image} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadIconSuccess} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="头像审核"
            >
              {getFieldDecorator('completeStatus.imageStatus', {
                initialValue: doctorProfile.completeStatus === undefined ? 3 : doctorProfile.completeStatus.imageStatus,
              })(
                <Select placeholder="--请选择--">
                  {
                    statusList.map((val) => {
                      return (
                        <Option key={val.code} value={val.code}>{val.name}</Option>
                      )
                    })
                  }
                </Select>
          )}
            </FormItem>
            <FormItem {...formItemLayout} label="姓名">
              <div><span>{doctorProfile.name}</span></div>
            </FormItem>
            <FormItem {...formItemLayout} label="手机号">
              <div><span>{doctorProfile.mobile}</span></div>
            </FormItem>
            <FormItem {...formItemLayout} label="提交时间">
              <div><span>{doctorProfile.submitTime}</span></div>
            </FormItem>
          </fieldset>


          {/* <div style={{ marginBottom: 20, marginLeft: '16.6rem' }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>姓名：</div><span>{doctorProfile.name}</span></div>
          <div style={{ marginBottom: 20, marginLeft: '16.6rem' }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>手机号：</div><span>{doctorProfile.mobile}</span></div>
          <div style={{ marginBottom: 20, marginLeft: '16.6rem' }}><div style={{ textAlign: 'right', width: 90, display: 'inline-block', marginLeft: -30 }}>职称认证状态：</div><span>{ getStatus(doctorProfile.titleAuthStatus) }</span></div>
          <div style={{ marginBottom: 20, marginLeft: '16.6rem' }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>提交时间：</div><span>{format(doctorProfile.submitTime)}</span></div> */}

        </Col>
        <fieldset style={{ border: 0 }}>
          <legend>其他信息</legend>
          <FormItem {...formItemLayout} label="擅长疾病">
            {getFieldDecorator('special', {
              initialValue: (doctorProfile.special === undefined ? ['1'] : (doctorProfile.special.map((val) => {
                return (
                val
                )
              }))),
            })(
              <Select
                mode="tags"
                style={{ width: '100%' }}
                disabled={doctorProfile.completeStatus === undefined ? true : (doctorProfile.completeStatus.specialStatus !== 1)}
              >
                <Option key={'1'}>请填写擅长疾病</Option>
              </Select>
        )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="擅长疾病审核"
          >
            {getFieldDecorator('completeStatus.specialStatus', {
              initialValue: doctorProfile.completeStatus === undefined ? 3 : doctorProfile.completeStatus.specialStatus,
            })(
              <Select placeholder="--请选择--">
                {
                  statusList.map((val) => {
                    return (
                      <Option key={val.code} value={val.code}>{val.name}</Option>
                    )
                  })
                }
              </Select>
          )}
          </FormItem>
          <FormItem {...formItemLayout} label="专业背景、从业资历">
            {getFieldDecorator('biography', {
              initialValue: doctorProfile.biography,
            })(
              <Input
                disabled={doctorProfile.completeStatus === undefined ? true : (doctorProfile.completeStatus.biographyStatus !== 1)}
                placeholder="请填写个人简介。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }}
              />
                )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="专业背景、从业资历审核"
          >
            {getFieldDecorator('completeStatus.biographyStatus', {
              initialValue: doctorProfile.completeStatus === undefined ? 3 : doctorProfile.completeStatus.biographyStatus,
            })(
              <Select placeholder="--请选择--">
                {
                  statusList.map((val) => {
                    return (
                      <Option key={val.code} value={val.code}>{val.name}</Option>
                    )
                  })
                }
              </Select>
          )}
          </FormItem>
          <FormItem {...formItemLayout} label="个人荣誉、医学成果">
            {getFieldDecorator('academicAchievements', {
              initialValue: doctorProfile.academicAchievements,
            })(
              <Input
                disabled={doctorProfile.completeStatus === undefined ? true : (doctorProfile.completeStatus.academicAchievementsStatus !== 1)}
                placeholder="请填写个人荣誉、医学成果。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }}
              />
                )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="个人荣誉、医学成果审核"
          >
            {getFieldDecorator('completeStatus.academicAchievementsStatus', {
              initialValue: doctorProfile.completeStatus === undefined ? 3 : doctorProfile.completeStatus.academicAchievementsStatus,
            })(
              <Select placeholder="--请选择--">
                {
                  statusList.map((val) => {
                    return (
                      <Option key={val.code} value={val.code}>{val.name}</Option>
                    )
                  })
                }
              </Select>
          )}
          </FormItem>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="短信通知"
            >
              {getFieldDecorator('isSendSms', {
                valuePropName: 'checked',
                initialValue: doctorProfile.isSendSms || false,
              })(
                <Checkbox>是否发送短信通知（选此项必填备注）</Checkbox>
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
      </Row>
    </Form>
  )
}

DoctorProfileVerifyModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(DoctorProfileVerifyModal)
