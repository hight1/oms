import React, { Component } from 'react'
import { message } from 'antd'
import PropTypes from 'prop-types'
import request from 'superagent-bluebird-promise'

function isFunction (fn) {
  const getType = {}
  return fn && getType.toString.call(fn) === '[object Function]'
}

function formatMaxSize (size) {
  const usize = size.toString().toUpperCase()
  let bsize
  const m = usize.indexOf('M')
  const k = usize.indexOf('K')
  if (m > -1) {
    bsize = parseFloat(usize.slice(0, m)) * 1024 * 1024
  } else if (k > -1) {
    bsize = parseFloat(usize.slice(0, k)) * 1024
  } else {
    bsize = parseFloat(usize)
  }
  return Math.abs(bsize)
}

const fileUploadStyles = {
  position: 'relative',
}

class SingleImagePicker extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      uploadUrl: this.props.uploadUrl || 'http://upload.qiniu.com',
      img: '',
      files: [],
      current: 0,
    }
    this.style = this.props.style || {
      width: 270,
      height: 202,
      border: '1px solid #A7ADBD',
    }
    this.fileStyles = this.props.fileStyle || {
      height: this.style.height,
      width: this.style.width,
      position: 'absolute',
      left: '0',
      top: '0',
      bottom: '0',
    }
    this.imageStyles = this.props.imageStyle || {
      margin: '0',
      padding: '0',
      height: this.style.height,
      display: 'block',
      width: '100%',
      transform: `rotate(${this.state.current})`,
    }
    this.infoStyles = this.props.infoStyle || {
      paddingTop: '10px',
      fontSize: '50px',
      color: '#A7ADBD',
      textAlign: 'center',
    }
    this.onComplete = this.props.onComplete
    this.Rotate = this.props.Rotate
  }

  onClick () {
    this.fileInput.value = ''
    this.fileInput.click()
  }

  onFileChange (e) {
    e.preventDefault()

    const self = this
    let file
    if (e.dataTransfer) {
      file = e.dataTransfer.files[0]
    } else if (e.target) {
      file = e.target.files[0]
    }

    if (this.props.onUpload) {
      this.props.onUpload(file, e)
    }

    const maxSizeLimit = formatMaxSize(this.props.maxSize)
    if (maxSizeLimit && file.size > maxSizeLimit) {
      message.error('图片大小错误！')
      if (this.props.onError) {
        this.props.onError({
          coed: 1,
          message: `上传的文件大小超出了限制:${this.props.maxSize}`,
        })
      }
    } else {
      file.preview = URL.createObjectURL(file)
      file.request = this.upload(file)
      file.uploadPromise = file.request.promise()
      file.uploadPromise.then((res) => {
        const rs = JSON.parse(res.text)
        if (res.statusCode === 200) {
          const origin = self.state.img
          if (rs.key !== origin) {
            self.setState({ img: rs.key })
          }
          if (isFunction(this.onComplete)) {
            this.onComplete(rs)
            self.setState({ img: rs.key })
          }
        }
      })
    }

    if (this.props.onFileChange) {
      this.props.onFileChange(file, e)
    } else {
      this.setState({
        file,
      })
    }
  }
  onRotate () {
    this.setState({
      current: (this.state.current + 90) % 360,
    }, () => {
      this.Rotate(this.state.current)
    })
  }

  cleanFile () {
    this.setState({
      file: {},
      img: '',
    })
  }
  showFile () {
    if (this.state.file) {
      const file = this.state.file
      let preview = ''
      if (/image/.test(file.type)) {
        preview = <img style={{ ...this.imageStyles, transform: `rotate(${this.state.current}deg)` }} src={file.preview} onClick={this.onClick.bind(this)} alt="" />
      }
      return (
        <div style={this.fileStyles} >
          {preview}
          <div style={{ cursor: 'pointer' }} onClick={this.onRotate.bind(this)}>旋转</div>
        </div>
      )
    } else {
      if (this.props.imgSrc) {
        let preview = <img style={this.imageStyles} src={this.props.imgSrc} onClick={this.onClick.bind(this)} alt="" />
        return (
          <div style={this.fileStyles} >
            {/* <CutImg src={this.props.imgSrc} getCropData={dataUrl => this.getCropData(dataUrl)} /> */}
            {preview}
            <div style={{ cursor: 'pointer' }} onClick={this.onRotate.bind(this)}>旋转</div>
          </div>
        )
      }
    }
  }

  upload (file) {
    if (!file || file.size === 0) return null
    const keyPrefix = this.props.keyPrefix ? `${this.props.keyPrefix}/` : ''
    const key = `${keyPrefix}${file.preview.split('/').pop()}.${file.name.split('.').pop()}`
    const r = request
             .post(this.state.uploadUrl)
             .field('key', key)
             .field('token', this.props.uploadToken)
             .field('x:filename', file.name)
             .field('x:size', file.size)
             .attach('file', file, file.name)
             .set('Accept', 'application/json')
    if (isFunction(file.onprogress)) {
      r.on('progress', file.onprogress)
    }
    return r
  }


  render () {
    const className = this.props.className || 'dropzone'
    return (
      <div>
        <div style={fileUploadStyles}>
          <div className={className} style={this.style} onClick={this.onClick.bind(this)}>
            <input
              style={{ display: 'none' }} type={'file'}
              multiple="false"
              ref={(input) => { this.fileInput = input }}
              onChange={this.onFileChange.bind(this)}
              accept={this.props.accept}
            />
            <div style={this.infoStyles}>+</div>
          </div>

          {this.showFile()}
        </div>
      </div>
    )
  }
}

SingleImagePicker.propTypes = {
    // 七牛token
  uploadToken: PropTypes.string,
    // 图片KEY前缀
  keyPrefix: PropTypes.string,
    // 图片SRC
  imgSrc: PropTypes.string,
    // 上传中回调
  onUpload: PropTypes.func,
    // 最大图片尺寸
  maxSize: PropTypes.string,
    // 样式
  style: PropTypes.object,
    // 支持上传类型
  accept: PropTypes.string,
    // 上传的url
  uploadUrl: PropTypes.string,
    // 上传完成的回调
  onComplete: PropTypes.func,
    // 上传控件自定义样式的className
  className: PropTypes.string,
}

export default SingleImagePicker

