import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Button, Input, Radio, Select, Modal, Spin, Icon,
  Tag, Tabs, Checkbox,
} from 'antd'
// import ChangeArea from './changeArea'
// import { EditableCell } from '../EditableCell/index.js'
import RotateImage from '../DoctorVerify/RotateImage'
import PriceTable from './PriceTable'
import HospitalLookupModal from '../Hospital/HospitalLookupModal.js'
import DeptLookupModal from '../../components/Department/DeptLookupModal'
import { env } from '../../utils/config'


import { doctorBlockStyle } from '../../themes/index.less'
import SingleImagePicker from '../SingleImagePicker/SingleImagePicker.js'
// import ThumbPic from '../ThumbPic/ThumbPic'
// import { getOpenStatus/* , isOpenStatus*/, getDoctorStatus, format } from '../../utils/helper.js'

const Option = Select.Option
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const RadioGroup = Radio.Group

const DoctorModal = ({
  item = {},
  onOk,
  onChangeHospitalName,
  modalType,
  showCateModal,
  deptPageVisible,
  rowSelection,
  handleDeptCancel,
  deptLookUpSelection,
  deptLookUpVisible,
  showDeptLookUpModal,
  DeptLookupCancel,
  handleDeptLookOk,
  uploadToken,
  uploadIconSuccess,
  handleES,
  confirmLoading,
  onHosiSearch,
  onDeptSearch,
  qualifPic,
  qualifVisi,
  qualifUNVisi,
  qualifPic2,
  qualifVisi2,
  qualifUNVisi2,
  sendFcSms,
  tagList,
  isOK,
  isES,
  updateImage,
  form: {
    validateFields,
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
    getFieldValue,
  },
  ...hospitalCateLookupModalProps,
  ...deptLookupModalProps
}) => {
  let doctor = item
  let a = item.service === undefined || item.service === null || item.service.length === 0 ? '' : item.service.filter((val) => {
    return val.serveType === '00'
  })

  let b = item.service === undefined || item.service === null || item.service.length === 0 ? '' : item.service.filter((val) => {
    return val.serveType === '01'
  })

  let c = item.service === undefined || item.service === null || item.service.length === 0 ? '' : item.service.filter((val) => {
    return val.serveType === '02'
  })

  let d = item.service === undefined || item.service === null || item.service.length === 0 ? '' : item.service.filter((val) => {
    return val.serveType === '03'
  })

  let e = item.service === undefined || item.service === null ? '' : item.service.filter((val) => {
    return val.serveType === '04'
  })

  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      // data.service[0] = {}

      // data.service[0].serveType = '00'
      data.service[1].serveType = '02'
      data.service[2].serveType = '01'
      data.service[3].serveType = '03'
      data.service[4].serveType = '04'
      if (!data.dept.deptCode || !data.dept.deptName) {
        Modal.info({
          content: '请选择科室！',
        })
        return false
      }
      if (!data.hospital.hospitalCode || !data.hospital.hospitalName) {
        Modal.info({
          content: '请选择医院！',
        })
        return false
      }
      onOk({
        code: doctor.uid,
        ...data,
        location: doctor.location,
      })
    })
  }
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
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
  // let special = doctor.personal === undefined ? '' : (doctor.personal.special === '' ? '' :
  // (
  //  doctor.personal.special.map((val)=>{
  //    return val.slice(1, -1).split(',')
  //  })
  // )
  function handleTagsChange (tag, s) {
    if (s === null || s === undefined) { s = '' }
    setFieldsValue({ authRemark: `${s} ${tag.content}  ` })
  }
  // function changePrice (obj) {
  //   console.log(obj)
  //   setFieldsValue({
  //     'service[0].timePrice': `${obj[0].patPrice}`,
  //     'service[0].incomeTimePrice': `${obj[0].docPrice}`,
  //     'service[0].incomeThirdTimePrice': `${obj[0].normalDoc}`,
  //     'service[0].timeActivityPrice': 1,
  //   })
  // }
  function changePrice2 (obj) {
    console.log(obj)
    setFieldsValue({
      'service[1].timePrice': `${obj[0].patPrice}`,
      'service[1].incomeTimePrice': `${obj[0].docPrice}`,
      'service[1].incomeThirdTimePrice': `${obj[0].normalDoc}`,
      'service[1].timeActivityPrice': 1,
    })
  }
  function changePrice3 (obj) {
    console.log(obj)
    setFieldsValue({
      'service[2].timePrice': `${obj[0].patPrice}`,
      'service[2].incomeTimePrice': `${obj[0].docPrice}`,
      'service[2].incomeThirdTimePrice': `${obj[0].normalDoc}`,
      'service[2].timeActivityPrice': 1,
    })
  }
  function changePrice4 (obj) {
    console.log(obj)
    setFieldsValue({
      'service[3].timePrice': `${obj[0].patPrice}`,
      'service[3].incomeTimePrice': `${obj[0].docPrice}`,
      'service[3].incomeThirdTimePrice': `${obj[0].normalDoc}`,
      'service[3].timeActivityPrice': 1,
    })
  }
  function changePrice5 (obj) {
    console.log(obj)
    setFieldsValue({
      'service[4].timePrice': `${obj[0].patPrice}`,
      'service[4].incomeTimePrice': `${obj[0].docPrice}`,
      'service[4].incomeThirdTimePrice': `${obj[0].normalDoc}`,
      'service[4].timeActivityPrice': 1,
    })
  }
  return (
    <Spin spinning={confirmLoading}>
      <Form>
        <Row>
          <Col span={24} >
            <Link to="/doctors"><Button type="default" size="large" style={{ marginBottom: '30px' }}>返回</Button></Link>
            <Button loading={isOK} type="primary" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={handleOk}>确定</Button>
            <Button loading={isES} type="primary" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={() => handleES(doctor.code)}>同步到ES</Button>
            <div className={doctorBlockStyle} >
              <fieldset style={{ border: 0 }}>
                <legend>基本信息</legend>
                <SingleImagePicker Rotate={updateImage} imgSrc={doctor.image} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadIconSuccess} />
                <div style={{ width: '100%', textAlign: 'center', marginTop: '-10px', marginBottom: '60px' }}>医生头像</div>

                <FormItem {...formItemLayout} label="医师编号">
                  {getFieldDecorator('code', {
                    rules: [{
                      required: true,

                      message: '必须填写',
                    }],
                    initialValue: doctor.code || '',
                  })(
                    <Input disabled={modalType === 'update'} />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="医师姓名">
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true,

                      message: '必须填写科室代码',
                    }],
                    initialValue: doctor.name,
                  })(
                    <Input disabled={modalType === 'update'} />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="身份证号">
                  {getFieldDecorator('idCard', {
                    rules: [{
                      required: true,

                      message: '必须填写科室代码',
                    }],
                    initialValue: doctor.idCard || '',
                  })(
                    <Input disabled={modalType === 'update'} />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="手机号">
                  {getFieldDecorator('mobile', {
                    initialValue: doctor.mobile,
                  })(
                    <Input disabled={modalType === 'update'} />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="性别">
                  {getFieldDecorator('sex', {
                    initialValue: doctor.sex,
                  })(
                    <RadioGroup disabled>
                      <Radio value={0}>男</Radio>
                      <Radio value={1}>女</Radio>
                    </RadioGroup>
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="生日">
                  {getFieldDecorator('birthday', {
                    initialValue: doctor.birthday,
                  })(
                    <Input disabled={modalType === 'update'} />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="测试帐号">
                  {getFieldDecorator('isExpert', {
                    initialValue: doctor.isExpert,
                  })(
                    <RadioGroup>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </RadioGroup>
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="医生级别备注">
                  {getFieldDecorator('rankRemark', {
                    initialValue: doctor.rankRemark,
                  })(
                    <Input placeholder="如：特需专家+北上广+三甲" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                )}
                </FormItem>
              </fieldset>
              <fieldset style={{ border: 0 }}>
                <legend>执业资格</legend>
                <FormItem {...formItemLayout} label="认证状态">
                  {getFieldDecorator('qualification.status', {
                    initialValue: doctor.qualification === undefined ? '3' : `${doctor.qualification.status}`,
                  })(
                    <Select placeholder="--请选择--" disabled={modalType === 'update'}>
                      <Option key={'0'} value={'0'}>未认证</Option>
                      <Option key={'1'} value={'1'}>认证中</Option>
                      <Option key={'2'} value={'2'}>已完成</Option>
                      <Option key={'3'} value={'3'}>认证失败</Option>
                      <Option key={'4'} value={'4'}>未上传头像</Option>
                      <Option key={'5'} value={'5'}>未上传医师执业证书5</Option>

                    </Select>
                )}
                </FormItem>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="职业证书">
                    <div>
                      {
                       doctor.qualification === null || doctor.qualification === undefined ? '' : (doctor.qualification.images === null ? '' : doctor.qualification.images.map(
                         (val, index) => {
                           return (
                             <RotateImage key={index} src={val} />
                           )
                         }
                       ))
                     }

                    </div>
                    {/* <div>
                      <div style={{ cursor: 'pointer' }}>
                        <img onClick={qualifPic} role="presentation" className="as" src={doctor.qualification === null || doctor.qualification === undefined ? '' : (doctor.qualification.images === null ? '' : doctor.qualification.images[0])} style={{ width: '50%', marginLeft: '10rem', marginBottom: '10px' }} />
                        <Modal visible={qualifVisi} footer={null} onCancel={qualifUNVisi}>
                          <img alt="没有图片" style={{ width: '100%' }} src={doctor.qualification === null || doctor.qualification === undefined ? '' : (doctor.qualification.images === null ? '' : doctor.qualification.images[0])} />
                        </Modal>
                      </div>
                      <div style={{ cursor: 'pointer' }}>
                        <img onClick={qualifPic2} role="presentation" className="as" src={doctor.qualification === null || doctor.qualification === undefined ? '' : (doctor.qualification.images === null ? '' : doctor.qualification.images[1])} style={{ width: '50%', marginLeft: '10rem', marginBottom: '10px' }} />
                        <Modal visible={qualifVisi2} footer={null} onCancel={qualifUNVisi2}>
                          <img alt="没有图片" style={{ width: '100%' }} src={doctor.qualification === null || doctor.qualification === undefined ? '' : (doctor.qualification.images === null ? '' : doctor.qualification.images[1])} />
                        </Modal>
                      </div>
                    </div> */}
                  </FormItem>
                </Col>
              </fieldset>
              <fieldset style={{ border: 0 }}>
                <legend>职称</legend>
                <FormItem {...formItemLayout} label="职称">
                  {getFieldDecorator('title.displayTitleName', {
                    initialValue: doctor.title === undefined ? '' : doctor.title.displayTitleName,
                  })(
                    <Input disabled={modalType === 'update'} />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="职称证明">
                  <div>
                    <div style={{ marginBottom: '1rem' }}><a href="http://zgcx.nhfpc.gov.cn/doctorsearch.aspx" target="blank">验证网站</a></div>
                    { doctor.title === undefined || doctor.title.titleImageList === null ? '' :
                doctor.title.titleImageList.map((val, index) => {
                  return (
                    // <div key={index}>
                    //   <img role="presentation" src={val} key={index} style={{ width: '50%', marginLeft: '10rem', marginBottom: '10px' }} />
                    // </div>
                    <RotateImage key={index} src={val} />
                  )
                })
                    }
                  </div>
                </FormItem>
                <FormItem {...formItemLayout} label="待审职称">
                  {getFieldDecorator('title.titleName', {
                    initialValue: doctor.title === undefined ? '' : doctor.title.titleName,
                  })(

                    <Input disabled={modalType === 'update'} />
                )}
                  <Link to="/title-auths">职称认证</Link>
                </FormItem>
                <FormItem {...formItemLayout} label="待审 职称审核状态">
                  {getFieldDecorator('title.titleAuthStatus', {
                    initialValue: doctor.title === undefined ? '-1' : `${doctor.title.titleAuthStatus}`,
                  })(
                    <Select placeholder="--请选择--" disabled={modalType === 'update'}>
                      <Option key={'-1'} value={'-1'} />
                      <Option key={'0'} value={'0'}>未认证</Option>
                      <Option key={'1'} value={'1'}>认证中</Option>
                      <Option key={'2'} value={'2'}>已完成</Option>
                      <Option key={'3'} value={'3'}>认证失败</Option>
                      <Option key={'4'} value={'4'}>未上传头像</Option>
                      <Option key={'5'} value={'5'}>未上传医师执业证书5</Option>
                    </Select>
                )}
                </FormItem>
              </fieldset>
              <fieldset style={{ border: 0 }}>
                <legend>医院</legend>
                <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
                  <Col span={24} >
                    {/* <Button type="primary" onClick={showCateModal}>选择医院</Button> */}
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
                  </Col>
                </Row>
                <FormItem {...formItemLayout}
                  label={<span><span style={{ color: 'red', marginRight: '0.25rem' }}>*</span><span>医院编号</span></span>}
                  validateStatus={doctor.hospital === undefined ? 'error' : (doctor.hospital.hospitalCode ? 'success' : 'error')}
                  help="请点击放大镜，选择医生"
                >
                  {getFieldDecorator('hospital.hospitalCode', {
                    initialValue: doctor.hospital === undefined ? '' : doctor.hospital.hospitalCode,
                  })(
                    <Input placeholder="请输入医院名称" addonAfter={<Icon type="search" onClick={showCateModal} style={{ color: '#3e75eb', cursor: 'pointer' }} />} disabled />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="医院名称">
                  {getFieldDecorator('hospital.hospitalName', {
                    initialValue: doctor.hospital === undefined ? '' : doctor.hospital.hospitalName,
                  })(
                    <Input placeholder="请输入医院名称" required disabled />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="医院等级">
                  {getFieldDecorator('hospital.hospitalLevelName', {
                    initialValue: (doctor.hospital === undefined ? '' : doctor.hospital.hospitalLevelName),
                  })(
                    <Input placeholder="请输入医院级别" required disabled />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="顶级医院">
                  {getFieldDecorator('hospital.isTop', {
                    initialValue: doctor.hospital === undefined ? false : doctor.hospital.isTop,
                  })(
                    <RadioGroup disabled>
                      <Radio value>是</Radio>
                      <Radio value={false}>否</Radio>
                    </RadioGroup>
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="医保定点">
                  {getFieldDecorator('hospital.isInsurance', {
                    initialValue: doctor.hospital === undefined ? false : doctor.hospital.isInsurance,
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
                      {/* <Button type="primary" onClick={showDeptLookUpModal}>选择科室</Button> */}
                      <div>
                        <DeptLookupModal
                          width="1000px"
                          onCancel={DeptLookupCancel}
                          onOk={handleDeptLookOk}
                          visible={deptLookUpVisible}
                          onDeptSearch={onDeptSearch}
                          deptLookUpSelection={deptLookUpSelection}
                    // deptLookUpList={hospital.hospitalDepartments}
                          {...deptLookupModalProps}
                        />
                      </div>
                      {/* </Modal> */}
                    </div>
                  </Col>
                </Row>
                {/* <Table
            columns={columns}
            dataSource={doctor.hospitalDepartments}
            rowKey={record => record.code}
          /> */}
                <FormItem {...formItemLayout}
                  label={<span><span style={{ color: 'red', marginRight: '0.25rem' }}>*</span><span>科室编号</span></span>}
                  validateStatus={doctor.dept === undefined ? 'error' : (doctor.dept.deptCode ? 'success' : 'error')}
                  help="请点击放大镜，选择科室！"
                >
                  {getFieldDecorator('dept.deptCode', {
                    initialValue: (doctor.dept === undefined ? '' : doctor.dept.deptCode),
                  })(
                    <Input disabled addonAfter={<Icon type="search" onClick={showDeptLookUpModal} style={{ color: '#3e75eb', cursor: 'pointer' }} />} />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="科室名称">
                  {getFieldDecorator('dept.deptName', {
                    initialValue: (doctor.dept === undefined ? '' : doctor.dept.deptName),
                  })(
                    <Input placeholder="请输入科室名称" required disabled />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="一级科室">
                  {getFieldDecorator('dept.parentDeptName', {
                    initialValue: (doctor.dept === undefined ? '' : doctor.dept.parentDeptName),
                  })(
                    <Input placeholder="请输入一级科室名称" required disabled />
                )}
                </FormItem>
              </fieldset>
              <fieldset style={{ border: 0 }}>
                <legend>个人特色</legend>
                <FormItem {...formItemLayout} label="特需专家">
                  {getFieldDecorator('personal.isSpecialExpert', {
                    rules: [{
                      required: true,

                      message: '必须填写特需专家',
                    }],
                    initialValue: doctor.personal === undefined ? false : doctor.personal.isSpecialExpert,
                  })(
                    <RadioGroup>
                      <Radio value>是</Radio>
                      <Radio value={false}>否</Radio>
                    </RadioGroup>
                )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="从业年限"
                >
                  {getFieldDecorator('personal.workYears', {
                    initialValue: doctor.personal === undefined ? '0' : `${doctor.personal.workYears}`,
                  })(
                    <Select placeholder="--请选择--">
                      <Option value={'0'} key={0}>无从业年限</Option>
                      <Option value={'5'} key={5}>5年以上</Option>
                      <Option value={'10'} key={10}>10年以上</Option>
                      <Option value={'15'} key={15}>15年以上</Option>
                      <Option value={'20'} key={20}>20年以上</Option>
                      <Option value={'30'} key={30}>30年以上</Option>
                      <Option value={'40'} key={40}>40年以上</Option>
                      <Option value={'50'} key={50}>50年以上</Option>
                    </Select>
                )}
                </FormItem>
                {/* <FormItem {...formItemLayout} label="评分">
                  {getFieldDecorator('personal.score', {
                    rules: [{
                      required: true,
                      message: '请填写0.0-5.0之间的数，有且只有一位小数',
                      pattern: /^([5]\.[0])|([0-4]\.([0-9]{1}))$/,
                    }],
                    initialValue: doctor.personal === undefined ? '' : doctor.personal.score,
                  })(
                    <InputNumber step={0.1} />
                )}
                </FormItem> */}
                <FormItem {...formItemLayout} label="擅长疾病">
                  {getFieldDecorator('personal.special', {
                    rules: [{
                      required: true,

                      message: '必须填写擅长疾病',
                    }],
                    initialValue: doctor.personal === undefined ? ['1'] : (doctor.personal.special === null ? ['1'] : (doctor.personal.special.map((val) => {
                      return (
                        val
                      )
                    }))),
                  })(
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                    >
                      <Option key={'1'}>必须填写擅长疾病</Option>
                    </Select>
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="个人简介">
                  {getFieldDecorator('personal.biography', {
                    initialValue: doctor.personal === undefined ? '' : doctor.personal.biography,
                  })(
                    <Input placeholder="请填写个人简介。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="医学成果">
                  {getFieldDecorator('personal.academicAchievements', {
                    initialValue: doctor.personal === undefined ? '' : doctor.personal.academicAchievements,
                  })(
                    <Input placeholder="请填写医学成果。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                )}
                </FormItem>
              </fieldset>
              <fieldset style={{ border: 0 }}>
                <legend>服务收费</legend>
                <Tabs defaultActiveKey="1">
                  {/* <TabPane tab="视频预约" key="1">
                    <Row>
                      <Col span={12} >
                        <PriceTable changePrice={changePrice} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="患者收费">
                          {getFieldDecorator('service[0].timePrice', {
                            initialValue: a[0] === undefined || a[0] === null || doctor.service.length === 0 ? 0 : a[0].timePrice,
                          })(
                            <Input placeholder="请输入价格" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[0].countPrice', {
                            initialValue: a[0] === undefined || a[0] === null || doctor.service.length === 0 ? 0 : a[0].countPrice,

                          })(
                            <Input placeholder="请输入价格" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="医师提成">
                          {getFieldDecorator('service[0].incomeTimePrice', {
                            initialValue: a[0] === undefined || a[0] === null || doctor.service.length === 0 ? 0 : a[0].incomeTimePrice,

                          })(
                            <Input placeholder="按分钟收入" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[0].incomeCountPrice', {
                            initialValue: a[0] === undefined || a[0] === null || doctor.service.length === 0 ? 0 : a[0].incomeCountPrice,

                          })(
                            <Input placeholder="按次收入" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="基层医生">
                          {getFieldDecorator('service[0].incomeThirdTimePrice', {
                            initialValue: a[0] === undefined || a[0] === null ? 0 : a[0].incomeThirdTimePrice,

                          })(
                            <Input placeholder="按分钟收入（第三方）" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout}>
                          {getFieldDecorator('service[0].incomeThirdCountPrice', {
                            initialValue: a[0] === undefined || a[0] === null ? 0 : a[0].incomeThirdCountPrice,

                          })(
                            <Input placeholder="按次收入（第三方）" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="患者收费（活动价）">
                          {getFieldDecorator('service[0].timeActivityPrice', {
                            initialValue: a[0] === undefined || a[0] === null ? 1 : a[0].timeActivityPrice,

                          })(
                            <Input placeholder="按分钟活动单价" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout}>
                          {getFieldDecorator('service[0].countActivityPrice', {
                            initialValue: a[0] === undefined || a[0] === null ? 1 : a[0].countActivityPrice,

                          })(
                            <Input placeholder="按分钟活动单价" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开通">
                          {getFieldDecorator('service[0].canOpen', {
                            valuePropName: 'checked',
                            initialValue: a[0] === undefined || a[0] === null ? false : a[0].canOpen,

                          })(
                            <Checkbox />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开启按次收费">
                          {getFieldDecorator('service[0].isOpenCount', {
                            valuePropName: 'checked',
                            initialValue: a[0] === undefined || a[0] === null ? false : a[0].isOpenCount,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开启按次结算">
                          {getFieldDecorator('service[0].isOpenIncomeCount', {
                            valuePropName: 'checked',
                            initialValue: a[0] === undefined || a[0] === null ? false : a[0].isOpenIncomeCount,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否发送短信">
                          {getFieldDecorator('service[0].isSendSms', {
                            valuePropName: 'checked',
                            initialValue: a[0] === undefined || a[0] === null ? false : a[0].isSendSms,
                          })(
                            <Checkbox />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否开启活动价">
                          {getFieldDecorator('service[0].isOpenActivity', {
                            valuePropName: 'checked',
                            initialValue: a[0] === undefined || a[0] === null ? false : a[0].isOpenActivity,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                    </Row>


                  </TabPane> */}
                  <TabPane tab="义诊" key="2">

                    <Row>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="今日已用次数">
                          {getFieldDecorator('service[1].todayUsedCount', {
                            initialValue: c[0] === undefined || c[0] === null ? 0 : c[0].todayUsedCount,
                          })(
                            <Input placeholder="今日已用次数" disabled />
)}
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="今日总次数">
                          {getFieldDecorator('service[1].todayAllCount', {
                            initialValue: c[0] === undefined || c[0] === null ? 0 : c[0].todayAllCount,
                          })(
                            <Input placeholder="今日总次数" />
)}
                        </FormItem></Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="服务次数限制">
                          {getFieldDecorator('service[1].timesLimit', {
                            initialValue: c[0] === undefined || c[0] === null ? 0 : c[0].timesLimit,
                          })(
                            <Input placeholder="服务次数限制" />
)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} >
                        <PriceTable changePrice={changePrice2} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="患者收费">
                          {getFieldDecorator('service[1].timePrice', {
                            initialValue: c[0] === undefined || c[0] === null ? 0 : c[0].timePrice,
                          })(
                            <Input placeholder="请输入价格" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[1].countPrice', {
                            initialValue: c[0] === undefined || c[0] === null ? 0 : c[0].countPrice,

                          })(
                            <Input placeholder="今日总次数" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="医师提成">
                          {getFieldDecorator('service[1].incomeTimePrice', {
                            initialValue: c[0] === undefined || c[0] === null ? 0 : c[0].incomeTimePrice,

                          })(
                            <Input placeholder="按分钟收入" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[1].incomeCountPrice', {
                            initialValue: c[0] === undefined || c[0] === null ? 0 : c[0].incomeCountPrice,

                          })(
                            <Input placeholder="按次收入" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="基层医生">
                          {getFieldDecorator('service[1].incomeThirdTimePrice', {
                            initialValue: c[0] === undefined || c[0] === null ? 0 : c[0].incomeThirdTimePrice,

                          })(
                            <Input placeholder="按分钟收入（第三方）" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[1].incomeThirdCountPrice', {
                            initialValue: c[0] === undefined || c[0] === null ? 0 : c[0].incomeThirdCountPrice,

                          })(
                            <Input placeholder="按次收入（第三方）" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="患者收费（活动价）">
                          {getFieldDecorator('service[1].timeActivityPrice', {
                            initialValue: c[0] === undefined || c[0] === null ? 0 : c[0].timeActivityPrice,

                          })(
                            <Input placeholder="按分钟活动单价" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[1].countActivityPrice', {
                            initialValue: c[0] === undefined || c[0] === null ? 0 : c[0].countActivityPrice,

                          })(
                            <Input placeholder="按分钟活动单价" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开通">
                          {getFieldDecorator('service[1].canOpen', {
                            valuePropName: 'checked',
                            initialValue: c[0] === undefined || c[0] === null ? false : c[0].canOpen,

                          })(
                            <Checkbox />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开启按次收费">
                          {getFieldDecorator('service[1].isOpenCount', {
                            valuePropName: 'checked',
                            initialValue: c[0] === undefined || c[0] === null ? false : c[0].isOpenCount,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开启按次结算">
                          {getFieldDecorator('service[1].isOpenIncomeCount', {
                            valuePropName: 'checked',
                            initialValue: c[0] === undefined || c[0] === null ? false : c[0].isOpenIncomeCount,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否发送短信">
                          {getFieldDecorator('service[1].isSendSms', {
                            valuePropName: 'checked',
                            initialValue: c[0] === undefined || c[0] === null ? false : c[0].isSendSms,
                          })(
                            <Checkbox />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否开启活动价">
                          {getFieldDecorator('service[1].isOpenActivity', {
                            valuePropName: 'checked',
                            initialValue: c[0] === undefined || c[0] === null ? false : c[0].isOpenActivity,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={1}>
                        <Button onClick={() => sendFcSms(doctor.code, doctor.service[1].isSendSms, getFieldValue('authRemark') || false)} >发送短信 </Button>
                      </Col>
                      <Col span={23}>
                        <FormItem {...formItemLayout} label="义诊短信">
                          {tagList === null ? '' : tagList.map(tag => (
                            <Tag color="blue" key={tag.title} onClick={() => handleTagsChange(tag, getFieldValue('authRemark'))}>{tag.title}</Tag>
                         ))}
                          {getFieldDecorator('authRemark', {
                            initialValue: doctor.authRemark, // setFieldsValue({ authRemark: failureTag }), // setFieldsValue('authRemark'), // failureTag || doctorVerify.authRemark,
                          })(
                            <Input placeholder="请填写义诊通知短信。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} /* disabled={judgeStatus === 2}*/ />
                         )}
                        </FormItem>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab="视频急救" key="3">
                    <Row>
                      <Col span={12} >
                        <PriceTable changePrice={changePrice3} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="患者收费">
                          {getFieldDecorator('service[2].timePrice', {
                            initialValue: b[0] === undefined || b[0] === null ? 0 : b[0].timePrice,
                          })(
                            <Input placeholder="请输入价格" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[2].countPrice', {
                            initialValue: b[0] === undefined || b[0] === null ? 0 : b[0].countPrice,

                          })(
                            <Input placeholder="今日总次数" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="医师提成">
                          {getFieldDecorator('service[2].incomeTimePrice', {
                            initialValue: b[0] === undefined || b[0] === null ? 0 : b[0].incomeTimePrice,

                          })(
                            <Input placeholder="按分钟收入" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[2].incomeCountPrice', {
                            initialValue: b[0] === undefined || b[0] === null ? 0 : b[0].incomeCountPrice,

                          })(
                            <Input placeholder="按次收入" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="基层医生">
                          {getFieldDecorator('service[2].incomeThirdTimePrice', {
                            initialValue: b[0] === undefined || b[0] === null ? 0 : b[0].incomeThirdTimePrice,

                          })(
                            <Input placeholder="按分钟收入（第三方）" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[2].incomeThirdCountPrice', {
                            initialValue: b[0] === undefined || b[0] === null ? 0 : b[0].incomeThirdCountPrice,

                          })(
                            <Input placeholder="按次收入（第三方）" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="患者收费（活动价）">
                          {getFieldDecorator('service[2].timeActivityPrice', {
                            initialValue: b[0] === undefined || b[0] === null ? 0 : b[0].timeActivityPrice,

                          })(
                            <Input placeholder="按分钟活动单价" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[2].countActivityPrice', {
                            initialValue: b[0] === undefined || b[0] === null ? 0 : b[0].countActivityPrice,

                          })(
                            <Input placeholder="按分钟活动单价" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开通">
                          {getFieldDecorator('service[2].canOpen', {
                            valuePropName: 'checked',
                            initialValue: b[0] === undefined || b[0] === null ? false : b[0].canOpen,

                          })(
                            <Checkbox />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开启按次收费">
                          {getFieldDecorator('service[2].isOpenCount', {
                            valuePropName: 'checked',
                            initialValue: b[0] === undefined || b[0] === null ? false : b[0].isOpenCount,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开启按次结算">
                          {getFieldDecorator('service[2].isOpenIncomeCount', {
                            valuePropName: 'checked',
                            initialValue: b[0] === undefined || b[0] === null ? false : b[0].isOpenIncomeCount,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否发送短信">
                          {getFieldDecorator('service[2].isSendSms', {
                            valuePropName: 'checked',
                            initialValue: b[0] === undefined || b[0] === null ? false : b[0].isSendSms,
                          })(
                            <Checkbox />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否开启活动价">
                          {getFieldDecorator('service[2].isOpenActivity', {
                            valuePropName: 'checked',
                            initialValue: b[0] === undefined || b[0] === null ? false : b[0].isOpenActivity,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                    </Row>


                  </TabPane>
                  <TabPane tab="固定会诊" key="4">
                    <Row>
                      <Col span={12} >
                        <PriceTable changePrice={changePrice4} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="患者收费">
                          {getFieldDecorator('service[3].timePrice', {
                            initialValue: d[0] === undefined || d[0] === null ? 0 : d[0].timePrice,
                          })(
                            <Input placeholder="请输入价格" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[3].countPrice', {
                            initialValue: d[0] === undefined || d[0] === null ? 0 : d[0].countPrice,

                          })(
                            <Input placeholder="今日总次数" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="医师提成">
                          {getFieldDecorator('service[3].incomeTimePrice', {
                            initialValue: d[0] === undefined || d[0] === null ? 0 : d[0].incomeTimePrice,

                          })(
                            <Input placeholder="按分钟收入" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[3].incomeCountPrice', {
                            initialValue: d[0] === undefined || d[0] === null ? 0 : d[0].incomeCountPrice,

                          })(
                            <Input placeholder="按次收入" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="基层医生">
                          {getFieldDecorator('service[3].incomeThirdTimePrice', {
                            initialValue: d[0] === undefined || d[0] === null ? 0 : d[0].incomeThirdTimePrice,

                          })(
                            <Input placeholder="按分钟收入（第三方）" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[3].incomeThirdCountPrice', {
                            initialValue: d[0] === undefined || d[0] === null ? 0 : d[0].incomeThirdCountPrice,

                          })(
                            <Input placeholder="按次收入（第三方）" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="患者收费（活动价）">
                          {getFieldDecorator('service[3].timeActivityPrice', {
                            initialValue: d[0] === undefined || d[0] === null ? 0 : d[0].timeActivityPrice,

                          })(
                            <Input placeholder="按分钟活动单价" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[3].countActivityPrice', {
                            initialValue: d[0] === undefined || d[0] === null ? 0 : d[0].countActivityPrice,

                          })(
                            <Input placeholder="按分钟活动单价" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开通">
                          {getFieldDecorator('service[3].canOpen', {
                            valuePropName: 'checked',
                            initialValue: d[0] === undefined || d[0] === null ? false : d[0].canOpen,

                          })(
                            <Checkbox />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开启按次收费">
                          {getFieldDecorator('service[3].isOpenCount', {
                            valuePropName: 'checked',
                            initialValue: d[0] === undefined || d[0] === null ? false : d[0].isOpenCount,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开启按次结算">
                          {getFieldDecorator('service[3].isOpenIncomeCount', {
                            valuePropName: 'checked',
                            initialValue: d[0] === undefined || d[0] === null ? false : d[0].isOpenIncomeCount,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否发送短信">
                          {getFieldDecorator('service[3].isSendSms', {
                            valuePropName: 'checked',
                            initialValue: d[0] === undefined || d[0] === null ? false : d[0].isSendSms,
                          })(
                            <Checkbox />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否开启活动价">
                          {getFieldDecorator('service[3].isOpenActivity', {
                            valuePropName: 'checked',
                            initialValue: d[0] === undefined || d[0] === null ? false : d[0].isOpenActivity,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                    </Row>


                  </TabPane>
                  <TabPane tab="私人医生" key="5">
                    <Row>
                      <Col span={12} >
                        <PriceTable changePrice={changePrice5} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="患者收费">
                          {getFieldDecorator('service[4].timePrice', {
                            initialValue: e[0] === undefined || e[0] === null ? 0 : e[0].timePrice,
                          })(
                            <Input placeholder="请输入价格" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[4].countPrice', {
                            initialValue: e[0] === undefined || e[0] === null ? 0 : e[0].countPrice,

                          })(
                            <Input placeholder="今日总次数" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="医师提成">
                          {getFieldDecorator('service[4].incomeTimePrice', {
                            initialValue: e[0] === undefined || e[0] === null ? 0 : e[0].incomeTimePrice,

                          })(
                            <Input placeholder="按分钟收入" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[4].incomeCountPrice', {
                            initialValue: e[0] === undefined || e[0] === null ? 0 : e[0].incomeCountPrice,

                          })(
                            <Input placeholder="按次收入" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="基层医生">
                          {getFieldDecorator('service[4].incomeThirdTimePrice', {
                            initialValue: e[0] === undefined || e[0] === null ? 0 : e[0].incomeThirdTimePrice,

                          })(
                            <Input placeholder="按分钟收入（第三方）" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[4].incomeThirdCountPrice', {
                            initialValue: e[0] === undefined || e[0] === null ? 0 : e[0].incomeThirdCountPrice,

                          })(
                            <Input placeholder="按次收入（第三方）" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="患者收费（活动价）">
                          {getFieldDecorator('service[4].timeActivityPrice', {
                            initialValue: e[0] === undefined || e[0] === null ? 0 : e[0].timeActivityPrice,

                          })(
                            <Input placeholder="按分钟活动单价" addonAfter="元/分钟" />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} >
                          {getFieldDecorator('service[4].countActivityPrice', {
                            initialValue: e[0] === undefined || e[0] === null ? 0 : e[0].countActivityPrice,

                          })(
                            <Input placeholder="按分钟活动单价" addonAfter="元/次" />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开通">
                          {getFieldDecorator('service[4].canOpen', {
                            valuePropName: 'checked',
                            initialValue: e[0] === undefined || e[0] === null ? false : e[0].canOpen,

                          })(
                            <Checkbox />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开启按次收费">
                          {getFieldDecorator('service[4].isOpenCount', {
                            valuePropName: 'checked',
                            initialValue: e[0] === undefined || e[0] === null ? false : e[0].isOpenCount,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="是否开启按次结算">
                          {getFieldDecorator('service[4].isOpenIncomeCount', {
                            valuePropName: 'checked',
                            initialValue: e[0] === undefined || e[0] === null ? false : e[0].isOpenIncomeCount,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否发送短信">
                          {getFieldDecorator('service[4].isSendSms', {
                            valuePropName: 'checked',
                            initialValue: e[0] === undefined || e[0] === null ? false : e[0].isSendSms,
                          })(
                            <Checkbox />
                             )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否开启活动价">
                          {getFieldDecorator('service[4].isOpenActivity', {
                            valuePropName: 'checked',
                            initialValue: e[0] === undefined || e[0] === null ? false : e[0].isOpenActivity,

                          })(
                            <Checkbox />
                            )}
                        </FormItem></Col>
                    </Row>


                  </TabPane>

                </Tabs>
              </fieldset>
            </div>
          </Col>
        </Row>
      </Form>
    </Spin>

  )
}

DoctorModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(DoctorModal)

