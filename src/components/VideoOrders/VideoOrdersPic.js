import React from 'react'
import { Upload } from 'antd'
import Viewer from 'react-viewer'
import 'react-viewer/dist/index.css'

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.src === null ? [] : this.props.src.map((val, index) => {
      return {
        uid: index,
        name: `第${index}张`,
        status: 'done',
        url: val,
      }
    }),
  };
  componentWillMount () {
    this.setState({
      fileList: this.props.src === null ? [] : this.props.src.map((val, index) => {
        return {
          uid: index,
          name: `第${index}张`,
          status: 'done',
          url: val,
        }
      }),
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }


  render () {
    const { previewVisible, previewImage, fileList } = this.state
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onRemove={false}
          showUploadList={{ showRemoveIcon: false }}
        />
        <Viewer
          visible={previewVisible}
          onClose={this.handleCancel}
          images={[{ src: `${previewImage}`, alt: '' }]}
        />
        {/* <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal> */}
      </div>
    )
  }
}

export default PicturesWall
