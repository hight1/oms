import React from 'react'
import { Modal } from 'antd'


class ThumbPic extends React.Component {

  state = { visible: false, item: this.props.item }
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

  render () {
    const { visible, item } = this.state
    return (
      <div>
        <div onClick={this.showModal}>
          <img alt="没有图片" width="100%" display="block" src={item} />
          <Modal visible={visible} footer={null} onCancel={this.handleCancel}>
            <img alt="没有图片" style={{ width: '100%' }} src={item} />
          </Modal>
        </div>

      </div>
    )
  }
}


export default ThumbPic
