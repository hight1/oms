import React, { Component } from 'react'
import { Button, Modal, Table, Radio, Row, Col } from 'antd'

class PriceTable extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      visible: false,
      data: [
        {
          key: '1',
          title: '特需专家',
          patPrice: 99,
          docPrice: 50,
          normalDoc: 5,
        },
        {
          key: '2',
          title: '主任医师',
          patPrice: 79,
          docPrice: 35,
          normalDoc: 5,
        },
        {
          key: '3',
          title: '副主任医师',
          patPrice: 69,
          docPrice: 25,
          normalDoc: 5,
        },
        {
          key: '4',
          title: '主治医师',
          patPrice: 49,
          docPrice: 15,
          normalDoc: 5,
        },
        {
          key: '5',
          title: '普通医生',
          patPrice: 39,
          docPrice: 5,
          normalDoc: 5,
        },
      ],
      type: 0,
    }
    this.data = [
      {
        key: '1',
        title: '特需专家',
        patPrice: 99,
        docPrice: 50,
        normalDoc: 5,
      },
      {
        key: '2',
        title: '主任医师',
        patPrice: 79,
        docPrice: 35,
        normalDoc: 5,
      },
      {
        key: '3',
        title: '副主任医师',
        patPrice: 69,
        docPrice: 25,
        normalDoc: 5,
      },
      {
        key: '4',
        title: '主治医师',
        patPrice: 49,
        docPrice: 15,
        normalDoc: 5,
      },
      {
        key: '5',
        title: '普通医生',
        patPrice: 39,
        docPrice: 5,
        normalDoc: 5,
      },
    ]
    this.data2 = [
      {
        key: '1',
        title: '特需专家',
        patPrice: 99,
        docPrice: 50,
        normalDoc: 5,
      },
      {
        key: '2',
        title: '主任医师',
        patPrice: 69,
        docPrice: 30,
        normalDoc: 5,
      },
      {
        key: '3',
        title: '副主任医师',
        patPrice: 59,
        docPrice: 20,
        normalDoc: 5,
      },
      {
        key: '4',
        title: '主治医师',
        patPrice: 45,
        docPrice: 12,
        normalDoc: 5,
      },
      {
        key: '5',
        title: '普通医生',
        patPrice: 39,
        docPrice: 5,
        normalDoc: 5,
      },
    ]
    this.data3 = [
      {
        key: '1',
        title: '特需专家',
        patPrice: 99,
        docPrice: 50,
        normalDoc: 5,
      },
      {
        key: '2',
        title: '主任医师',
        patPrice: 59,
        docPrice: 25,
        normalDoc: 5,
      },
      {
        key: '3',
        title: '副主任医师',
        patPrice: 49,
        docPrice: 15,
        normalDoc: 5,
      },
      {
        key: '4',
        title: '主治医师',
        patPrice: 39,
        docPrice: 8,
        normalDoc: 5,
      },
      {
        key: '5',
        title: '普通医生',
        patPrice: 39,
        docPrice: 5,
        normalDoc: 5,
      },
    ]
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = () => {
    this.setState({
      visible: false,
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  handleChange = (e) => {
    if (e.target.value === 2) {
      this.setState({
        data: this.data3,
        type: 2,
      })
    } else if (e.target.value === 0) {
      this.setState({
        data: this.data,
        type: 0,
      })
    } else if (e.target.value === 1) {
      this.setState({
        data: this.data2,
        type: 1,
      })
    }
  }

  render () {
    const { type, data } = this.state
    const columns = [{
      title: '核算项目（元/分钟）',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '患者收费（元/分钟）',
      dataIndex: 'patPrice',
      key: 'patPrice',
    }, {
      title: '医师提成（元/分钟）',
      dataIndex: 'docPrice',
      key: 'docPrice',
    }, {
      title: '基层医生（元/分钟）',
      dataIndex: 'normalDoc',
      key: 'normalDoc',
    }]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        this.props.changePrice(selectedRows)
      },
      type: 'radio',
    }
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>选择价格</Button>
        <Modal
          title="价格表"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="800px"
        >
          <Row>
            <Col span={24}>
              <Radio.Group style={{ float: 'right', marginBottom: '10px' }} value={type} onChange={this.handleChange}>
                <Radio.Button value={0}>高档</Radio.Button>
                <Radio.Button value={1}>中档</Radio.Button>
                <Radio.Button value={2}>低档</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data}
            rowSelection={rowSelection}
            pagination={false}

          />
        </Modal>
      </div>
    )
  }
  }


export default PriceTable
