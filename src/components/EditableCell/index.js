import React from 'react'
import PropTypes from 'prop-types'
import { Input, Icon, Tooltip } from 'antd'
import './index.less'

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,

  }
  handleChange = (e) => {
    const value = e.target.value
    this.setState({ value })
  }
  check = () => {
    this.setState({ editable: false })
    if (this.props.onChange) {
      this.props.onChange(this.state.value)
    }
  }
  edit = () => {
    this.setState({ editable: true })
  }
  render () {
    const { value, editable } = this.state
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Tooltip placement="top" title="把0-9数字填入框内,范围为1~255的整数">
                <Input
                  value={value}
                  onChange={this.handleChange}
                  onPressEnter={this.check}
                />
              </Tooltip>
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || '0'}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    )
  }
}

EditableCell.propTypes = {
  onChange: PropTypes.func,
}

export default EditableCell

