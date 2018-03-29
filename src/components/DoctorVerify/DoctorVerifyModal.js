import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import {
  Form, Row, Col, Input,
  Select, Button, Checkbox, Tag, Modal, Icon,
} from 'antd'
// import ThumbPic from '../ThumbPic/ThumbPic'
import RotateImage from './RotateImage'
import DeptLookupModal from '../../components/Department/DeptLookupModal'
import HospitalLookupModal from '../Hospital/HospitalLookupModal.js'
import { formatMsg } from '../../utils/helper'


const Option = Select.Option
const FormItem = Form.Item

const statusList = [
  {
    name: '认证通过',
    code: 2,
  },
  {
    name: '认证失败',
    code: 3,
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

const DoctorVerifyModal = ({
  item = {},
  onOk,
  judgeStatus,
  handleChange,
  hospitalName,
  parentDept,
  deptName,
  deptNameDisable,
  searchHospitalList,
  fetching,
  changeDeptName,
  hospitalList,
  secondDeptNameDisable,
  onChangeDeptName,
  authRemarkWarning,
  onChangeHospitalName,
  onChangeHospital,
  onChangeSecondDeptName,
  hospitalNameDisabled,
  searchDeptName,
  deptList,
  fetchingDeptName,
  hospitalValue,
  deptValue,
  editVcPrice,
  vcPriceDisable,
  vcPriceList,
  getNewName,
  showDeptLookUpModal,
  DeptLookupCancel,
  showCateModal,
  handleDeptCancel,
  deptPageVisible,
  rowSelection,
  handleDeptLookOk,
  deptLookUpVisible,
  deptLookUpSelection,
  // handleTagsChange,
  failureTag,
  tagList,
  editStatus,
  handleES,
  changeTag,
  // handleChange1,
  qualifVisi,
  qualifUNVisi,
  qualifPic,
  qualifVisi2,
  qualifUNVisi2,
  qualifPic2,
  failReason,
  isOK,
  isES,
  onDeptSearch,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
    setFieldsValue,
  },
  ...hospitalCateLookupModalProps,
  ...deptLookupModalProps
}) => {
  const doctorVerify = item
  // let data1 = { ...getFieldsValue() }
 // let special = (doctorVerify.specialization === null || doctorVerify.specialization === undefined) ? '' : doctorVerify.specialization.slice(1, -1).split(',')
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      let { physicianAuthStatus } = data
      // if (doctorVerify.physicianAuthStatus === 2 || doctorVerify.physicianAuthStatus === '2') {
      //   if (!doctorVerify.hospitalCode) {
      //     Modal.info({
      //       content: '医院code为空，请重新选择医院！',
      //     })
      //     return false
      //   }
      //   if (!doctorVerify.deptCode) {
      //     Modal.info({
      //       content: '请选择科室！',
      //     })
      //     return false
      //   }
      // }
      // if (!doctorVerify.deptParentCode) {
      //   Modal.info({
      //     content: '该科室为非标准科室，请去添加科室或者选择非标准科室！',
      //   })
      //   return false
      // }
      if (data.isSendSms) {
        if (data.authRemark === '' || data.authRemark === null) {
          Modal.info({
            content: '选择发送短信时，审核备注不能为空',
          })
          return false
        }
      }
      if (physicianAuthStatus === 2 || physicianAuthStatus === '2' || physicianAuthStatus === '认证成功') {
        physicianAuthStatus = true
        Modal.info({
          content: '您选择审核成功，此状态不可逆',
        })
      } else {
        if (data.authRemark === null || data.authRemark === '' || data.authRemark === undefined) {
          Modal.info({
            content: '审核备注不能为空',
          })
          return false
        }
        physicianAuthStatus = false
      }

      onOk({
        code: doctorVerify.code,
        enable: physicianAuthStatus,
        authRemark: data.authRemark,
        hospitalCode: doctorVerify.hospitalCode,
        hospitalName: doctorVerify.hospitalName,
        // parentDeptCode: data.deptParentName === null ? doctorVerify.parentDeptCode : data.deptParentName,
        deptCode: doctorVerify.deptCode,
        deptName: doctorVerify.deptName,
        // isExpert: data.isExpert,
        isSendSms: data.isSendSms === undefined ? false : data.isSendSms,
        // vcPrice: data.vcPrice.key,
      })
    })
  }
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }
  function handleTagsChange (tag, b) {
    if (b === null || b === undefined) { b = '' }
    let mess = formatMsg(tag.content, [`${doctorVerify.name}`, `${doctorVerify.mobile}`, '010-64010-566'])
    tag.content = mess !== false ? mess : tag.content
    setFieldsValue({ authRemark: `${b}${tag.content}  ` })
  }
  function changeAuth (e) {
    console.log(e)
    setFieldsValue({ authRemark: doctorVerify.authRemark })
  }
  return (
    <Form>
      <Row>
        <Col span={24}>
          <Link to="/physician-auths"><Button type="default" size="large" style={{ marginLeft: '30px' }}>返回</Button></Link>
          <Button disabled={!(doctorVerify.physicianAuthStatus === 1 || doctorVerify.physicianAuthStatus === '1')} loading={isOK} type="primary" size="large" style={{ marginLeft: '30px' }} onClick={handleOk} /* disabled={!editStatus}*/ >确定</Button>
          {/* <Button disabled={!(doctorVerify.physicianAuthStatus === 1 || doctorVerify.physicianAuthStatus === '1')} loading={isES} type="primary" size="large" style={{ marginLeft: '30px' }} onClick={() => handleES(doctorVerify.code)} >同步至ES</Button> */}
        </Col>
        <Col span={24} >
          <fieldset style={{ border: 0 }}>
            <legend>基本信息</legend>
            <FormItem {...formItemLayout} label="医师姓名">
              <div><span>{doctorVerify.name}</span></div>
            </FormItem>
            <FormItem {...formItemLayout} label="手机号">
              <div><span>{doctorVerify.mobile}</span></div>
            </FormItem>
            <FormItem {...formItemLayout} label="身份证号">
              <div><span>{doctorVerify.idCard}</span></div>
            </FormItem>
            <FormItem {...formItemLayout} label="擅长疾病">
              <div>
                <div>
                  {
                  doctorVerify.specialization === null || doctorVerify.specialization === undefined ? '' :
                  doctorVerify.specialization.map((val) => {
                    let specialName = val
                    return `${specialName}    `
                  })

                }</div>
              </div>
            </FormItem>
          </fieldset>

          {/* <div style={{ marginBottom: 20 }}><div style={{ textAlign: 'right', width: 60, display: 'inline-block' }}>是否测试：</div><span>{
                  doctorVerify.isExpert === 1 || doctorVerify.isExpert === '1' ? '否' : '是'}</span></div> */}
        </Col>
        <fieldset style={{ border: 0 }}>
          <legend style={{ marginLeft: 45 }}>审核信息</legend>
          <FormItem {...formItemLayout} label="执业证书">
            <div><a href="http://zgcx.nhfpc.gov.cn/doctorsearch.aspx" target="blank" >验证网站</a></div>
            {
              (doctorVerify.qualificationImages === null || doctorVerify.qualificationImages === undefined) ? '' :
              doctorVerify.qualificationImages.map((val, index) => {
                return (
                  <RotateImage key={index} src={val} />

                )
              })
            }
            {/* <div>
              <RotateImage src={(doctorVerify.qualificationImages === null || doctorVerify.qualificationImages === undefined) ? '' : doctorVerify.qualificationImages[0]} />
            </div>
            <div>
              <RotateImage src={(doctorVerify.qualificationImages === null || doctorVerify.qualificationImages === undefined) ? '' : doctorVerify.qualificationImages[1]} />
            </div>
            <div>
              <RotateImage src={(doctorVerify.qualificationImages === null || doctorVerify.qualificationImages === undefined) ? '' : doctorVerify.qualificationImages[2]} />
            </div> */}
          </FormItem>
          <FormItem {...formItemLayout} label="头像">
            <div>
              <RotateImage src={(doctorVerify.image === null || doctorVerify.image === undefined) ? '' : doctorVerify.image} />
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<span><span style={{ color: 'red', marginRight: '0.25rem' }}>*</span><span>医院名称</span></span>}
            help="请点击放大镜，选择医院"
          >
            <div>
              {getFieldDecorator('hospitalName', {
                initialValue: doctorVerify.hospitalName,
              })(
                <Input disabled addonAfter={<Icon type="search" onClick={showCateModal} style={{ color: '#3e75eb', cursor: 'pointer' }} />} />
                  )}
              {/* <Button type="primary" icon="search" onClick={showCateModal} style={{ marginRight: '20px', marginTop: '10px' }} /> */}
              <div>

                <div>
                  <HospitalLookupModal
                    onCancel={handleDeptCancel}
                    visible={deptPageVisible}
                    width="1000px"
                    rowSelection={rowSelection}
                    {...hospitalCateLookupModalProps}
                  />
                </div>
              </div>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="一级科室">
            {getFieldDecorator('deptParentName', {
                // rules: [
                //   { required: true, message: '请选择一级科室' },

                // ],
              initialValue: doctorVerify.deptParentName,
            })(
              <Input disabled />
                )}
          </FormItem>
          {/* <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="一级科室"
              >
                <div>
                  {getFieldDecorator('deptParentName', {
                    rules: [],
                    initialValue: doctorVerify.deptParentCode,
                  })(
                    <Select placeholder="--请选择--" disabled={deptNameDisable} style={{ width: 206 }}>
                      {parentDept.map((val) => {
                        return (
                          <Option key={val.code} value={val.code}>{val.name}</Option>
                        )
                      })}
                    </Select>
                    )}
                  <Button onClick={changeDeptName} style={{ marginLeft: 24 }}>编辑</Button>
                  <div><a href="http://www.baidu.com" target="blank">验证网站</a></div>
                </div>
              </FormItem>
            </Col> */}
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label={<span><span style={{ color: 'red', marginRight: '0.25rem' }}>*</span><span>科室名称</span></span>}
              help="请点击放大镜，选择科室"
            >
              <div>
                {getFieldDecorator('deptName', {
                  initialValue: doctorVerify.deptName,
                })(
                  <Input disabled addonAfter={<Icon type="search" onClick={showDeptLookUpModal} style={{ color: '#3e75eb', cursor: 'pointer' }} />} />
                  )}
                {/* <Button icon="search" onClick={showDeptLookUpModal} style={{ marginRight: '20px', marginTop: '10px' }} type="primary" /> */}
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
              </div>
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="短信通知"
            >
              {getFieldDecorator('isSendSms', {
                valuePropName: 'checked',
                initialValue: false || doctorVerify.isSendSms,
              })(
                <Checkbox>是否发送短信通知（选此项必填备注）</Checkbox>
                )}
            </FormItem>
          </Col>
          {/* <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="视频咨询单价"
              >
                {getFieldDecorator('vcPrice', {
                  rules: [
                  { required: true, message: '请选择单价' },

                  ],
                  initialValue: doctorVerify.vcPrice ? { key: `${doctorVerify.vcPrice}` } : { key: '59' },
                })(
                  <Select
                    placeholder="--请选择--"
                    mode="combobox"
                    labelInValue
                    filterOption={false}
                    optionLabelProp="children"
                    style={{ width: 206 }}
                    disabled={vcPriceDisable}
                  >
                    {
                    pricesList.map((val) => {  // vcPriceList
                      return (
                        <Option key={`${val.price}`}>{val.label}</Option>
                      )
                    })
                  }
                  </Select>
                    )}
                <Button onClick={editVcPrice} style={{ marginLeft: 24 }} size={'default'}>编辑</Button>
              </FormItem>
            </Col> */}
          {/* <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="是否测试"
              >
                {getFieldDecorator('isExpert', {
                  initialValue: doctorVerify.isExpert,
                })(
                  <RadioGroup>
                    <Radio value={0}>是</Radio>
                    <Radio value={1}>否</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col> */}
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="审核状态"
            >
              {getFieldDecorator('physicianAuthStatus', {
                rules: [
                  { required: true, message: '请选择审核状态' },

                ],
                initialValue: doctorVerify.physicianAuthStatus === 2 || doctorVerify.physicianAuthStatus === '2' ? '2' : '3',
              })(
                <Select placeholder="--请选择--" onChange={handleChange} disabled={!(doctorVerify.physicianAuthStatus === 1 || doctorVerify.physicianAuthStatus === '1')} /* disabled={!editStatus}*/ >
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
            <FormItem {...formItemLayout} label="审核意见" >
              {tagList === null ? '' : tagList.map(tag => (
                <Tag color="blue" key={tag.title} onClick={() => handleTagsChange(tag, getFieldValue('authRemark'))}>{tag.title}</Tag>
            ))}
              {getFieldDecorator('authRemark', {
                onChange: changeAuth,
                  // normalize: failureTag,
                initialValue: doctorVerify.authRemark, // setFieldsValue({ authRemark: failureTag }), // setFieldsValue('authRemark'), // failureTag || doctorVerify.authRemark,
              })(
                <Input placeholder="请详细填写失败原因。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} /* disabled={judgeStatus === 2}*/ />
            )}
            </FormItem>
          </Col>
        </fieldset>
      </Row>
    </Form>

  )
}

DoctorVerifyModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(DoctorVerifyModal)
