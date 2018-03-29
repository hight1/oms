import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Modal, Select, Card, Input } from 'antd'
import { labelStyle, blockStyle } from '../../themes/index.less'


const Option = Select.Option
const FormItem = Form.Item


const MembersModal = ({
  item = {},
  onOk,
  judgeStatus,
  handleChange,
  hospitalRank,
  hospitalCategories,
  hospitalLevels,
  hosipitalRegion,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const members = item

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
      if (verify === 2 || verify === '认证成功') {
        verify = true
      } else {
        verify = false
      }
      onOk({
        code: members.code,
        enable: verify,
      })
    })
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={24} >
            <Card bordered={false} style={{ width: 300, marginLeft: 10, color: '#000' }} noHovering>
              <div className={blockStyle}><div className={labelStyle}>医院名称：</div><span>{members.name}</span></div>
              <div className={blockStyle}><div style={{ textAlign: 'left', width: 60, display: 'inline-block' }}>医院图标：</div>
                <div style={{ paddingLeft: 70 }}><img style={{ width: 100, height: 100 }} src={members.hospitalIcon} alt="您没有上传数据" /></div>
              </div>
              <div className={blockStyle}><div className={labelStyle}>医院图片：</div>
                <div style={{ paddingLeft: 70 }}><img style={{ width: 200, height: 100 }} src={members.hospitalImg} alt="您没有上传数据" /></div>
              </div>
              <div className={blockStyle}><div className={labelStyle}>医院名称：</div><span>{members.name}</span></div>
              <div className={blockStyle}><div className={labelStyle}>医院级别：</div><span>{members.levelName}</span></div>
              <div className={blockStyle}><div className={labelStyle}>特色科室：</div><span>{members.hospitalDepartments === undefined ?
                  members.levelName
                  :
                  members.hospitalDepartments.map((val) => {
                    return `${val.name}  `
                  })}</span></div>
              <div className={blockStyle}><div className={labelStyle}>联系电话：</div><span>{members.phone}</span></div>
              <div className={blockStyle} style={{ marginBottom: 40 }}><div className={labelStyle}>医院简介：</div><div style={{ paddingLeft: 70, lineHeight: 2, marginTop: -20 }}>{members.summary}</div></div>
              <div className={blockStyle}><div className={labelStyle}>所在区域：</div><span>{members.areaName}</span></div>
              <div className={blockStyle}><div className={labelStyle}>医院地址：</div><div style={{ paddingLeft: 70, lineHeight: 2, marginTop: -20 }}>{members.address}</div></div>
              <div className={blockStyle}><div className={labelStyle}>医院经度：</div><span >{members.lon}°</span></div>
              <div className={blockStyle}><div className={labelStyle}>医院纬度：</div><span >{members.lat}°</span></div>
              <div className={blockStyle}><div className={labelStyle}>医院评分：</div><span >{members.score}分</span></div>
              <div className={blockStyle}><div className={labelStyle}>专家人数：</div><span >{members.experts}位</span></div>
              <div className={blockStyle}><div className={labelStyle}>是否医保：</div><span>{members.isInsurance === 1 ? '是' : ' 否'}</span></div>
              <div ><div className={labelStyle}>分类推荐：</div><span>{members.isClassification === 1 ? '是' : ' 否'}</span></div>

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
                initialValue: members.verify === 2 || members.verify === '2' ? 2 : 3,
              })(
                <Select placeholder="--请选择--" onChange={handleChange}>
                  {
                    statusList.map((val) => {
                      return (
                        <Option key={val.code} value={val.code} >{val.name}</Option>
                      )
                    })
                  }
                </Select>
                )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="失败原因">
              {getFieldDecorator('remark', {
                initialValue: members.remark,
              })(
                <Input placeholder="请详细填写失败原因。" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} disabled={judgeStatus === 2} />
                )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

MembersModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  hospitalRank: PropTypes.array,
  hospitalRegion: PropTypes.array,
}

export default Form.create()(MembersModal)
