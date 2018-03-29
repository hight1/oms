import React from 'react'
import { Button, Modal, Form, Cascader, Table, Popconfirm } from 'antd'
import city2 from '../../utils/newCity'
import { left } from './List.less'

const FormItem = Form.Item

class AgencyArea extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = { visible: false, areaVal: {} }
    this.columns = [
      {
        title: '地区',
        dataIndex: 'areaName',
        key: 'areaName',
        className: left,
        render: (text, record) => {
          const areaCode = record.areaName
          return (
              areaCode
          )
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => {
          const createTime = record.createTime
          return (
              createTime
          )
        },
      },
      {
        title: '创建人',
        dataIndex: 'createBy',
        key: 'createBy',
        render: (text, record) => {
          const createBy = record.createBy
          return (
              createBy
          )
        },
      },
      {
        title: '操作',
        key: 'operation',
        width: 200,
        render: (text, record) => {
          const { areaCode } = record
          return (
            <span>
              <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => this.onDelete(areaCode)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          )
        },
      }]
  }
  onDelete = (areaCode) => {
    const code = window.location.hash.split('/')[3].split('?')[0]
    this.props.deleteArea(code, areaCode)
  }
  onChange = (value, selectedOptions) => {
    this.setState({
      areaVal: selectedOptions[2],
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = (e) => {
    e.preventDefault()

    this.props.addArea(this.state.areaVal)
    this.setState({
      visible: false,
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  render () {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    }

    const { getFieldDecorator } = this.props.form
    const columns = this.columns
    return (
      <div className="clearfix">
        <Button type="primary" style={{ marginBottom: '1rem' }} onClick={this.showModal}>+添加</Button>
        <Modal
          title="添加代理商所辖区县"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="所在区域"
            >
              {getFieldDecorator('areaCode', {
                rules: [
                  { required: true, message: '不能为空' },
                ],
              })(
                <Cascader allowClear onChange={this.onChange} options={city2} />
                )}
            </FormItem>
          </Form>
        </Modal>
        <Table columns={columns} dataSource={this.props.data} />
      </div>
    )
  }
}

const AgencyAreaComponent = Form.create()(AgencyArea)

export default AgencyAreaComponent
