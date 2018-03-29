import React from 'react'
import { Modal, Button, Table } from 'antd'


class ImportPage extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }
  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }
  render () {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.props.handleOk}
          onCancel={this.handleCancel}
          width="1000px"
        >
          <div>
            <Table
              columns={this.props.columns}
              dataSource={this.props.dataSource}
              rowSelection={this.props.rowSelection}
            />
          </div>

        </Modal>
      </div>
    )
  }
}


export default ImportPage
