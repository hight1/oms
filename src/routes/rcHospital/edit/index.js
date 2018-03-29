import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import RCHospitalSearch from '../../../components/RCHospital/RCHospitalSearch'

import RCHospitalModal from '../../../components/RCHospital/RCHospitalModal'

function RCHospital ({ rcHospital, dispatch }) {
  const {
  // list,
    searchMode,
    keyword,
    currentItem,
 //   modalVisible,
    modalType,
    // dataSource,
    value,
    uploadToken,
    // //// 医院 /////////
    setHospital,
    cateList,
    deptPageVisible,
    selectedRowKeys,
    selectedCateRows,
    pagination,
  } = rcHospital

  const rcHospitalSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'rcHospital/updateSearchMode',
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
          pathname: '/rcHospital',
          query: { page: 1, keyword: '' },
        }),
      )
    },
    value,
  }
  const rcHospitalModalProps = {
    item: modalType === 'create' ? currentItem : currentItem,
    type: modalType,
    // visible: modalVisible,
    modalType,
    maskClosable: false,
    title: `${modalType === 'create' ? '创建用户' : '医生信息详情'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      if (data.uid === '') {
        dispatch({
          type: 'rcHospital/create',
          payload: data,
        })
      } else {
        dispatch({
          type: 'rcHospital/update',
          payload: data,
        })
        dispatch(
          routerRedux.push({
            pathname: '/rc-hospital',
            query: { page: 1, keyword: '' },
          }),
        )
      }
    },
    // ////////// 头像图片 ///////////
    uploadIconSuccess (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'rcHospital/uploadIconSuccess',
        payload: IconUrl,
      })
    },
    uploadToken,
    updateImage (deg) {
      console.log(deg)
      dispatch({
        type: 'rcHospital/rotateImage',
        payload: deg,
      })
    },
    // ////////////////////医院参照页 /////////////////////////////////
    setHospital,
    cateDataSource: cateList,
    deptPageVisible: deptPageVisible,
    rowSelection: {
      type: 'radio',
      selectedRowKeys,
      onChange: (keys, selectedRow) => {
        console.log(selectedRow)
        dispatch({
          type: 'rcHospital/updateCateState',
          payload: {
            selectedRowKeys: keys,
            selectedCateRows: selectedRow,
          },
        })
      },
    },
    handleOk () {
      // dispatch({
      //   type: 'rcHospital/editLookUpValues',
      //   payload: {
      //     lookUpCateValues: selectedRowKeys,
      //     selectedCateRows,
      //   },
      // })
      console.log(selectedCateRows)
      dispatch({
        type: 'rcHospital/editHospital',
        payload: {
          setHospital: selectedCateRows,
        },
      })
      dispatch({
        type: 'rcHospital/notDeptPageVisible',
      })
      // console.log(`handleok:${selectedRowKeys}`)
      // console.log(`handleok object:${selectedCateRows}`)
    },
      // onOk (data) {
      //   dispatch({
      //     type: `hospitalCate/${modalType}`,
      //     payload: data,
      //   })
      // },
    showCateModal () {
      dispatch({
        type: 'rcHospital/queryHosi',
        payload: {},
      })
      dispatch({
        type: 'rcHospital/deptPageVisible',
      })
    },
    handleDeptCancel () {
      dispatch({
        type: 'rcHospital/notDeptPageVisible',
      })
    },
    HospitalPagination: {
      ...pagination,
      onChange (page, pageSize) {
        dispatch({
          type: 'rcHospital/queryHosi',
          payload: { page, pageSize },
        })
      },
    },
    onHosiSearch (kw) {
      dispatch({
        type: 'rcHospital/queryHosi',
        payload: {
          keyword: kw,
        },
      })
    },
    // ///////////////////////////////////////////////////////////////
  }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <RCHospitalSearch {...rcHospitalSearchProps} />
      }
      <RCHospitalModal {...rcHospitalModalProps} />

    </div>
  )
}

RCHospital.propTypes = {
  rcHospital: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ rcHospital, loading }) {
  return { rcHospital, loading }
}

export default connect(mapStateToProps)(RCHospital)
