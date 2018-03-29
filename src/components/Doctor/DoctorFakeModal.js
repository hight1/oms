import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Button, Select, Radio, Input, Modal, Icon, Spin,
} from 'antd'
// import ChangeArea from './changeArea'
// import { EditableCell } from '../EditableCell/index.js'
import SingleImagePicker from '../SingleImagePicker/SingleImagePicker.js'
import HospitalLookupModal from '../Hospital/HospitalLookupModal.js'

import DeptLookupModal from '../../components/Department/DeptLookupModal'

import { env } from '../../utils/config'


const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group

const DoctorFakeModal = ({
  item = {},
  onOk,
  onChangeHospitalName,
  deptPageVisible,
  handleDeptCancel,
  rowSelection,
  onRecommendChange,
  onChangeSort,
  handleCateDelete,
  showDeptLookUpModal,
  DeptLookupCancel,
  deptLookUpVisible,
  deptLookUpSelection,
  handleDeptLookOk,
  onSpecialChange,
  handleDeptDelete,
  setHospital,
  setDept,
  modalType,
  changeModalType,
  currentItem,
  handleES,
  confirmLoading,
  // //////// 头像 //////////
  uploadIconSuccess,
  uploadToken,
  updateImage,
  isOK,
  isES,
  // titleList,
  form: {
    validateFields,
    getFieldsValue,
    getFieldDecorator,
  },
  showCateModal,
  ...hospitalCateLookupModalProps,
  ...deptLookupModalProps
}) => {
  const doctor = item
  // let special = doctor.personal === undefined ? '' : (doctor.personal.special === '' ? '' : doctor.personal.special.slice(1, -1).split(','))
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
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      if (!data.hospital.hospitalCode) {
        Modal.info({
          content: '请选择医院！',
        })
        return false
      }
      if (!data.dept.deptCode) {
        Modal.info({
          content: '请选择科室！',
        })
        return false
      }
      titleList.map((val) => {
        if (val.key === data.title.titleCode) {
          data.title.titleName = val.label
        }
        return val
      })
      onOk({
        code: doctor.code,
        ...data,
        location: doctor.location,
      })
    })
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
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }
  const titleList = [
    {
      key: 'facdd284648711e7b4097cd30ac3349c',
      label: '普通医生',
    },
    {
      key: 'e3247b0e45b011e78f87408d5c808e11',
      label: '主治医生',
    },
    {
      key: 'f2fe264c45b011e78f87408d5c808e11',
      label: '副主任医师',
    },
    {
      key: 'fefe971f45b011e78f87408d5c808e11',
      label: '主任医师',
    },
    {
      key: '0de3ffb345b111e78f87408d5c808e11',
      label: '特需专家',
    },

  ]
  return (
    <Spin spinning={confirmLoading}>
      <Form>
        <Link to="/doctors"><Button type="default" size="large" style={{ marginBottom: '30px' }} onClick={changeModalType}>返回</Button></Link>
        <Button loading={isOK} type="primary" size="large" style={{ marginBottom: '30px', marginLeft: '30px' }} onClick={handleOk}>确定</Button>
        <Button loading={isES} type="primary" disabled={modalType === 'create'} size="large" style={{ marginBottom: '30px', marginLeft: '30px' }} onClick={() => handleES(doctor.code)}>同步至ES</Button>
        <fieldset style={{ border: 0 }}>
          <legend>基本信息</legend>
          <SingleImagePicker Rotate={updateImage} imgSrc={doctor.image} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadIconSuccess} />
          <div style={{ width: '100%', textAlign: 'center', marginTop: '-60px', marginBottom: '60px' }}>医生头像</div>
          <Row>
            {/* <Col span={24}>
              <FormItem
                wrapperCol={{ span: 12, offset: 5 }}
              >
                <Button type="primary" onClick={handleOk}>确定</Button>
                <Link to="/hospitals"><Button type="primary" size="large" style={{ marginLeft: '30px' }} onClick={onCancel}>返回</Button></Link>
              </FormItem>
            </Col> */}

            <Col span={24}>
              <FormItem {...formItemLayout} hasFeedback label="医师姓名">
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '必须填写医院名称',
                  }],
                  initialValue: doctor.name,
                })(
                  <Input placeholder="请输入医院名称" required />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="性别"
              >
                {getFieldDecorator('sex', {
                  rules: [{
                    required: true,
                    message: '不能为空',
                  }],
                  initialValue: 1,
                })(
                  <RadioGroup>
                    <Radio value={1}>女</Radio>
                    <Radio value={0}>男</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} hasFeedback label="职称">
                {getFieldDecorator('title.titleCode', {
                  initialValue: doctor.title === undefined ? 'facdd284648711e7b4097cd30ac3349c' : doctor.title.titleCode,
                })(
                  <Select placeholder="--请选择--" /* disabled={modalType === 'update'}*/ >
                    {
                    titleList.map((val) => {
                      return (
                        <Option key={val.key} >{val.label}</Option>
                      )
                    })
                  }
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        </fieldset>
        <fieldset style={{ border: 0 }}>
          <legend>医院</legend>
          <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
            <Col span={24} >
              {/* <Button type="primary" onClick={showCateModal} disabled={modalType === 'update'} style={{ marginLeft: '10rem' }}>导入医院</Button> */}
              <div>
                <HospitalLookupModal
                  onCancel={handleDeptCancel}
                  visible={deptPageVisible}
                  width="1000px"
                  rowSelection={rowSelection}
                  {...hospitalCateLookupModalProps}
                />
              </div>
            </Col>
          </Row>
          <FormItem {...formItemLayout}
            label={<span><span style={{ color: 'red', marginRight: '0.25rem' }}>*</span><span>医院代码</span></span>}
            validateStatus={doctor.hospital === undefined ? 'error' : (doctor.hospital.hospitalCode ? 'success' : 'error')}
            help="请点击放大镜，选择医院"
          >
            {getFieldDecorator('hospital.hospitalCode', {
              initialValue: doctor.hospital === undefined ? '' : doctor.hospital.hospitalCode,
            })(
              <Input placeholder="请输入医院名称" addonAfter={<Icon type="search" onClick={showCateModal} style={{ color: '#3e75eb', cursor: 'pointer' }} />} disabled />
                )}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="医院名称">
            {getFieldDecorator('hospital.hospitalName', {
              initialValue: doctor.hospital === undefined ? '' : doctor.hospital.hospitalName,
            })(
              <Input placeholder="请输入医院名称" required disabled />
                )}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="医院等级">
            {getFieldDecorator('hospital.hospitalLevelName', {
              initialValue: (doctor.hospital === undefined ? '' : doctor.hospital.hospitalLevelName),
            })(
              <Input placeholder="请输入医院级别" required disabled />
                )}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="顶级医院">
            {getFieldDecorator('hospital.isTop', {
              initialValue: (doctor.hospital === undefined ? '' : doctor.hospital.isTop),
            })(
              <RadioGroup disabled>
                <Radio value>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
                )}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="医保定点">
            {getFieldDecorator('hospital.isInsurance', {
              initialValue: (doctor.hospital === undefined ? '' : doctor.hospital.isInsurance),
            })(
              <RadioGroup disabled>
                <Radio value>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
                )}
          </FormItem>
        </fieldset>
        <fieldset style={{ border: 0 }}>
          <legend>科室</legend>
          <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>

            <Col span={24} >
              <div>
                {/* <Button style={{ marginLeft: '10rem' }} type="primary" onClick={showDeptLookUpModal} disabled={modalType === 'update'}>导入科室</Button> */}
                <div>
                  <DeptLookupModal
                    width="1000px"
                    onCancel={DeptLookupCancel}
                    onOk={handleDeptLookOk}
                    visible={deptLookUpVisible}
                    deptLookUpSelection={deptLookUpSelection}
                    // deptLookUpList={hospital.hospitalDepartments}
                    {...deptLookupModalProps}
                  />
                </div>
                {/* </Modal> */}
              </div>
            </Col>
          </Row>
          <FormItem {...formItemLayout}
            label={<span><span style={{ color: 'red', marginRight: '0.25rem' }}>*</span><span>科室代码</span></span>}
            validateStatus={doctor.dept === undefined ? 'error' : (doctor.dept.deptCode ? 'success' : 'error')}
            help="请点击放大镜，选择科室"
          >
            {getFieldDecorator('dept.deptCode', {
              initialValue: (doctor.dept === undefined ? '' : doctor.dept.deptCode),
            })(
              <Input disabled addonAfter={<Icon type="search" onClick={showDeptLookUpModal} style={{ color: '#3e75eb', cursor: 'pointer' }} />} />
                )}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="科室名称">
            {getFieldDecorator('dept.deptName', {
              initialValue: (doctor.dept === undefined ? '' : doctor.dept.deptName),
            })(
              <Input placeholder="请输入科室名称" required disabled />
                )}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="一级科室">
            {getFieldDecorator('dept.parentDeptName', {
              initialValue: (doctor.dept === undefined ? '' : doctor.dept.parentDeptName),
            })(
              <Input placeholder="请输入一级科室名称" required disabled />
                )}
          </FormItem>
        </fieldset>
        <fieldset style={{ border: 0 }}>
          <legend>个人特色</legend>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="擅长疾病">
              {getFieldDecorator('personal.special', {
                rules: [{
                  required: true,

                  message: '必须填写擅长疾病',
                }],
                initialValue: doctor.personal === undefined ? ['1'] : (doctor.personal.special === null ? '1' :
                doctor.personal.special.map((val) => {
                  return (
                  val
                  )
                })
              ),
              })(
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                >
                  <Option key={'1'} value={'1'}>必须填写擅长疾病</Option>
                </Select>
                )}
            </FormItem>
          </Col>
        </fieldset>
        {/* <Col span={24}>
              <FormItem
                wrapperCol={{ span: 12, offset: 5 }}
              >
                <Button type="primary" onClick={handleOk}>确定</Button>
                <Link to="/hospitals"><Button type="primary" size="large" style={{ marginLeft: '30px' }} onClick={onCancel}>返回</Button></Link>
              </FormItem>
            </Col> */}
        {/* <Col span={24}>
              <div style={{ marginLeft: 30 }}>头像：</div>
              <SingleImagePicker imgSrc={''} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadIconSuccess} />
            </Col> */}
        {/* <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="特需专家"
              >
                {getFieldDecorator('isSpecialExpert', {
                  rules: [{
                    required: true,
                    message: '不能为空',
                  }],
                  initialValue: 1,
                })(
                  <RadioGroup>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col> */}
        {/* <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="从业年限"
              >
                {getFieldDecorator('workYears', {
                  rules: [],
                  initialValue: 5,
                })(
                  <Select placeholder="--请选择--" style={{ width: 250 }}>
                    <Option value={5}>5年以上</Option>
                    <Option value={10}>10年以上</Option>
                    <Option value={15}>15年以上</Option>
                    <Option value={20}>20年以上</Option>
                  </Select>
                )}
                <span style={{ marginLeft: '1.5rem' }}><a href="https://www.hqms.org.cn/usp/roster/index.jsp" target="blank">验证网站</a></span>
              </FormItem>
            </Col> */}
        {/* <Col span={24}>
              <FormItem {...formItemLayout} hasFeedback label="评分">
                {getFieldDecorator('score', {
                  rules: [{
                    required: true,
                    message: '必须填写分数',
                  }],
                  initialValue: 'as',
                })(
                  <Input placeholder="请输入分数" required />
                )}
              </FormItem>
            </Col> */}

        {/* <Col span={24}>
              <FormItem {...formItemLayout} label="个人简介">
                {getFieldDecorator('biography', {
                  initialValue: '',
                })(
                  <Input placeholder="请填写个人简介。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                )}
              </FormItem>


            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="医学成果">
                {getFieldDecorator('academicAchievements', {
                  initialValue: '',
                })(
                  <Input placeholder="请填写医学成果。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                )}
              </FormItem>


            </Col> */}
      </Form>
    </Spin>

  )
}

DoctorFakeModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(DoctorFakeModal)

