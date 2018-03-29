import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Form, Row, Col, Select, Card, Button } from 'antd'
import { labelStyle, blockStyle, jianbian } from '../../themes/index.less'


const Option = Select.Option
const FormItem = Form.Item


const HospitalModal = ({
  item = {},
  onOk,
  // judgeStatus,
  handleChange,
  // hospitalRank,
  // hospitalCategories,
  // hospitalLevels,
  // hosipitalRegion,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  const hospital = item

  const statusList = [
    {
      name: '认证失败',
      code: 3,
    },
    {
      name: '认证成功',
      code: 2,
    },

  ]

  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      let { verify } = data
      if (verify === '2' || verify === '认证成功') {
        verify = true
      } else {
        verify = false
      }
      onOk({
        code: hospital.code,
        enable: verify,
      })
    })
  }

  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 11 },
  }


  return (
    <Form>
      <Row>
        <Col span={24} >
          <Card bordered={false} style={{ width: 300, marginLeft: 45, color: '#000' }} noHovering className={jianbian}>
            <div className={blockStyle}><div className={labelStyle}>医院名称：</div><span>{hospital.name}</span></div>
            <div className={blockStyle}><div style={{ textAlign: 'left', width: 60, display: 'inline-block' }}>医院图标：</div>
              <div style={{ paddingLeft: 70 }}><img style={{ width: 100, height: 100 }} src={hospital.hospitalIcon === null ? '' : hospital.hospitalIcon} alt="您没有上传数据" /></div>
            </div>
            <div className={blockStyle}><div className={labelStyle}>医院图片：</div>
              <div style={{ paddingLeft: 70 }}><img style={{ width: 200, height: 100 }} src={hospital.hospitalImg === null ? '' : hospital.hospitalImg} alt="您没有上传数据" /></div>
            </div>
            <div className={blockStyle}><div className={labelStyle}>医院名称：</div><span>{hospital.name}</span></div>
            <div className={blockStyle}><div className={labelStyle}>医院级别：</div><span>{hospital.levelName}
              <span style={{ marginLeft: '6rem' }}><a href="http://zgcx.nhfpc.gov.cn/doctorsearch.aspx" target="blank">验证网站</a></span>
            </span></div>
            <div className={blockStyle}><div className={labelStyle}>特色科室：</div><div style={{ paddingLeft: 70, lineHeight: 2, marginTop: -20 }}>{hospital.hospitalDepartments === undefined || hospital.hospitalDepartments === null ?
                  '无特色科室'
                  :
                  hospital.hospitalDepartments.map((val) => {
                    return `${val.name}  `
                  })}</div></div>
            <div className={blockStyle}><div className={labelStyle}>联系电话：</div><span>{hospital.phone}</span></div>
            <div className={blockStyle} style={{ marginBottom: 40 }}><div className={labelStyle}>医院简介：</div><div style={{ paddingLeft: 70, lineHeight: 2, marginTop: -20 }}>{hospital.summary}</div></div>
            <div className={blockStyle}><div className={labelStyle}>所在区域：</div><span>{hospital.areaName}</span></div>
            <div className={blockStyle}><div className={labelStyle}>医院地址：</div><div style={{ paddingLeft: 70, lineHeight: 2, marginTop: -20 }}>{hospital.address}</div></div>
            <div className={blockStyle}><div className={labelStyle}>医院经度：</div><span >{hospital.lon}°</span></div>
            <div className={blockStyle}><div className={labelStyle}>医院纬度：</div><span >{hospital.lat}°</span></div>
            <div className={blockStyle}><div className={labelStyle}>医院评分：</div><span >{hospital.score}分</span></div>
            <div className={blockStyle}><div className={labelStyle}>专家人数：</div><span >{hospital.experts}位</span></div>
            <div className={blockStyle}><div className={labelStyle}>是否医保：</div><span>{hospital.isInsurance === 1 ? '是' : ' 否'}</span></div>
            <div ><div className={labelStyle}>分类推荐：</div><span>{hospital.isClassification === 1 ? '是' : ' 否'}</span></div>

          </Card>
        </Col>
        <Col span={24}>
          <FormItem
            {...formItemLayout}
            label="认证结果"
            hasFeedback
          >
            {getFieldDecorator('verify', {
              rules: [
                  { required: true, message: '请填写认证结果' },

              ],
              initialValue: hospital.verify === 2 || hospital.verify === '2' ? '2' : '3',
            })(
              <Select placeholder="--请选择--" onChange={handleChange}>
                {
                    statusList.map((val) => {
                      return (
                        <Option key={val.code} value={`${val.code}`} >{val.name}</Option>
                      )
                    })
                  }
              </Select>
                )}
          </FormItem>
        </Col>
        {/* <Col span={24}>
            <FormItem {...formItemLayout} label="失败原因">
              {getFieldDecorator('remark', {
                initialValue: hospital.remark,
              })(
                <Input placeholder="请详细填写失败原因。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} disabled={judgeStatus === 2} />
                )}
            </FormItem>
          </Col> */}
        <Col span={24}>
          <FormItem
            wrapperCol={{ span: 12, offset: 5 }}
          >
            <Link to="/hospitals"><Button type="primary" size="large" onClick={handleOk}>确定</Button></Link>
            <Link to="/hospitals"><Button type="primary" size="large" style={{ marginLeft: '30px' }} onClick={onCancel}>返回</Button></Link>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

HospitalModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
 // visible: PropTypes.bool,
  onCancel: PropTypes.func,
  // hospitalRegion: PropTypes.array,
}

export default Form.create()(HospitalModal)
