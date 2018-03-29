import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Modal, Card } from 'antd'
import { labelStyle, blockStyle, jianbian } from '../../themes/index.less'


// const Option = Select.Option
// const FormItem = Form.Item


const CasesModal = ({
  item = {},
  onOk,
  judgeStatus,
  handleChange,
  hospitalRank,
  hospitalCategories,
  hospitalLevels,
  hosipitalRegion,
  form: {
    // getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const cases = item

  // const statusList = [
  //   {
  //     name: '认证失败',
  //     code: 3,
  //   },
  //   {
  //     name: '认证成功',
  //     code: 2,
  //   },

  // ]

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
        code: cases.code,
        enable: verify,
      })
    })
  }

  // const formItemLayout = {
  //   labelCol: { span: 5 },
  //   wrapperCol: { span: 15 },
  // }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts} >
      <Form>
        <Row>
          <Col span={24} >
            <Card bordered={false} style={{ width: 300, marginLeft: 10, color: '#000' }} noHovering className={jianbian}>
              <div className={blockStyle}><div className={labelStyle}>医院名称：</div><span>{cases.name}</span></div>
              <div className={blockStyle}><div style={{ textAlign: 'left', width: 60, display: 'inline-block' }}>医院图标：</div>
                <div style={{ paddingLeft: 70 }}><img style={{ width: 100, height: 100 }} src={cases.hospitalIcon === null ? '' : cases.hospitalIcon} alt="您没有上传数据" /></div>
              </div>
              <div className={blockStyle}><div className={labelStyle}>医院图片：</div>
                <div style={{ paddingLeft: 70 }}><img style={{ width: 200, height: 100 }} src={cases.hospitalImg === null ? '' : cases.hospitalImg} alt="您没有上传数据" /></div>
              </div>
              <div className={blockStyle}><div className={labelStyle}>医院名称：</div><span>{cases.name}</span></div>
              <div className={blockStyle}><div className={labelStyle}>医院级别：</div><span>{cases.levelName}</span></div>
              <div className={blockStyle}><div className={labelStyle}>特色科室：</div><div style={{ paddingLeft: 70, lineHeight: 2, marginTop: -20 }}>{cases.hospitalDepartments === undefined || cases.hospitalDepartments === null ?
                  ''
                  :
                  cases.hospitalDepartments.map((val) => {
                    return `${val.name}  `
                  })}</div></div>
              <div className={blockStyle}><div className={labelStyle}>联系电话：</div><span>{cases.phone}</span></div>
              <div className={blockStyle} style={{ marginBottom: 40 }}><div className={labelStyle}>医院简介：</div><div style={{ paddingLeft: 70, lineHeight: 2, marginTop: -20 }}>{cases.summary}</div></div>
              <div className={blockStyle}><div className={labelStyle}>所在区域：</div><span>{cases.areaName}</span></div>
              <div className={blockStyle}><div className={labelStyle}>医院地址：</div><div style={{ paddingLeft: 70, lineHeight: 2, marginTop: -20 }}>{cases.address}</div></div>
              <div className={blockStyle}><div className={labelStyle}>医院经度：</div><span >{cases.lon}°</span></div>
              <div className={blockStyle}><div className={labelStyle}>医院纬度：</div><span >{cases.lat}°</span></div>
              <div className={blockStyle}><div className={labelStyle}>医院评分：</div><span >{cases.score}分</span></div>
              <div className={blockStyle}><div className={labelStyle}>专家人数：</div><span >{cases.experts}位</span></div>
              <div className={blockStyle}><div className={labelStyle}>是否医保：</div><span>{cases.isInsurance === 1 ? '是' : ' 否'}</span></div>
              <div ><div className={labelStyle}>分类推荐：</div><span>{cases.isClassification === 1 ? '是' : ' 否'}</span></div>

            </Card>
          </Col>
          {/* <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="认证结果"
              hasFeedback
            >
              {getFieldDecorator('verify', {
                rules: [
                  { required: true, message: '请填写认证结果' },

                ],
                initialValue: cases.verify === 2 || cases.verify === '2' ? '2' : '3',
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
          </Col> */}
          {/* <Col span={24}>
            <FormItem {...formItemLayout} label="失败原因">
              {getFieldDecorator('remark', {
                initialValue: cases.remark,
              })(
                <Input placeholder="请详细填写失败原因。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} disabled={judgeStatus === 2} />
                )}
            </FormItem>
          </Col> */}
        </Row>
      </Form>
    </Modal>
  )
}

CasesModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  hospitalRegion: PropTypes.array,
}

export default Form.create()(CasesModal)
