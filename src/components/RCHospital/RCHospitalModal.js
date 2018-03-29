import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Button, Input, Icon, Modal,
} from 'antd'
import HospitalLookupModal from '../Hospital/HospitalLookupModal.js'

import { doctorBlockStyle } from '../../themes/index.less'
import SingleImagePicker from '../SingleImagePicker/SingleImagePicker.js'
import { env } from '../../utils/config'


const FormItem = Form.Item


const RCHospitalModal = ({
  item = {},
  onOk,
  uploadIconSuccess,
  uploadToken,
  showCateModal,
  handleDeptCancel,
  deptPageVisible,
  rowSelection,
  updateImage,
  form: {
    validateFields,
    getFieldDecorator,
    getFieldsValue,
  },
  ...hospitalCateLookupModalProps
}) => {
  const rcHospi = item
  // let special = doctor.personal === undefined ? '' : (doctor.personal.specials === '' ? '' : doctor.personal.specials.slice(1, -1).split(','))
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      if (!rcHospi.hospitalCode) {
        Modal.info({
          content: '医院不存在编号，请重新选择医院！',
        })
        return false
      }
      onOk({
        uid: rcHospi.uid || '',
        ...data,
        hospitalCode: rcHospi.hospitalCode,
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

  return (

    <Form>
      <Row>
        <Col span={24} >
          <Link to="/rc-hospital"><Button type="default" size="large" style={{ marginBottom: '30px' }}>返回</Button></Link>
          <Button type="primary" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={handleOk}>确定</Button>
          {/* <Button type="primary" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={() => handleES(doctor.code)}>同步到ES</Button> */}
          <div className={doctorBlockStyle} >
            <fieldset style={{ border: 0 }}>
              <legend>详细信息</legend>
              <SingleImagePicker Rotate={updateImage} imgSrc={rcHospi.hospitalIcon} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadIconSuccess} />
              <div style={{ width: '100%', textAlign: 'center', marginTop: '-10px', marginBottom: '60px' }}>医生头像</div>

              {/* <FormItem
                  {...formItemLayout}
                  label="类型"
                >
                  {getFieldDecorator('type', {
                    rules: [{
                      required: true,

                      message: '必须填写',
                    }],
                    initialValue: tag.type,
                  })(
                    <Select placeholder="--请选择--">
                      {
                        tabList.map((val) => {
                          return (
                            <Option value={val.code}>{val.content}</Option>

                          )
                        })
                      }
                    </Select>
                )}
                </FormItem> */}
              <FormItem {...formItemLayout}
                label={<span><span style={{ color: 'red', marginRight: '0.25rem' }}>*</span><span>医院名称</span></span>}
                help="请点击放大镜，选择医院"
              >
                {getFieldDecorator('hospitalName', {
                  initialValue: rcHospi.hospitalName,
                })(
                  <Input disabled placeholder="请输入标题" addonAfter={<Icon type="search" onClick={showCateModal} style={{ color: '#3e75eb', cursor: 'pointer' }} />} />
                )}

                <HospitalLookupModal
                  onCancel={handleDeptCancel}
                  visible={deptPageVisible}
                  width="1000px"
                  rowSelection={rowSelection}
                  {...hospitalCateLookupModalProps}
                />

              </FormItem>
              <FormItem {...formItemLayout} hasFeedback label="管理员用户名">
                {getFieldDecorator('username', {
                  rules: [{
                    required: true,

                    message: '必须填写',
                  }],
                  initialValue: rcHospi.username,
                })(
                  <Input placeholder="请输入内容" required />
                )}
              </FormItem>
              <FormItem {...formItemLayout} hasFeedback label="管理员用户密码">
                {getFieldDecorator('password', {
                  rules: [{
                    required: true,

                    message: '必须填写',
                  }],
                  initialValue: rcHospi.password,
                })(
                  <Input placeholder="请输入内容" required />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="创建时间">
                <div><span>{rcHospi.createTime}</span></div>
              </FormItem>
              <FormItem {...formItemLayout} label="更新时间">
                <div><span>{rcHospi.updateTime}</span></div>
              </FormItem>

            </fieldset>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

RCHospitalModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(RCHospitalModal)
