import React from 'react'
import Viewer from 'react-viewer'
import 'react-viewer/dist/index.css'

class RotateImage extends React.Component {
  constructor () {
    super()
    this.state = {
      visible: false,
    }
  }

  render () {
    return (
      <div>
        <div onClick={() => { this.setState({ visible: !this.state.visible }) }}>
          <img alt="无图" style={{ width: '35%', marginLeft: '5rem', marginBottom: '10px', cursor: 'pointer' }} src={this.props.src} />
        </div>
        <Viewer
          visible={this.state.visible}
          onClose={() => { this.setState({ visible: false }) }}
          images={[{ src: `${this.props.src}`, alt: '' }]}
        />
      </div>
    )
  }
}
// class RotateImage extends React.Component {
//   state = {
//     visible: false,
//     current: 0,
//   };

//   onRotate= () => {
//     this.setState({
//       current: (this.state.current + 90) % 360,
//     })
//   }
//   clickImg = () => {
//     this.setState({ visible: true })
//   }
//   handleCancel = () => this.setState({ visible: false })

//   render () {
//     const { visible } = this.state

//     return (
//       <div>
//         <img onClick={this.clickImg.bind(this)} alt="无图" style={{ width: '35%', marginLeft: '5rem', marginBottom: '10px', cursor: 'pointer' }} src={this.props.src} />
//         <Modal width={'600px'} visible={visible} footer={null} onCancel={this.handleCancel.bind(this)}>
//           <img alt="example" style={{ width: '100%', transform: `rotate(${this.state.current}deg)` }} src={this.props.src} />
//           <Button onClick={this.onRotate.bind(this)}>旋转</Button>
//         </Modal>
//       </div>
//     )
//   }
// }


export default RotateImage
