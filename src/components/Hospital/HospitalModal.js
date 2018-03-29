import React from 'react'
import { Link } from 'dva/router'
import PropTypes from 'prop-types'
import { Modal, Cascader, Popconfirm, Form, Row, Col, Input, Select, Radio, Tabs, Table, Button } from 'antd'
import city2 from '../../utils/newCity'
import SingleImagePicker from '../SingleImagePicker/SingleImagePicker.js'
import HospitalCateLookupModal from '../HospitalCate/HospitalCateLookupModal.js'
import EditableCell from '../../components/EditableCell'
import DeptLookupModal from '../../components/Department/DeptLookupModal'
import HospitalMap from './HospitalMap'
import { env } from '../../utils/config'
import { findKey } from '../../utils/helper.js'

const TabPane = Tabs.TabPane
const { TextArea } = Input
const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group

const HospitalModal = ({
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
  pagination,
  add,
  panes,
  onEditTabs,
  onTabsChange,
  activeKey,
  onCancel,
  onDelete,
  deptList,
  deptPageVisible,
  handleDept,
  handleDeptCancel,
  showDeptModal,
  onDeptEdit,
  handleCateDelete,
  onSpecialChange,
  onRecommendChange,
  onChangeSort,
  DeptLookupCancel,
  handleDeptLookOk,
  deptLookUpSelection,
  showDeptLookUpModal,
  deptLookUpVisible,
  handleDeptDelete,
  rowSelection,
  handleES,
  trueDocList,
  falseDocList,
  type,
  onDeptSearch,
  onCateSearch,
  openMap,
  visiMap,
  closeMap,
  updateImage,
  updateIcon,
  loadES,
  loadOK,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...hospitalCateModalProps,
  ...deptModalProps
}) => {
  const hospital = item
  // let special = []
  // hospital.hospitalDepartments === undefined || hospital.hospitalDepartments === null ? '' : hospital.hospitalDepartments.map((val) => {
  //   special.push(val.code)
  //   return true
  // })
  let areaName = (hospital.townName === undefined ? [] : hospital.townName.split(' '))
  let name1
  if (areaName.length !== 0) {
    name1 = findKey(areaName, city2)
  }
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return false
      }
      const data = { ...getFieldsValue() }
      data.areaCode = data.areaCode[2]
      // const typeCode = data.typeCode
      // const deptIds = data.deptIds
      // let dept = ''
      // let typeHospital = ''
      // deptIds.length === 0 ? dept = ',' :
      // deptIds.map((val) => {
      //   dept = `${dept + val},`
      //   return dept
      // })
      // typeCode.length === 0 ? typeHospital = ',' :
      // typeCode.map((val) => {
      //   typeHospital = `${typeHospital + val},`
      //   return typeHospital
      // })
      // data.deptIds = dept
      // data.typeCode = typeHospital
      // hospital.hospitalDepartments.map((val) => {
      //   val.isSpecial === undefined ? checkSpecial === undefined : checkSpecial
      //   if (checkSpecial === undefined) {
      //     Modal.info({
      //       content: 'a',
      //     })
      //   }
      //   return true
      // })
      // if (checkSpecial !== undefined) {
      onOk({
        code: hospital.code,
        hospitalDepartments: hospital.hospitalDepartments,
        hospitalCategories: hospital.hospitalCategories,
        ...data,
      })
    })
  }

  function onSelectHosptitalSuccess ({ lat, lng, address, pname, cityname, adname }) {
    setFieldsValue({
      lat: lat,
      lon: lng,
      address: address,
      areaCode: findKey([pname, cityname, adname], city2),

    })
  }
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
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
  const columns = [
    {
      title: '科室编号',
      dataIndex: 'code',
      key: 'code',
      className: 'column-center',
      render: (text, record) => {
        const code = record.code
        return (
          code
        )
      },
    },
    {
      title: '科室名称',
      dataIndex: 'name',
      key: 'name',
      className: 'column-center',
      render: (text, record) => {
        const name = record.name
        return (
          name
        )
      },
    },
    {
      title: '一级科室',
      dataIndex: 'parentName',
      key: 'parentName',
      className: 'column-center',
      render: (text, record) => {
        const parentName = record.parentName
        return (
          parentName
        )
      },
    },
    {
      title: '是否标准科室',
      dataIndex: 'isStandard',
      key: 'isStandard',
      className: 'column-center',
      render: (text, record) => {
        const isStandard = record.isStandard
        return (
          isStandard === 0 ? '否' : '是'
        )
      },
    },
    {
      title: '是否医院特色(必填)',
      dataIndex: 'isSepcial',
      key: 'isSepcial',
      className: 'column-center',
      render: (text, record) => {
        const isSepcial = record.isSpecial
       // const { code } = record.code
        return (
          <RadioGroup defaultValue={isSepcial} onChange={(e) => onSpecialChange(record, e)} required>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </RadioGroup>
        )
      },
    },
    {
      title: '操作',
      key: 'operation',
      width: 200,
      render: (text, record) => {
        const { code } = record
        return (
          <span>
            {/* <a onClick={() => onDeptEdit(code)} >编辑</a>
            &nbsp;&nbsp; */}
            <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => handleDeptDelete(code)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        )
      },
    },
  ]
  // const columnsDoctor = [
  //   {
  //     title: '医生姓名',
  //     dataIndex: 'name',
  //     key: 'name',
  //     width: '200px',
  //     className: 'column-center',
  //     render: (text, record) => {
  //       const name = record.name
  //       return (
  //         <p> {name}</p>
  //       )
  //     },
  //   },
  //   {
  //     title: '职称',
  //     dataIndex: 'name',
  //     key: 'name2',
  //     width: '200px',
  //     className: 'column-center',
  //     render: (text, record) => {
  //       const name = record.name
  //       return (
  //         <p> {name}</p>
  //       )
  //     },
  //   },
  //   {
  //     title: '是否真实医生',
  //     dataIndex: 'name',
  //     key: 'name3',
  //     width: '200px',
  //     className: 'column-center',
  //     render: (text, record) => {
  //       const name = record.name
  //       return (
  //         <p> {name}</p>
  //       )
  //     },
  //   },
  // ]
  const trueDocCol = [
    {
      title: '医生姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        const nickName = record.name || '未填写'
        return (
          nickName
        )
      },
    },
    {
      title: '职称',
      dataIndex: 'titleName',
      key: 'titleName',
      render: (text, record) => {
        const titleName = record.titleName || '未填写'
        return (
          titleName
        )
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      className: 'column-right',
      render: (text, record) => {
        const mobile = record.mobile || '未填写'
        return (
          mobile
        )
      },
    },
    {
      title: '测试账号',
      dataIndex: 'isExpert',
      key: 'isExpert',
      className: 'column-center',
      render: (text, record) => {
        return (
           record.isExpert === 1 ? '是' : '否'
        )
      },
    },
  ]
  const hospitalCateColumns = [
    {
      title: '医院分类编号',
      dataIndex: 'code',
      key: 'code',
      className: 'column-center',
      render: (text, record) => {
        const code = record.code
        return (
           code
        )
      },
    },
    {
      title: '医院分类名称',
      dataIndex: 'name',
      key: 'name',
      className: 'column-center',
      render: (text, record) => {
        const name = record.name
        return (
        name
        )
      },
    },
    {
      title: '是否热门分类',
      dataIndex: 'isHot',
      key: 'isHot',
      className: 'column-center',
      render: (text, record) => {
        const isHot = record.isHot
        return (
         isHot === 0 ? '否' : '是'
        )
      },
    },
    {
      title: '是否推荐至首页（必填）',
      dataIndex: 'isRecommend',
      key: 'isRecommend',
      className: 'column-center',
      render: (text, record) => {
        const isRecommend = record.isRecommend
       // const { code } = record.code
        return (
          <RadioGroup defaultValue={isRecommend} onChange={(e) => onRecommendChange(record, e)} required>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </RadioGroup>
        )
      },
    },
    {
      title: '排序（必填）',
      dataIndex: 'hospitalSort',
      key: 'hospitalSort',
      className: 'column-center',
      render: (text, record) => {
        const hospitalSort = record.hospitalSort
        return (
          <EditableCell
            value={hospitalSort}
            onChange={(sort) => { onChangeSort(record, sort) }}
          />
        )
      },
    },
    {
      title: '操作',
      key: 'operation',
      width: 200,
      render: (text, record) => {
        const { code } = record
        return (
          <span>
            {/* <a onClick={() => onDeptEdit(code)} >编辑</a>
            &nbsp;&nbsp; */}
            <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => handleCateDelete(code)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        )
      },
    },
  ]
  const falseDocCol = [
    {
      title: '医生姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        const nickName = record.name || '未填写'
        return (
            nickName
        )
      },
    },
    {
      title: '医生级别',
      dataIndex: 'titleName',
      key: 'titleName',
      render: (text, record) => {
        const levelName = record.titleName || '未填写'
        return (
            levelName
        )
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      className: 'column-right',
      render: (text, record) => {
        const phone = record.mobile || '未填写'
        return (
            phone
        )
      },
    },
    {
      title: '科室名称',
      dataIndex: 'deptName',
      key: 'deptName',
      render: (text, record) => {
        const deptName = record.deptName || '未填写'
        return (
            deptName
        )
      },
    },
    {
      title: '是否专家',
      dataIndex: 'isExpert',
      key: 'isExpert',
      className: 'column-center',
      render: (text, record) => {
        return (
             record.isExpert === 1 ? '是' : '否'
        )
      },
    },
    // {
    //   title: '操作',
    //   key: 'operation',
    //   render: (text, record) => {
    //     const { code } = record
    //     return (
    //       <span>
    //         {/* <Link to={`/doctors/editFake/${code}`} ><a onClick={() => onFakeQuery(code)} >详情</a></Link> */}
    //         <a onClick={() => onFakeQuery(code)} >详情</a>
    //           &nbsp;&nbsp;
    //         {/* <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDelete(code)}>
    //           <a>删除</a>
    //         </Popconfirm> */}
    //       </span>
    //     )
    //   },
    // }
  ]
  const hospitalCateLookupModalProps = {
    ...hospitalCateModalProps,
  }
  const deptLookupModalProps = {
    ...deptModalProps,
  }
  const infoStyle = {
    paddingTop: '28px',
    fontSize: '50px',
    color: '#A7ADBD',
    textAlign: 'center',
  }
  return (

    <Form>
      <Row>
        <Col span={24}>
          <FormItem >
            <Button loading={loadOK} type="primary" size="default" onClick={handleOk}>确定</Button>
            <Button loading={loadES} type="primary" size="default" onClick={() => handleES(hospital.code)} style={{ marginLeft: '30px' }} disabled={type === 'create'}>同步至ES</Button>
            <Link to="/hospitals"><Button type="default" style={{ marginLeft: '30px' }} onClick={onCancel}>返回</Button></Link>
          </FormItem>
        </Col>
      </Row>
      <Tabs type="line"
        // onEdit={(targetKey, action) => onEditTabs(targetKey, action)}
        hideAdd
        onChange={onTabsChange}
        // activeKey={activeKey}
        tabPosition={'left'}
      >
        <TabPane tab="基本信息" key="1" closable={false}>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label="医院Icon">
                <SingleImagePicker Rotate={updateIcon} infoStyle={infoStyle} imgSrc={hospital.hospitalIcon} keyPrefix={`icon/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadIconSuccess} />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="医院图片">
                <SingleImagePicker Rotate={updateImage} infoStyle={infoStyle} imgSrc={hospital.hospitalPic} keyPrefix={`pic/${env}`} uploadToken={uploadToken} style={imagePickerStyle} imageStyle={imageStyle} fileStyle={fileStyle} sip={sip} maxSize="5M" onComplete={uploadImageSuccess} />
              </FormItem>
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
                  <Input placeholder="请输入医院名称" />
                )}
              </FormItem>
            </Col>

            {/* <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="特色科室"
              >
                {getFieldDecorator('deptIds', {
                  rules: [
                 // { required: true, message: '请选择特色科室，可多选！', type: 'array' },

                  ],
                  initialValue: special,
                })(
                  <Select
                    mode="multiple"
                    placeholder="请选择特色科室，可多选！"
                  >
                    {
                        hospitalSpecial.map((val) => {
                          return (
                            <Option key={val.code} value={val.code}>{val.name}&nbsp;</Option>
                          )
                        })}
                  </Select>
                )}
              </FormItem>
            </Col> */}
            {/* <Col span={24}>
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
                  initialValue: hospital.hospitalTypes,
                })(
                  <Select placeholder="--请选择--" mode="multiple">
                    {
                        hospitalCategories.map((val) => {
                          return (
                            <Option key={val.categoryCode} value={val.categoryCode}>{val.categoryName}</Option>
                          )
                        })}
                  </Select>
                )}
              </FormItem>
            </Col> */}
            {/* <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="所在区域"
                hasFeedback
              >
                {getFieldDecorator('areaCode1', {
                  rules: [
                  { required: true, message: '不能为空' },
                  ],
                  initialValue: ['150524'],
                })(
                  <Cascader options={city} placeholder="Please select" />
                )}
              </FormItem>
            </Col> */}
            {/* <Col span={24}>
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
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={city}
                    placeholder="请选择医院所在区域"
                  />
                )}
              </FormItem>
            </Col> */}

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
                  initialValue: name1,
                })(
                  <Cascader options={city2} />
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
            <div>
              <Col offset={3} span={9}>
                <FormItem {...formItemLayout} hasFeedback label="经度">
                  {getFieldDecorator('lon', {
                    rules: [{
                      required: true,
                      pattern: /^(0?\d{1,2}(\.)?(\.\d{1,8})?|1[0-7]?\d{1}(\.\d{1,8})?|180(\.0{1,8})?)$/,
                      message: ' 经度范围：0～180.0，最多八位小数',
                    }],
                    initialValue: hospital.lon,
                  })(
                    <Input
                      placeholder=" 经度范围：0～+180.0，最多八位小数" disabled
                    />
                )}
                  {/* <Button style={{ marginTop: '0.5rem ' }} onClick={openMap}>查找经纬</Button> */}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} hasFeedback label="纬度">
                  {getFieldDecorator('lat', {
                    rules: [{
                      required: true,
                      pattern: /^([0-8]?\d{1}\.\d{0,8}|90\.0{0,8}|[0-8]?\d{1}|90)$/,
                      message: '纬度范围：0～+90.0，最多八位小数',
                    }],
                    initialValue: hospital.lat,
                  })(
                    <Input placeholder="纬度范围：0～+90.0，最多八位小数" disabled />
                )}
                </FormItem>
              </Col>
              <Button onClick={openMap} icon="environment" />
            </div>

            <Modal maskClosable={false} onOk={closeMap} title="地图" visible={visiMap} onCancel={closeMap} bodyStyle={{ width: '100%', height: '600px', overflow: 'auto' }}>
              <HospitalMap
                hospitalName={hospital.name ? hospital.name : ''}
                onSelectHosptital={onSelectHosptitalSuccess}
              />
            </Modal>
            {/* <Col span={24}>
              <FormItem {...formItemLayout} hasFeedback label="医院坐标纬度">
                {getFieldDecorator('lat', {
                  rules: [{
                    required: true,
                    pattern: /^([0-8]?\d{1}\.\d{0,8}|90\.0{0,8}|[0-8]?\d{1}|90)$/,
                    message: '纬度范围：0～+90.0，最多八位小数',
                  }],
                  initialValue: hospital.lat,
                })(
                  <Input placeholder="纬度范围：0～+90.0，最多八位小数" />
                )}
              </FormItem>
            </Col> */}

            {/* <Col span={24}>
              <FormItem {...formItemLayout} hasFeedback label="医院评分">
                {getFieldDecorator('score', {
                  rules: [{
                    pattern: /^[0-9]{1}$/,
                    required: true,
                    message: '最低分0分，最高分9分，且不可为小数！',
                  }],
                  initialValue: hospital.score,
                })(
                  <InputNumber min={0} max={9} />
                )}
              </FormItem>
            </Col> */}

            {/* <Col span={24}>
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
            </Col> */}
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="顶级医院"
              >
                {getFieldDecorator('isTop', {
                  rules: [{
                    required: true,
                    message: '不能为空',
                  }],
                  initialValue: hospital.isTop,
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
              <FormItem
                {...formItemLayout}
                label="是否开通义诊"
              >
                {getFieldDecorator('isOpenTms', {
                  initialValue: hospital.isOpenTms,
                })(
                  <RadioGroup>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <Col span={24}>
                <FormItem
                  {...formItemLayout}
                  label="医院等级"
                >
                  {getFieldDecorator('levelCode', {
                    rules: [],
                    initialValue: hospital.levelCode === undefined || hospital.levelCode === null ? '' : `${hospital.levelCode}`,
                  })(
                    <Select placeholder="--请选择--" style={{ width: 250 }} allowClear>
                      {
                    hospitalRank.map((val) => {
                      return (
                        <Option key={val.hospitalLevelName} value={`${val.hospitalLevelCode}`}>{val.hospitalLevelName}</Option>
                      )
                    })
                  }
                    </Select>
                )}
                  <span style={{ marginLeft: '1.5rem' }}><a href="https://www.hqms.org.cn/usp/roster/index.jsp" target="blank">验证网站</a></span>
                  <span style={{ marginLeft: '1.5rem' }}><a href="http://zgcx.nhfpc.gov.cn:9090" target="blank">验证网站2</a></span>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem {...formItemLayout} hasFeedback label="联系电话" help="请拨打电话，核实号码真实性">
                  {getFieldDecorator('phone', {
                    rules: [{

                      pattern: /^[0-9]*(-)?[0-9]*$/,
                      message: '请填写正确的电话号码',
                    }],
                    initialValue: hospital.phone,
                  })(
                    <Input placeholder="请输入电话号码" />
                )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem {...formItemLayout} hasFeedback label="医院简介（备注）">
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
            </Col>
            <Col span={24}>
              {/* <FormItem
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
              </FormItem> */}
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="科室列表" key="2" closable={false}>
          {/* <Row>
            <Col span={24} >
              <div>
                <Link to="/hospitals"><Button type="primary" style={{ marginLeft: '55px', marginRight: '30px' }}>返回</Button></Link>

                <Button type="primary" onClick={showDeptLookUpModal}>导入科室</Button>
              </div>
            </Col>
          </Row> */}
          <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>

            <Col span={24} >
              <div>
                <Button type="primary" onClick={showDeptLookUpModal}>导入科室</Button>
                {/* <Modal
                  title="科室列表"
                  visible={deptPageVisible}
                  onOk={handleDept1}
                  onCancel={handleDeptCancel}
                  width="1000px"
                > */}
                <div>
                  {/* <Table
                      columns={columns}
                      dataSource={deptList}
                      rowSelection={rowSelection}
                    /> */}
                  <DeptLookupModal
                    width="1000px"
                    onCancel={DeptLookupCancel}
                    onOk={handleDeptLookOk}
                    visible={deptLookUpVisible}
                    title="科室分类参照页"
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
          <Table
            columns={columns}
            dataSource={hospital.hospitalDepartments}
            rowKey={record => record.code}
              // onRowClick={(record) => add(record)}
           // onRowClick={(record) => info(record)}
          />

        </TabPane>
        <TabPane tab="医院分类列表" key="3" closable={false}>
          <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
            <Col span={24} >
              <Button type="primary" onClick={showDeptModal}>导入医院分类</Button>
              {/* <div>
                <Button type="primary" onClick={showDeptModal}>导入科室</Button>
                <Modal
                  title="科室列表1"
                  visible={deptPageVisible}
                  onOk={handleDept1}
                  onCancel={handleDeptCancel}
                  width="1000px"
                > */}
              <div>
                <HospitalCateLookupModal
                  onCancel={handleDeptCancel}
                  visible={deptPageVisible}
                  width="1000px"
                  title="医院分类参照页"
                  onCateSearch={onCateSearch}
                  rowSelection={rowSelection}
                  {...hospitalCateLookupModalProps}
                />
              </div>
              {/* </Modal>
              </div> */}
            </Col>
          </Row>
          <Table
            columns={hospitalCateColumns}
            dataSource={hospital.hospitalCategories}
            rowKey={record => record.code}
              // onRowClick={(record) => add(record)}
             // onRowClick={(record) => info(record)}
          />

        </TabPane>
        {
          type === 'create' ? '' :

          <TabPane tab="在线医生列表" key="4" closable={false}>
            <Table
              columns={trueDocCol}
              dataSource={trueDocList}
              rowKey={record => record.code}
              // pagination={pagination}
            />
          </TabPane>
            // <TabPane tab="离线医生列表" key="5" closable={false}>
            //     <Table
            //       columns={falseDocCol}
            //       dataSource={falseDocList}
            //       rowKey={record => record.code}
            //     />
            // </TabPane>

        }
        {
          type === 'create' ? '' :
          <TabPane tab="离线医生列表" key="5" closable={false}>
            <Table
              columns={falseDocCol}
              dataSource={falseDocList}
              rowKey={record => record.code}
              // pagination={pagination}
            />
          </TabPane>

        }

        {/* {
          panes.map((pane) => <TabPane key={pane.key} tab={pane.title} closable>{pane.content}</TabPane>)
        } */}
      </Tabs>

    </Form>

  )
}

HospitalModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(HospitalModal)

