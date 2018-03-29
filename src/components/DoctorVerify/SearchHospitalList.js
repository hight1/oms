import React from 'react'
// import PropTypes from 'prop-types'
import { Select, Spin } from 'antd'
// import { request, config } from '../../utils'
// import debounce from 'lodash.debounce'

// import { queryHospitalName } from '../../services/doctorVerify'

// const { api } = config
// //const { hospitals } = api

const Option = Select.Option

class SearchHospitalList extends React.Component {
  state = {
    data: this.props.data,
    value: [],
    fetching: this.props.fetching,
  }
  handleChange = () => {
    this.setState({
      data: [],
      fetching: false,
    })
  }
  render () {
    const { value } = this.state
    return (
      <Select
        mode="combobox"
        value={value}
        placeholder="请选择医院名称"
        notFoundContent={this.props.fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.props.searchName}
        disabled={this.props.disabled}
        style={{ width: 206 }}
      >
        {this.props.data.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>)}
      </Select>
    )
  }
}

// class SearchHospitalList extends React.Component {
//   constructor (props) {
//     super(props)
//     this.lastFetchId = 0
//     this.fetchUser = debounce(this.fetchUser, 800)
//   }
//   state = {
//     data: [],
//     value: [],
//     fetching: false,
//   }
//   fetchUser = (value) => {
//     console.log('fetching user', value)
//     this.lastFetchId += 1
//     const fetchId = this.lastFetchId
//     this.setState({ fetching: true })
//     // fetch(`http://192.168.1.88:9016/hospitals/search?keyword=${value}`)
//     //   .then(response => response.json())
//     //   .then((body) => {
//     //     if (fetchId !== this.lastFetchId) { // for fetch callback order
//     //       return
//     //     }


//     //   })
//     const jieguo=queryHospitalName(value)
//     console.log(jieguo)
//     const data = body.results.map(user => ({
//         text: `${user.name.first} ${user.name.last}`,
//         value: user.login.username,
//         fetching: false,
//       }))
//     this.setState({ data })
//   }
//   handleChange = (value) => {
//     this.setState({
//       value,
//       data: [],
//       fetching: false,
//     })
//   }
//   render () {
//     const { fetching, data, value } = this.state
//     return (
//       <Select
//         mode="multiple"
//         labelInValue
//         value={value}
//         placeholder="Select users"
//         notFoundContent={fetching ? <Spin size="small" /> : null}
//         filterOption={false}
//         onSearch={this.fetchUser}
//         onChange={this.handleChange}
//         style={{ width: '100%' }}
//         defaultValue={this.props.defaultValue}
//       >
//         {data.map(d => <Option key={d.value}>{d.text}</Option>)}
//       </Select>
//     )
//   }
// }

SearchHospitalList.propTypes = {
}

export default SearchHospitalList
