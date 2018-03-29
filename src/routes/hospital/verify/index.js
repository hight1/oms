import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import HospitalSearch from '../../../components/Hospital/HospitalSearch'
import HospitalAction from '../../../components/Hospital/HospitalAction'
import HospitalVerifyModal from '../../../components/Hospital/HospitalVerifyModal'

function Hospital ({ hospital, loading, dispatch }) {
  const {
    searchMode,
    keyword,
    currentItem,
    selectedRowKeys,
    verifyModalVisible,
    dataSource,
    hospitalRank,
    hospitalCategories,
    hospitalLevels,
    judgeStatus,
  } = hospital

  const hospitalSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'hospital/updateSearchMode',
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

  const hospitalActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'hospital/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'hospital/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'hospital/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/hospitals',
          query: { page: 1, keyword: kw },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/hospitals',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }
  // const hospitalModalProps = {
  //   pagination,
  //   loading: loading.effects['hospital/query'],
  //   item: modalType === 'create' ? {} : currentItem,
  //   type: modalType,
  //   visible: modalVisible,
  //   maskClosable: false,
  //   confirmLoading: modalType === 'create' ? loading.effects['hospitals/create'] : loading.effects['hospitals/update'],
  //   title: `${modalType === 'create' ? '新增医院' : '医院更新'}`,
  //   wrapClassName: 'vertical-center-modal',
  //   onOk (data) {
  //     dispatch({
  //       type: `hospital/${modalType}`,
  //       payload: data,
  //     })
  //   },
  //   onCancel () {
  //     dispatch({
  //       type: 'hospital/hideModal',
  //     })
  //   },
  //   dataSource,
  //   deptDataSource: deptList,
  //   hospitalRank,
  //   hospitalCategories,
  //   hospitalRegion,
  //   hospitalSpecial,
  //   getHospitalSpecial (code) {
  //     dispatch({
  //       type: 'hospital/getHospitalSpecial',
  //       payload: code,
  //     })
  //   },
  //   specialName,
  //   uploadIconSuccess (res) {
  //     const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
  //     dispatch({
  //       type: 'hospital/uploadIconSuccess',
  //       payload: IconUrl,
  //     })
  //   },
  //   uploadImageSuccess (res) {
  //     const imageUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
  //     dispatch({
  //       type: 'hospital/uploadImageSuccess',
  //       payload: imageUrl,
  //     })
  //   },
  //   uploadToken,
  //   panes,
  //   activeKey,
  //   add (record) {
  //     panes.push({ title: record.name, content: `New Tab Pane${record.code}`, key: record.code })
  //     dispatch({
  //       type: 'hospital/addPanes',
  //       payload: record,
  //     })
  //   },
  //   onEditTabs (targetKey, action) {
  //     console.log(action)
  //     remove(targetKey)
  //   },
  //   onTabsChange (activeKey1) {
  //     dispatch({
  //       type: 'hospital/changePanes',
  //       payload: activeKey1,

  //     })
  //   },
  // }

  const hospitalVerifyModalProps = {
    item: currentItem,
    visible: verifyModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['hospitals/update'],
    title: '医院审核',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'hospital/verifyHospital',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'hospital/hideVerifyModal',
      })
    },
    dataSource,
    hospitalRank,
    hospitalCategories,
    handleChange (val) {
      dispatch({
        type: 'hospital/change',
        payload: {
          judgeStatus: val,
        },
      })
    },
    judgeStatus,
  }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <HospitalSearch {...hospitalSearchProps} />
      }
      <HospitalAction {...hospitalActionProps} />
      <HospitalVerifyModal {...hospitalVerifyModalProps} />
    </div>
  )
}

Hospital.propTypes = {
  hospital: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ hospital, loading }) {
  return { hospital, loading }
}

export default connect(mapStateToProps)(Hospital)
