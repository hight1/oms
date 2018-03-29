import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import HospitalSearch from '../../../components/Hospital/HospitalSearch'
// import HospitalAction from '../../../components/Hospital/HospitalAction'
import HospitalModal from '../../../components/Hospital/HospitalModal'

function hospitalUpdate ({ updateHospital, loading, location, dispatch }) {
  const {
   // list,
    searchMode,
    keyword,
    pagination,
    currentItem,
    selectedRowKeys,
   // modalVisible,
    modalType,
    dataSource,
    hospitalRank,
    hospitalCategories,
    hospitalLevels,
    hospitalRegion,
    hospitalSpecial,
    specialName,
    uploadToken,
    deptList,
    cateList,
    deptPageVisible,
    activeKey,
    editDeptVisible,
    selectedCateRows,
    deptLookUpVisible,
    selectedDeptRowKeys,
    deptLookData,
    selectedDeptRows,
    falseDocList,
    trueDocList,
    visiMap,
    loadES,
    loadOK,
  } = updateHospital
  const hospitalSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'updateHospital/updateSearchMode',
        payload: {
          searchMode: 'simple',
        },
      })
    },
    onSearch (fieldsValue) {
      dispatch(
        routerRedux.push({
          pathname: '/hospitals',
          query: { page: 1, ...fieldsValue },
        }),
      )
    },
    onReset () {
      dispatch(
        routerRedux.push({
          pathname: '/hospitals',
          query: { page: 1, keyword: '' },
        }),
      )
    },
    hospitalRank,
    hospitalCategories,
    hospitalLevels,
  }

  // const hospitalActionProps = {
  //   searchMode,
  //   keyword,
  //   selectedRowKeys,
  //   onCreate () {
  //     dispatch({
  //       type: 'updateHospital/showModal',
  //       payload: {
  //         modalType: 'create',
  //       },
  //     })
  //   },
  //   onBatchDelete () {
  //     dispatch({
  //       type: 'updateHospital/multiDelete',
  //       payload: {
  //         ids: selectedRowKeys,
  //       },
  //     })
  //   },
  //   onAdvanceSearchMode () {
  //     dispatch({
  //       type: 'updateHospital/updateSearchMode',
  //       payload: {
  //         searchMode: 'advance',
  //       },
  //     })
  //   },
  //   onSearch (kw) {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/hospitals',
  //         query: { page: 1, keyword: kw },
  //       }),
  //     )
  //   },
  //   onResetSearch () {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/hospitals',
  //         query: { page: 1, keyword: '' },
  //       }),
  //     )
  //   },
  // }
  const hospitalModalProps = {
    loadES,
    loadOK,
    pagination,
    loading: loading.effects['hospital/query'],
    item: modalType === 'create' ? currentItem : currentItem,
    type: modalType,
    // visible: modalVisible,
    maskClosable: false,
    confirmLoading: modalType === 'create' ? loading.effects['hospitals/create'] : loading.effects['hospitals/update'],
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      if (location.pathname.slice(18) === 'new') {
        dispatch({
          type: 'updateHospital/create',
          payload: data,
        })
      } else {
        dispatch({
          type: `updateHospital/${modalType}`,
          payload: data,
        })
        dispatch({
          type: 'updateHospital/changeLoadOK',
          payload: {
            loadOK: true,
          },
        })
        // dispatch({
        //   type: 'updateHospital/changeLoadES',
        //   payload: {
        //     loadES: true,
        //   },
        // })
      }
    },
    onCancel () {
      dispatch({
        type: 'updateHospital/hideModal',
      })
    },
    dataSource,
    deptList,
    hospitalRank,
    hospitalCategories,
    hospitalRegion,
    hospitalSpecial,
    getHospitalSpecial (code) {
      dispatch({
        type: 'updateHospital/getHospitalSpecial',
        payload: code,
      })
    },
    specialName,
    uploadIconSuccess (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'updateHospital/uploadIconSuccess',
        payload: IconUrl,
      })
    },
    uploadImageSuccess (res) {
      const imageUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'updateHospital/uploadImageSuccess',
        payload: imageUrl,
      })
    },
    updateIcon (deg) {
      console.log(deg)
      dispatch({
        type: 'updateHospital/rotateIcon',
        payload: deg,
      })
    },
    updateImage (deg) {
      console.log(deg)
      dispatch({
        type: 'updateHospital/rotateImage',
        payload: deg,
      })
    },
    onDelete (code) {
      dispatch({
        type: 'updateHospital/delete',
        payload: code,
      })
    },
    uploadToken,
    activeKey,
    falseDocList,
    trueDocList,
    onTabsChange (key) {
      // dispatch({
      //   type: 'updateHospital/changePanes',

      // })
      let code = location.pathname.split('/')[3]
      if (key === '4') {
        dispatch({
          type: 'updateHospital/queryTrueDoc',
          payload: {
            hospitalCode: code,
            type: 1,
          },
        })
      } else if (key === '5') {
        dispatch({
          type: 'updateHospital/queryFalseDoc',
          payload: {
            hospitalCode: code,
          },
        })
      }
    },
    editDeptVisible,
    onDeptEdit (code) {
      dispatch({
        type: 'updateHospital/editDept',
        payload: {
          code: code,
        },
      })
    },
    handleDept (selectedRow) {
      console.log(selectedRow)
      dispatch({
        type: 'updateHospital/notDeptPageVisible',
      })
    },
    handleDeptCancel () {
      dispatch({
        type: 'updateHospital/notDeptPageVisible',
      })
    },
    showDeptModal () {
      console.log('a')
      dispatch({
        type: 'updateHospital/deptPageVisible',
      })
    },
    showDeptLookUpModal () {
      dispatch({
        type: 'updateHospital/deptLookUpModalVisi',
      })
    },
    onSpecialChange (record, e) {  //  医院科室列表 编辑是否医院特色
      // console.log(e.target.value)
      record.isSpecial = e.target.value
      // console.log(record)
      dispatch({
        type: 'updateHospital/editSpecialValues',
        payload: record,
      })
    },
    onRecommendChange (record, e) {  //  医院分类列表 编辑是否推荐
      console.log(e.target.value)
      record.isRecommend = e.target.value
      // console.log(record)
      dispatch({
        type: 'updateHospital/editRecommendValues',
        payload: record,
      })
    },
    onChangeSort  (record, sort) {  //  医院分类列表 编辑排序
      record.hospitalSort = sort
      console.log(record)
      dispatch({
        type: 'updateHospital/editSortValues',
        payload: record,
      })
    },
    // /////////// 医院分类参照页 /////////
    cateDataSource: cateList,
    deptPageVisible: deptPageVisible,
    rowSelection: {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (keys, selectedRow) => {
        console.log(selectedRow)
        dispatch({
          type: 'updateHospital/updateCateState',
          payload: {
            selectedRowKeys: keys,
            selectedCateRows: selectedRow,
          },
        })
      },
    },
    handleOk () {
      dispatch({
        type: 'updateHospital/editLookUpValues',
        payload: {
          lookUpCateValues: selectedRowKeys,
          selectedCateRows,
        },
      })
      dispatch({
        type: 'updateHospital/notDeptPageVisible',
      })
      console.log(`handleok:${selectedRowKeys}`)
      console.log(`handleok object:${selectedCateRows}`)
    },
      // onOk (data) {
      //   dispatch({
      //     type: `hospitalCate/${modalType}`,
      //     payload: data,
      //   })
      // },
    handleCateDelete (code) {
      console.log(code)
      dispatch({
        type: 'updateHospital/deleteLookUpValues',
        payload: code,
      })
    },
    onCateSearch (val) {
      dispatch({
        type: 'updateHospital/queryCate',
        payload: {
          keyword: val },
      })
    },
    // /////////////////////////////////////////////////////////////////////////

    // /////////// 科室参照页 /////////
    deptLookUpList: deptList,
    deptLookUpVisible, // 是否显示
    selectedDeptRowKeys,
    deptLookData, // 过滤出的子科室
    deptLookUpSelection: {
      type: 'checkbox', // 单选多选
      selectedDeptRowKeys,
      onChange: (keys, selectedRow) => {
        console.log(keys)
        dispatch({
          type: 'updateHospital/updateCateState',
          payload: {
            selectedDeptRowKeys: keys,
            selectedDeptRows: selectedRow,
          },
        })
      },
    },
    handleDeptLookOk () {
      dispatch({
        type: 'updateHospital/editDeptLookUpValues',
        payload: {
          lookUpCateValues: selectedDeptRowKeys,
          selectedDeptRows,
        },
      })
      dispatch({
        type: 'updateHospital/hideLookUpModal',
      })
      // console.log(`lookupmodal:${selectedDeptRowKeys}`)
      // console.log(selectedDeptRows)
    }, // 回掉函数
    DeptLookupCancel () {
      dispatch({
        type: 'updateHospital/hideLookUpModal',
      })
    },
    onShow (code) {
      dispatch({
        type: 'updateHospital/querySecondDept',
        payload: {
          parentCode: code,
        },
      })
    },
    handleDeptDelete (code) {
      dispatch({
        type: 'updateHospital/deleteDeptValues',
        payload: code,
      })
    },
    onDeptSearch (val) {
      dispatch({
        type: 'updateHospital/querySecondDept',
        payload: {
          keyword: val,
          parentCode: '',
        },
      })
    },
    // //////////////////////////////////////////////////////////////////////////
    handleES (code) {
      // console.log(code)
      dispatch({
        type: 'updateHospital/syncES',
        payload: {
          code: code,
        },
      })
    },
    // /////////////////////////////////// 医院地图 //////////////////////////
    openMap () {
      dispatch({
        type: 'updateHospital/visiMap',
      })
    },
    closeMap () {
      dispatch({
        type: 'updateHospital/unvisiMap',
      })
    },
    visiMap,
  }

  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <HospitalSearch {...hospitalSearchProps} />
      }
      <HospitalModal {...hospitalModalProps} />
    </div>
  )
}

hospitalUpdate.propTypes = {
  updateHospital: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ updateHospital, loading }) {
  return { updateHospital, loading }
}

export default connect(mapStateToProps)(hospitalUpdate)
