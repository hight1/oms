import React from 'react'
import PropTypes from 'prop-types'
// import debounce from 'lodash.debounce'
import { connect } from 'dva'
import DoctorQueryModal from '../../../components/DoctorVerify/DoctorQueryModal'

// let searchHospitalList = (dispatch, name) => {
//   dispatch({
//     type: 'queryDoctorVerify/changeFetching',
//   })
//   dispatch({
//     type: 'queryDoctorVerify/searchHospitalName',
//     payload: { keyword: name },
//   })
// }
// searchHospitalList = debounce(searchHospitalList, 1000)
// // let searchDeptName = (dispatch, name) => {
// //   dispatch({
// //     type: 'doctorVerify/changeFetching2',
// //   })
// //   dispatch({
// //     type: 'doctorVerify/searchDeptName',
// //     payload: {
// //       name: name,
// //       results: 30,
// //     },
// //   })
// // }
// // searchDeptName = debounce(searchDeptName, 1000)
// let getNewName = (dispatch, value) => {
//   dispatch({
//     type: 'queryDoctorVerify/changeFetching2',
//   })
//   dispatch({
//     type: 'queryDoctorVerify/searchSecondDept',
//     payload: {
//       hospitalCode: value.key,
//       results: 1000,
//     },
//   })
// }
// getNewName = debounce(getNewName, 1000)

function QueryDoctorVerify ({ queryDoctorVerify, loading, dispatch }) {
  const {
    // list,
    // searchMode,
    // keyword,
    // pagination,
    currentItem,
    // selectedRowKeys,
    // modalVisible,
    modalType,
    // judgeStatus,
    // hospitalName,
    // hospitalNameDisabled,
    // secondDeptNameDisable,
    // deptNameDisable,
    QuerymodalVisible,
  } = queryDoctorVerify


  const doctorQueryModalProps = {
    item: currentItem,
    type: modalType,
    visible: QuerymodalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['doctorVerify/query'],
    title: '医师详情',
    wrapClassName: 'vertical-center-modal',
    onOk () {
      dispatch({
        type: 'queryDoctorVerify/hideQueryModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'queryDoctorVerify/hideQueryModal',
      })
    },
  }
  return (
    <div className="content-inner">
      <DoctorQueryModal {...doctorQueryModalProps} />
    </div>
  )
}

QueryDoctorVerify.propTypes = {
  queryDoctorVerify: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ queryDoctorVerify, loading }) {
  return { queryDoctorVerify, loading }
}

export default connect(mapStateToProps)(QueryDoctorVerify)
