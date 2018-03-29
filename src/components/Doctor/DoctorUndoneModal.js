import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Button, Input, Radio, Select, Modal, Spin, Icon, TreeSelect,
} from 'antd'

import city from '../../utils/city'
import HospitalLookupModal from '../Hospital/HospitalLookupModal.js'
import DeptLookupModal from '../../components/Department/DeptLookupModal'
import { env } from '../../utils/config'
import { doctorBlockStyle } from '../../themes/index.less'
import SingleImagePicker from '../SingleImagePicker/SingleImagePicker.js'


const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group

const DoctorUndoneModal = ({
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
  uploadQualiSuccess,
  uploadQuali2Success,
  uploadTitleSuccess,
  uploadTitleSuccess2,
  uploadTitleSuccess3,
  uploadTitleSuccess4,
  uploadTitleSuccess5,
  currentItem,
  updateImage,
  fileList,
  form: {
    validateFields,
    getFieldDecorator,
    getFieldsValue,
  },
  ...hospitalCateLookupModalProps,
  ...deptLookupModalProps
}) => {
  const doctor = item
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
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
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
      if (data.title.titleAuthStatus === 2) {
        if (data.qualification.status !== '2') {
          Modal.info({
            content: '职业资格的认证状态请选择成功！',
          })
          return false
        }
      }
      data.title.titleImageList = currentItem.title.titleImageList
      data.qualification.images = currentItem.qualification.images
      onOk({
        uid: doctor.code,
        ...data,
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
    paddingTop: '28px',
    fontSize: '50px',
    color: '#A7ADBD',
    textAlign: 'center',
  }
  // let special = doctor.personal === undefined ? '' : (doctor.personal.special === '' ? '' :
  // (
  //  doctor.personal.special.map((val)=>{
  //    return val.slice(1, -1).split(',')
  //  })
  // )
  const statusList = [
    {
      name: '审核通过',
      code: 2,
    },
    {
      name: '审核中',
      code: 1,
    },
  ]
  return (
    <Spin spinning={false}>
      <Form>
        <Row>
          <Col span={24} >
            <Link to="/doctors"><Button type="default" size="large" style={{ marginBottom: '30px' }}>返回</Button></Link>
            <Button type="primary" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={handleOk}>确定</Button>
            {/* <Button type="primary" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={() => handleES(doctor.code)}>同步到ES</Button> */}
            <div className={doctorBlockStyle} >
              <fieldset style={{ border: 0 }}>
                <legend>基本信息</legend>
                <SingleImagePicker Rotate={updateImage} imgSrc={doctor.image} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadIconSuccess} />
                <div style={{ width: '100%', textAlign: 'center', marginTop: '-10px', marginBottom: '60px' }}>医生头像</div>

                {/* <FormItem {...formItemLayout} label="医师编号">
                    {getFieldDecorator('code', {
                      rules: [{
                        required: true,

                        message: '必须填写',
                      }],
                      initialValue: doctor.code || '12',
                    })(
                      <Input disabled={modalType === 'update'} />
                )}
                  </FormItem> */}
                <FormItem {...formItemLayout} label="医师姓名">
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true,

                      message: '必须填写医师姓名',
                    }],
                    initialValue: doctor.name,
                  })(
                    <Input /* disabled={modalType === 'update'} */ />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="身份证号">
                  {getFieldDecorator('idCard', {
                    rules: [{
                      required: true,
                      pattern: '^(\\d{15}$|^\\d{18}$|^\\d{17}(\\d|X|x))$',
                      message: '身份证号15位或者18位',
                    }],
                    initialValue: doctor.idCard || '',
                  })(
                    <Input />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="手机号">
                  {getFieldDecorator('mobile', {
                    rules: [{
                      required: true,

                      message: '必须填写手机号',
                    }],
                    initialValue: doctor.mobile,
                  })(
                    <Input />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="性别">
                  {getFieldDecorator('sex', {
                    rules: [{
                      required: true,

                      message: '必须填写性别',
                    }],
                    initialValue: doctor.sex,
                  })(
                    <RadioGroup>
                      <Radio value={0}>男</Radio>
                      <Radio value={1}>女</Radio>
                    </RadioGroup>
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="生日" extra="格式如下：“20170101”">
                  {getFieldDecorator('birthday', {
                    initialValue: doctor.birthday,
                  })(
                    <Input />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="测试帐号">
                  {getFieldDecorator('isExpert', {
                    initialValue: doctor.isExpert,
                  })(
                    <RadioGroup disabled>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </RadioGroup>
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="真实医生">
                  {getFieldDecorator('isOnline', {
                    initialValue: doctor.isOnline === 1,
                  })(
                    <RadioGroup disabled>
                      <Radio value>是</Radio>
                      <Radio value={false}>否</Radio>
                    </RadioGroup>
                )}
                </FormItem>
              </fieldset>
              <fieldset style={{ border: 0 }}>
                <legend>执业资格</legend>
                <FormItem {...formItemLayout} label="认证状态">
                  {getFieldDecorator('qualification.status', {
                    rules: [
                        { required: true, message: '不能为空' },
                    ],
                    initialValue: doctor.qualification === undefined ? '0' : `${doctor.qualification.status}`,
                  })(
                    <Select placeholder="--请选择--" /* disabled={modalType === 'update'}*/ >
                      <Option key={'0'} value={'0'}>未选择</Option>
                      <Option key={'2'} value={'2'}>已完成</Option>
                    </Select>
                )}
                </FormItem>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="执业证书">
                    <div>
                      <SingleImagePicker infoStyle={infoStyle} imgSrc={doctor.qualification === null || doctor.qualification === undefined || doctor.qualification.images === null ? '' : doctor.qualification.images[0]} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadQualiSuccess} />
                      <SingleImagePicker infoStyle={infoStyle} imgSrc={doctor.qualification === null || doctor.qualification === undefined || doctor.qualification.images === null ? '' : doctor.qualification.images[1]} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadQuali2Success} />
                    </div>
                  </FormItem>
                </Col>
              </fieldset>
              <fieldset style={{ border: 0 }}>
                <legend>职称</legend>
                <FormItem {...formItemLayout} label="职称">
                  {getFieldDecorator('title.titleCode', {
                    rules: [
                        { required: true, message: '不能为空' },
                    ],
                    initialValue: doctor.title === undefined ? 'facdd284648711e7b4097cd30ac3349c' : (doctor.title.titleCode === null ? 'facdd284648711e7b4097cd30ac3349c' : `${doctor.title.titleCode}`),
                  })(
                    <Select placeholder="--请选择--" /* disabled={modalType === 'update'}*/ >
                      <Option key={'facdd284648711e7b4097cd30ac3349c'} value={'facdd284648711e7b4097cd30ac3349c'}>普通医生</Option>
                      <Option key={'e3247b0e45b011e78f87408d5c808e11'} value={'e3247b0e45b011e78f87408d5c808e11'}>主治医生</Option>
                      <Option key={'f2fe264c45b011e78f87408d5c808e11'} value={'f2fe264c45b011e78f87408d5c808e11'}>副主任医师</Option>
                      <Option key={'fefe971f45b011e78f87408d5c808e11'} value={'fefe971f45b011e78f87408d5c808e11'}>主任医师</Option>
                      <Option key={'0de3ffb345b111e78f87408d5c808e11'} value={'0de3ffb345b111e78f87408d5c808e11'}>特需专家</Option>
                    </Select>
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="职称证明">
                  <div>
                    <SingleImagePicker infoStyle={infoStyle} imgSrc={doctor.title === undefined || doctor.title.titleImageList === null ? '' : doctor.title.titleImageList[0]} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadTitleSuccess} />
                    <SingleImagePicker infoStyle={infoStyle} imgSrc={doctor.title === undefined || doctor.title.titleImageList === null ? '' : doctor.title.titleImageList[1]} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadTitleSuccess2} />
                    <SingleImagePicker infoStyle={infoStyle} imgSrc={doctor.title === undefined || doctor.title.titleImageList === null ? '' : doctor.title.titleImageList[2]} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadTitleSuccess3} />
                    <SingleImagePicker infoStyle={infoStyle} imgSrc={doctor.title === undefined || doctor.title.titleImageList === null ? '' : doctor.title.titleImageList[3]} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadTitleSuccess4} />
                    <SingleImagePicker infoStyle={infoStyle} imgSrc={doctor.title === undefined || doctor.title.titleImageList === null ? '' : doctor.title.titleImageList[4]} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadTitleSuccess5} />
                  </div>
                </FormItem>


                <FormItem {...formItemLayout} label="职称审核状态">
                  {getFieldDecorator('title.titleAuthStatus', {
                    rules: [
                        { required: true, message: '不能为空' },
                    ],
                    initialValue: doctor.title === undefined ? '1' : `${doctor.title.titleAuthStatus}`,
                  })(
                    <Select placeholder="--请选择--">
                      <Option key={'0'} value={'0'}>职称未选择</Option>
                      <Option key={'1'} value={'1'}>认证中</Option>
                      <Option key={'2'} value={'2'}>已完成</Option>
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
                  label={<span><span style={{ color: 'red', marginRight: '0.25rem' }}>*</span><span>医院名称</span></span>}
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
                  label={<span><span style={{ color: 'red', marginRight: '0.25rem' }}>*</span><span>科室名称</span></span>}
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
                    rules: [
                        { required: true, message: '不能为空' },
                    ],
                    initialValue: doctor.personal === undefined ? '0' : `${doctor.personal.workYears}`,
                  })(
                    <Select placeholder="--请选择--">
                      <Option value={'0'}>无</Option>
                      <Option value={'5'}>5年以上</Option>
                      <Option value={'10'}>10年以上</Option>
                      <Option value={'15'}>15年以上</Option>
                      <Option value={'20'}>20年以上</Option>
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
                      <Option key={'1'} value={'1'}>必须填写擅长疾病</Option>
                    </Select>
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="个人简介">
                  {getFieldDecorator('personal.biography', {
                    rules: [
                        { required: true, message: '不能为空' },
                    ],
                    initialValue: doctor.personal === undefined ? '' : doctor.personal.biography,
                  })(
                    <Input placeholder="请填写个人简介。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="医学成果">
                  {getFieldDecorator('personal.academicAchievements', {
                    rules: [
                        { required: true, message: '不能为空' },
                    ],
                    initialValue: doctor.personal === undefined ? '' : doctor.personal.academicAchievements,
                  })(
                    <Input placeholder="请填写医学成果。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                )}
                </FormItem>
              </fieldset>
              <fieldset style={{ border: 0 }}>
                <legend>位置</legend>
                <FormItem
                  {...formItemLayout}
                  label="所在区域"
                >
                  {getFieldDecorator('location.areaCode', {
                    rules: [
                  { required: true, message: '不能为空' },
                    ],
                    initialValue: doctor.location === undefined ? '' : doctor.location.areaCode,
                  })(
                    <TreeSelect
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={city}
                      placeholder="请选择医院所在区域"
                    />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="经度">
                  {getFieldDecorator('location.lon', {
                    rules: [{
                      required: true,
                      pattern: /^(0?\d{1,2}(\.)?(\.\d{1,8})?|1[0-7]?\d{1}(\.\d{1,8})?|180(\.0{1,8})?)$/,
                      message: ' 经度范围：0～180.0，最多八位小数',
                    }],
                    initialValue: doctor.location === undefined ? 0 : doctor.location.lon,
                  })(
                    <Input placeholder=" 经度范围：0～+180.0，最多八位小数" />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="纬度">
                  {getFieldDecorator('location.lat', {
                    rules: [{
                      required: true,
                      pattern: /^([0-8]?\d{1}\.\d{0,8}|90\.0{0,8}|[0-8]?\d{1}|90)$/,
                      message: '纬度范围：0～+90.0，最多八位小数',
                    }],
                    initialValue: doctor.location === undefined ? 0 : doctor.location.lat,
                  })(
                    <Input placeholder="纬度范围：0～+90.0，最多八位小数" />
                )}
                </FormItem>
              </fieldset>
              <fieldset style={{ border: 0 }}>
                <legend>资料审核</legend>
                <FormItem
                  {...formItemLayout}
                  label="头像完成状态"
                >
                  {getFieldDecorator('profileCompleteStatus.imageStatus', {
                    initialValue: doctor.profileCompleteStatus === undefined ? 1 : doctor.profileCompleteStatus.imageStatus,
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
                <FormItem
                  {...formItemLayout}
                  label="擅长完成状态"
                >
                  {getFieldDecorator('profileCompleteStatus.specialStatus', {
                    initialValue: doctor.profileCompleteStatus === undefined ? 1 : doctor.profileCompleteStatus.specialStatus,
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
                <FormItem
                  {...formItemLayout}
                  label="简介完成状态"
                >
                  {getFieldDecorator('profileCompleteStatus.biographyStatus', {
                    initialValue: doctor.profileCompleteStatus === undefined ? 1 : doctor.profileCompleteStatus.biographyStatus,
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
                <FormItem
                  {...formItemLayout}
                  label="成果完成状态"
                >
                  {getFieldDecorator('profileCompleteStatus.academicAchievementsStatus', {
                    initialValue: doctor.profileCompleteStatus === undefined ? 1 : doctor.profileCompleteStatus.academicAchievementsStatus,
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
              </fieldset>
            </div>
          </Col>
        </Row>
      </Form>
    </Spin>

  )
}

DoctorUndoneModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(DoctorUndoneModal)

