import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import DoctorSearch from '../../../components/Doctor/DoctorSearch'
import DoctorFakeModal from '../../../components/Doctor/DoctorFakeModal'


function FakeDoctor ({ fakeDoctor, loading, /* location,*/ dispatch }) {
  const {
  // list,
    searchMode,
    keyword,
    cateList,
    currentItem,
    pagination,
    selectedRowKeys,
    // modalVisible,
    modalType,
    targetKeys,
    dataSource,
    selectedKeys,
    value,
    deptPageVisible,
    selectedCateRows,
    deptLookUpVisible,
    selectedDeptRowKeys,
    selectedDeptRows,
    deptLookData,
    deptList,
    setDept,
    setHospital,
    uploadToken,
    isOK,
    isES,
    titleList,
  } = fakeDoctor

  const doctorSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'fakeDoctor/updateSearchMode',
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
          pathname: '/doctors',
          query: { page: 1, keyword: '' },
        }),
      )
    },
    value,
  }
  const doctorFakeModalProps = {
    isOK,
    isES,
    titleList,
    currentItem,
    modalType,
    item: modalType === 'create' ? currentItem : currentItem,
    type: modalType,
    // visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['fakeDoctor/editFake'],
    // title: `${modalType === 'create' ? '创建用户' : '医生信息详情'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      if (data.code) {
        dispatch({
          type: 'fakeDoctor/update',
          payload: data,
        })
        dispatch({
          type: 'fakeDoctor/changeOK',
          payload: {
            isOK: true,
          },
        })
        // dispatch(
        //   routerRedux.push({
        //     pathname: '/doctors',
        //     query: { page: 1, keyword: '' },
        //   }),
        // )
      } else {
        dispatch({
          type: 'fakeDoctor/create',
          payload: data,
        })
        // dispatch(
        //   routerRedux.push({
        //     pathname: '/doctors',
        //     query: { page: 1, keyword: '' },
        //   }),
        // )
      }
    },
    onChangeHospitalName (old, newHospitalName) {
      dispatch({
        type: 'fakeDoctor/changeHospitalName',
        payload: {
          old,
          newHospitalName,
        },
      })
    },
    dataSource,
    targetKeys,
    selectedKeys,
    changeModalType () {
      dispatch({
        type: 'fakeDoctor/hideModal',
      })
    },
    // ////////// 头像图片 ///////////
    uploadIconSuccess (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'fakeDoctor/uploadIconSuccess',
        payload: IconUrl,
      })
    },
    uploadToken,
    updateImage (deg) {
      dispatch({
        type: 'fakeDoctor/getRotateImg',
        payload: {
          deg,
        },
      })
    },
    // /////////// 医院分类参照页 /////////
    setHospital,
    cateDataSource: cateList,
    deptPageVisible: deptPageVisible,
    rowSelection: {
      type: 'radio',
      selectedRowKeys,
      onChange: (keys, selectedRow) => {
        console.log(selectedRow)
        dispatch({
          type: 'fakeDoctor/updateCateState',
          payload: {
            selectedRowKeys: keys,
            selectedCateRows: selectedRow,
          },
        })
      },
    },
    handleOk () {
      // dispatch({
      //   type: 'fakeDoctor/editLookUpValues',
      //   payload: {
      //     lookUpCateValues: selectedRowKeys,
      //     selectedCateRows,
      //   },
      // })
      dispatch({
        type: 'fakeDoctor/editHospital',
        payload: {
          setHospital: selectedCateRows,
        },
      })
      dispatch({
        type: 'fakeDoctor/notDeptPageVisible',
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
    handleCateDelete (code) {
      console.log(code)
      dispatch({
        type: 'fakeDoctor/deleteLookUpValues',
        payload: code,
      })
    },
    showCateModal () {
      console.log('a')
      dispatch({
        type: 'fakeDoctor/queryCate',
        payload: {},
      })
      dispatch({
        type: 'fakeDoctor/deptPageVisible',
      })
    },
    handleDeptCancel () {
      dispatch({
        type: 'fakeDoctor/notDeptPageVisible',
      })
    },
    onRecommendChange (record, e) {  //  医院分类列表 编辑是否推荐
      console.log(e.target.value)
      record.isRecommend = e.target.value
      // console.log(record)
      dispatch({
        type: 'fakeDoctor/editRecommendValues',
        payload: record,
      })
    },
    onChangeSort  (record, sort) {  //  医院分类列表 编辑排序
      record.hospitalSort = sort
      console.log(record)
      dispatch({
        type: 'fakeDoctor/editSortValues',
        payload: record,
      })
    },
    HospitalPagination: {
      ...pagination,
      onChange (page, pageSize) {
        dispatch({
          type: 'fakeDoctor/queryCate',
          payload: { page, pageSize },
        })
      },
    },
    onHosiSearch (val) {
      dispatch({
        type: 'fakeDoctor/queryCate',
        payload: { keyword: val },
      })
    },
    // /////////////////////////////////////////////////////////////////////////

    // /////////// 科室参照页 /////////
    setDept,
    deptLookUpList: deptList,
    deptLookUpVisible, // 是否显示
    selectedDeptRowKeys,
    deptLookData, // 过滤出的子科室
    deptLookUpSelection: {
      type: 'radio', // 单选多选
      selectedDeptRowKeys,
      onChange: (keys, selectedRow) => {
        console.log(keys)
        dispatch({
          type: 'fakeDoctor/updateCateState',
          payload: {
            selectedDeptRowKeys: keys,
            selectedDeptRows: selectedRow,
          },
        })
      },
    },
    handleDeptLookOk () {
      // dispatch({
      //   type: 'fakeDoctor/editDeptLookUpValues',
      //   payload: {
      //     lookUpCateValues: selectedDeptRowKeys,
      //     selectedDeptRows,
      //   },
      // })
      dispatch({
        type: 'fakeDoctor/editDept',
        payload: {
          setDept: selectedDeptRows,
        },
      })
      dispatch({
        type: 'fakeDoctor/hideLookUpModal',
      })
      // console.log(`lookupmodal:${selectedDeptRowKeys}`)
      // console.log(selectedDeptRows)
    }, // 回掉函数
    DeptLookupCancel () {
      dispatch({
        type: 'fakeDoctor/hideLookUpModal',
      })
    },
    onShow (code) {
      dispatch({
        type: 'fakeDoctor/querySecondDept',
        payload: {
          parentCode: code,
        },
      })
    },
    handleDeptDelete (code) {
      console.log(code)
      dispatch({
        type: 'fakeDoctor/deleteDeptValues',
        payload: code,
      })
    },
    showDeptLookUpModal () {
      dispatch({
        type: 'fakeDoctor/deptLookUpModalVisi',
      })
      dispatch({
        type: 'fakeDoctor/queryDept',
      })
    },
    onSpecialChange (record, e) {  //  医院科室列表 编辑是否医院特色
      // console.log(e.target.value)
      record.isSpecial = e.target.value
      // console.log(record)
      dispatch({
        type: 'fakeDoctor/editSpecialValues',
        payload: record,
      })
    },
    onDeptSearch (val) {
      dispatch({
        type: 'fakeDoctor/querySecondDept',
        payload: {
          keyword: val,
          parentCode: '',
        },
      })
    },
    // //////////////////////////////////////////////////////////////////////////
    handleES (code) {
      dispatch({
        type: 'fakeDoctor/syncES',
        payload: {
          code: code,
        },
      })
    },
  }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <DoctorSearch {...doctorSearchProps} />
      }
      <DoctorFakeModal {...doctorFakeModalProps} />
    </div>
  )
}

FakeDoctor.propTypes = {
  fakeDoctor: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ fakeDoctor, loading }) {
  return { fakeDoctor, loading }
}

export default connect(mapStateToProps)(FakeDoctor)
