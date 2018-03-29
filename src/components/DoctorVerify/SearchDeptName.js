import React from 'react'
import PropTypes from 'prop-types'
import { Select, Spin } from 'antd'


const Option = Select.Option

class SearchDeptName extends React.Component {
  state = {
    data: this.props.data,
    value: [],
    fetching: this.props.fetching,
  }
  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    })
  }
  render () {
    const { value } = this.state
    return (
      <Select
        mode="combobox"
        labelInValue
        value={value}
        placeholder="请选择二级科室名称"
        notFoundContent={this.props.fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.props.searchName}
        onChange={this.handleChange}
        disabled={this.props.disabled}
        style={{ width: 206 }}
        defaultValue={this.props.defaultValue}
      >
        {this.props.data.map(d => <Option key={d.id} value={d.id.toString()}>{d.name}</Option>)}
      </Select>
    )
  }
}

SearchDeptName.propTypes = {
  searchName: PropTypes.func,
}

export default SearchDeptName
