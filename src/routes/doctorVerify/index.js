import React from 'react'
import PropTypes from 'prop-types'
// import debounce from 'lodash.debounce'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import DoctorVerifyList from '../../components/DoctorVerify/DoctorVerifyList'
import DoctorVerifySearch from '../../components/DoctorVerify/DoctorVerifySearch'
import DoctorVerifyAction from '../../components/DoctorVerify/DoctorVerifyAction'

// let searchHospitalList = (dispatch, name) => {
//   dispatch({
//     type: 'doctorVerify/changeFetching',
//   })
//   dispatch({
//     type: 'doctorVerify/searchHospitalName',
//     payload: { keyword: name },
//   })
// }
// searchHospitalList = debounce(searchHospitalList, 1000)
// // let searchDeptName = (dispatch, name) => {
//   dispatch({
//     type: 'doctorVerify/changeFetching2',
//   })
//   dispatch({
//     type: 'doctorVerify/searchDeptName',
//     payload: {
//       name: name,
//       results: 30,
//     },
//   })
// }
// searchDeptName = debounce(searchDeptName, 1000)
// let getNewName = (dispatch, value) => {
//   dispatch({
//     type: 'doctorVerify/changeFetching2',
//   })
//   dispatch({
//     type: 'doctorVerify/searchSecondDept',
//     payload: {
//       hospitalCode: value.key,
//       results: 1000,
//     },
//   })
// }
// getNewName = debounce(getNewName, 1000)

function DoctorVerify ({ doctorVerify, loading, location, dispatch }) {
  const {
    list,
    searchMode,
    keyword,
    pagination,
    // currentItem,
    selectedRowKeys,
    // modalVisible,
    // modalType,
    // judgeStatus,
    // hospitalName,
    // hospitalNameDisabled,
    // secondDeptNameDisable,
    // deptNameDisable,
    // QuerymodalVisible,
    // parentDept,
    // authRemarkWarning,
    // reason,
    // deptName,
    // fetching,
    // fetchingDeptName,
    // deptList,
    // hospitalList,
    // hospitalValue,
    // deptValue,
    // vcPriceDisable,
    // vcPriceList,
    type,
  } = doctorVerify

  const doctorSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'doctorVerify/updateSearchMode',
        payload: {
          searchMode: 'simple',
        },
      })
    },
    onSearch (fieldsValue) {
      console.log(fieldsValue)
    },
    onReset () {
      dispatch(
        routerRedux.push({
          pathname: '/doctors/physician-auths',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }

  const doctorListProps = {
    pagination,
    loading: loading.effects['doctorVerify/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'doctorVerify/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    onPageChange (page) {
      const { query } = location
      dispatch({
        type: 'doctorVerify/query',
        payload: {
          page: page.current,
          pageSize: page.pageSize,
          physicianAuthStatus: type,
          ...query,
        },
      })
    },
    onVerify (code) {
      dispatch({
        type: 'doctorVerify/verify',
        payload: {
          code: code,
        },
      })
      // dispatch({
      //   type: 'doctorVerify/searchSecondDept',
      //   payload: {
      //     hospitalCode: hospitalCode,
      //     results: 1000,
      //   },
      // })
    },
    onQuery (code) {
      dispatch({
        type: 'doctorVerify/queryDoctor',
        payload: {
          code: code,
        },
      })
    },
  }

  const doctorActionProps = {
    type,
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'doctorVerify/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'doctorVerify/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'doctorVerify/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      // dispatch(
      //   routerRedux.push({
      //     pathname: '/physician-auths',
      //     query: {
      //       page: 1,
      //       keyword: kw,
      //       physicianAuthStatus: type,
      //     },
      //   }),
      // )
      dispatch({
        type: 'doctorVerify/query',
        payload: {
          physicianAuthStatus: type,
          page: 1,
          keyword: kw,
        },
      })
    },
    onResetSearch () {
      dispatch({
        type: 'doctorVerify/query',
        payload: {
          physicianAuthStatus: type,
          page: 1,
          keyword: '',
        },
      })
    },
    handleChange (e) {
      dispatch({
        type: 'doctorVerify/query',
        payload: {
          physicianAuthStatus: e.target.value,
        },
      })
      dispatch({
        type: 'doctorVerify/changeType',
        payload: {
          type: e.target.value,
        },
      })
    },
  }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <DoctorVerifySearch {...doctorSearchProps} />
      }
      <DoctorVerifyAction {...doctorActionProps} />
      <DoctorVerifyList {...doctorListProps} />
    </div>
  )
}

DoctorVerify.propTypes = {
  doctorVerify: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ doctorVerify, loading }) {
  return { doctorVerify, loading }
}

export default connect(mapStateToProps)(DoctorVerify)
