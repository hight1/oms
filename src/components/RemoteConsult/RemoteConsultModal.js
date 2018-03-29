import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Row, Col, Card, Button, DatePicker, Input, Modal, Icon, Select,
} from 'antd'
import { Link } from 'dva/router'
import moment from 'moment'

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'

import DoctorLookupModal from '../../components/Doctor/DoctorLookupModal'
import PatientLookupModal from '../../components/Patient/PatientLookupModal'
// import { format } from '../../utils/helper.js'
// import { getRemoteConsultStatus, getPayStatus } from '../../utils/helper'
// import { doctorBlockStyle, labelStyle, longLabelStyle } from '../../themes/index.less'
moment.locale('zh-cn')

const FormItem = Form.Item
const Option = Select.Option
// import ChangeArea from './changeArea'
// import { EditableCell } from '../EditableCell/index.js'


const RemoteConsultModal = ({
  item = {},
  onOk,
  showDocLookUpModal,
  handleDocLookOk,
  docLookUpVisible,
  docLookUpSelection,
  DocPagination,
  docList,
  showDocLookUpModal2,
  handleDocLookOk2,
  docLookUpVisible2,
  docLookUpSelection2,
  DocPagination2,
  showPatLookUpModal,
  handlePatLookOk,
  patList,
  patLookUpVisible,
  patLookUpSelection,
  PatPagination,
  serviceSearch,
  applySearch,
  patientSearch,
  cancelOrder,
  form: {
    validateFields,
    getFieldsValue,
    getFieldDecorator,
  },
  ...docLookupModalProps,
  ...docLookupModalProps2,
  ...patLookupModalProps
}) => {
  const rc = item
  // setFieldsValue({ 'apply.patientMobile': getFieldValue('apply.patientMobile') })
  // let special = doctor.special === '' ? '' : doctor.special.slice(1, -1).split(',')
  // function initialHospital () {
  //   return (
  //     <Tooltip>
  //       {doctor.hospitalName}
  //     </Tooltip>
  //   )
  // }
  // function ChangeHospitalName (name) {
  //   const hospitalName = document.getElementsByClassName('hospitalName')
  //   hospitalName.innerHTML = `${<ChangeArea
  //     initialValue={name}
  //     onCancel={() => {
  //       hospitalName.innerHTML = initialHospital()
  //     }}
  //     handleSubmit={(newHospitalName) => { onChangeHospitalName(doctor.hospitalName, newHospitalName) }}
  //   />}`
  //   // `<Input placeholder="请填写医院名称" defaultValue=${name} onPressEnter={(value)=>{onChangeHospitalName(name,value)}/> `
  // }
  // function changeBackground () {
  //   const hospitalName = document.getElementsByClassName('hospitalName')
  //   hospitalName.style.backgroundColor = '#FFFBF2'
  // }
  const statusList = [
    {
      name: '专家已接诊',
      code: '1',
    },
    {
      name: '会诊已开始',
      code: '2',
    },
    {
      name: '会诊已完成',
      code: '3',
    },
    {
      name: '订单已取消',
      code: '4',
    },
  ]
  const payStatusList = [
    {
      name: '待付款',
      code: '00',
    },
    {
      name: '确认中',
      code: '10',
    },
    {
      name: '付款成功',
      code: '30',
    },
    {
      name: '付款失败',
      code: '91',
    },
  ]
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      let unix = moment(data.consultTime._d).format('x')
      let unixStart = moment(data.startTime._d).format('x')
      let unixEnd = moment(data.endTime._d).format('x')
      data.startTime = unixStart
      data.endTime = unixEnd
      data.consultTime = unix
      if (!data.service.uid) {
        Modal.info({
          content: '请选择服务医生！',
        })
        return false
      }
      if (!data.apply.uid) {
        Modal.info({
          content: '请选择申请医生！',
        })
        return false
      }
      if (!data.apply.patientUid) {
        Modal.info({
          content: '请选择申请患者！',
        })
        return false
      }
      if (data.apply.uid === data.service.uid) {
        Modal.info({
          content: '申请医生与服务医生不能相同！',
        })
        return false
      }
      if (data.apply.uid === data.apply.patientUid || data.service.uid === data.apply.patientUid) {
        Modal.info({
          content: '医生与患者不能相同！',
        })
        return false
      }
      onOk({
        orderNo: rc.orderNo,
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
        <Col span={24}>
          <Link to={{ pathname: '/remote-consult' }} ><Button type="default" size="large" style={{ marginBottom: '30px' }}>返回</Button></Link>
          <Button type="default" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={() => cancelOrder(rc.orderNo)}>解除订单</Button>

          <Button type="primary" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={handleOk}>确定</Button>
        </Col>
        <Col span={24} >
          <Card bordered={false} style={{ width: '100%', marginLeft: 10, color: '#000' }} noHovering>
            <fieldset style={{ border: 0 }}>
              <legend>基本信息</legend>
              <FormItem {...formItemLayout} label="订单号">
                <div><span>{rc.orderNo}</span></div>
              </FormItem>
              <FormItem {...formItemLayout} label="创建时间">
                <div><span>{rc.createTime}</span></div>
              </FormItem>
              <FormItem {...formItemLayout} label="修改时间">
                <div><span>{rc.updateTime}</span></div>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="订单状态"
              >
                {getFieldDecorator('orderStatus', {
                  initialValue: rc.status || '1',
                })(
                  <Select placeholder="--请选择--" >
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
              <FormItem
                {...formItemLayout}
                label="支付状态"
              >
                {getFieldDecorator('payStatus', {
                  initialValue: rc.payStatus || '00',
                })(
                  <Select placeholder="--请选择--" >
                    {
                    payStatusList.map((val) => {
                      return (
                        <Option key={val.code} value={val.code}>{val.name}</Option>
                      )
                    })
                  }
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="开始时间"
              >
                {getFieldDecorator('startTime', {
                  initialValue: moment(rc.startTime)
                  , // moment(rc.service === undefined ? '2016-1-1' : format(rc.service.consultTime), 'YYYY-MM-DD HH:mm:ss'), // rc.service === undefined ? '' : rc.service.consultTime,
                })(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
               )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="结束时间"
              >
                {getFieldDecorator('endTime', {
                  initialValue: rc.endTime === null ? moment('2016-1-1', 'YYYY-MM-DD') : moment(rc.endTime)
                  , // moment(rc.service === undefined ? '2016-1-1' : format(rc.service.consultTime), 'YYYY-MM-DD HH:mm:ss'), // rc.service === undefined ? '' : rc.service.consultTime,
                })(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
               )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="会诊时间"
              >
                {getFieldDecorator('consultTime', {
                  rules: [{
                    required: true,
                    message: '必须填写',
                  }],
                  initialValue: moment(rc.consultTime)
                  , // moment(rc.service === undefined ? '2016-1-1' : format(rc.service.consultTime), 'YYYY-MM-DD HH:mm:ss'), // rc.service === undefined ? '' : rc.service.consultTime,
                })(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
               )}
              </FormItem>
            </fieldset>
            <fieldset style={{ border: 0 }}>
              <legend>服务方信息</legend>
              <div>
                <div>
                  <DoctorLookupModal
                    width="1000px"
                    onOk={handleDocLookOk}
                    docDataSource={docList}
                    visible={docLookUpVisible}
                    onSearch={serviceSearch}
                    docLookUpSelection={docLookUpSelection}
                    DocPagination={DocPagination}
                    {...docLookupModalProps}
                  />
                </div>
              </div>
              <FormItem
                {...formItemLayout}
                label="服务医生编号"
                validateStatus={rc.service === undefined ? 'error' : (rc.service.uid ? 'success' : 'error')}
                help="请点击放大镜，选择医生"
              >
                {getFieldDecorator('service.uid', {
                  initialValue: rc.service === undefined ? '' : rc.service.uid,
                }
              )(
                <Input placeholder="请输入服务医生编号" disabled style={{ width: '480px' }} addonAfter={<Icon type="search" onClick={showDocLookUpModal} style={{ color: '#3e75eb', cursor: 'pointer' }} />} />
                  )}
                {/* <span><Button icon="search" onClick={showDocLookUpModal} style={{ marginLeft: '20px', marginTop: '10px' }} type="primary" /></span> */}
              </FormItem>
              <FormItem {...formItemLayout} label="头像">
                <div><img style={{ width: 100, height: 100 }} src={rc.service === undefined ? '' : rc.service.image} alt="正在加载数据..." /></div>
              </FormItem>
              <FormItem {...formItemLayout} label="医生姓名">
                <div><span>{rc.service === undefined ? '' : rc.service.name}</span></div>
              </FormItem>
              <FormItem {...formItemLayout} label="职称姓名">
                <div><span>{rc.service === undefined ? '' : rc.service.titleName}</span></div>
              </FormItem>
              <FormItem {...formItemLayout} label="医院名称">
                <div><span>{rc.service === undefined ? '' : rc.service.hospitalName}</span></div>
              </FormItem>
              <FormItem {...formItemLayout} label="科室名称">
                <div><span>{rc.service === undefined ? '' : rc.service.deptName}</span></div>
              </FormItem>
            </fieldset>
            <fieldset style={{ border: 0 }}>
              <legend>申请方信息</legend>
              <div>
                <div>
                  <DoctorLookupModal
                    width="1000px"
                    onOk={handleDocLookOk2}
                    docDataSource={docList}
                    visible={docLookUpVisible2}
                    onSearch={applySearch}
                    docLookUpSelection={docLookUpSelection2}
                    DocPagination={DocPagination2}
                    {...docLookupModalProps2}
                  />
                </div>
              </div>
              <FormItem
                {...formItemLayout}
                label="申请医生编号"
                validateStatus={rc.apply === undefined ? 'error' : (rc.apply.uid ? 'success' : 'error')}
                help="请点击放大镜，选择医生"
              >
                {getFieldDecorator('apply.uid', {
                  initialValue: rc.apply === undefined ? '' : rc.apply.uid,
                }
              )(
                <Input placeholder="请输入申请医生编号" disabled addonAfter={<Icon type="search" onClick={showDocLookUpModal2} style={{ color: '#3e75eb', cursor: 'pointer' }} />} style={{ width: '480px' }} />
                  )}
                {/* <span>
                  <Button icon="search" onClick={showDocLookUpModal2} style={{ marginLeft: '20px', marginTop: '10px' }} type="primary" />
                </span> */}
              </FormItem>
              <FormItem {...formItemLayout} label="申请医生">
                <div><span>{rc.apply === undefined ? '' : rc.apply.name}</span></div>
              </FormItem>
              <FormItem {...formItemLayout} label="医院名称">
                <div><span>{rc.apply === undefined ? '' : rc.apply.hospitalName}</span></div>
              </FormItem>
              <div>
                <div>
                  <PatientLookupModal
                    width="1000px"
                    onOk={handlePatLookOk}
                    patDataSource={patList}
                    visible={patLookUpVisible}
                    onSearch={patientSearch}
                    patLookUpSelection={patLookUpSelection}
                    PatPagination={PatPagination}
                    {...patLookupModalProps}
                  />
                </div>
              </div>
              <FormItem
                {...formItemLayout}
                label="患者编号"
                validateStatus={rc.apply === undefined ? 'error' : (rc.apply.patientUid ? 'success' : 'error')}
                help="请点击放大镜，选择患者"
              >
                {getFieldDecorator('apply.patientUid', {
                  initialValue: rc.apply === undefined ? '' : rc.apply.patientUid,
                }
              )(
                <Input placeholder="请输入患者编号" disabled addonAfter={<Icon type="search" onClick={showPatLookUpModal} style={{ color: '#3e75eb', cursor: 'pointer' }} />} style={{ width: '480px' }} />
                  )}
                {/* <span>
                  <Button icon="search" onClick={showPatLookUpModal} style={{ marginLeft: '20px', marginTop: '10px' }} type="primary" />
                </span> */}
              </FormItem>
              <FormItem {...formItemLayout} label="患者姓名">
                {getFieldDecorator('apply.patientName', {

                  initialValue: rc.apply === undefined ? '' : rc.apply.patientName,
                })(
                  <Input placeholder="请输入患者姓名" style={{ width: '480px' }} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="患者手机号">
                {getFieldDecorator('apply.patientMobile', {

                  initialValue: rc.apply === undefined ? '' : rc.apply.patientMobile,
                })(
                  <Input placeholder="请输入患者手机号" style={{ width: '480px' }} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="患者性别"
              >
                {getFieldDecorator('apply.patientSex', {
                  initialValue: rc.apply === undefined ? '' : rc.apply.patientSex,
                })(
                  <Select placeholder="--请选择--" style={{ width: '480px' }}>
                    <Option key={-1} value={-1}>暂时没有填写</Option>
                    <Option key={1} value={1}>女</Option>
                    <Option key={0} value={0}>男</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="患者年龄"
              >
                {getFieldDecorator('apply.patientAge', {
                  initialValue: rc.apply === undefined ? '' : rc.apply.patientAge,
                })(
                  <Input placeholder="请输入患者年龄" style={{ width: '480px' }} />
                )}
              </FormItem>
            </fieldset>
          </Card>
        </Col>
      </Row>
    </Form>
  )
}

RemoteConsultModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(RemoteConsultModal)
