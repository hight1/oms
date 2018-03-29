import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import CasesList from '../../components/Cases/CasesList'
import CasesSearch from '../../components/Cases/CasesSearch'
import CasesAction from '../../components/Cases/CasesAction'
import CasesModal from '../../components/Cases/CasesModal'
import CasesVerifyModal from '../../components/Cases/CasesVerifyModal'

function Cases ({ cases, loading, location, dispatch }) {
  const {
    list,
    searchMode,
    keyword,
    pagination,
    currentItem,
    selectedRowKeys,
    modalVisible,
    verifyModalVisible,
    modalType,
    dataSource,
    confirmLoading,
    hospitalRank,
    hospitalCategories,
    hospitalLevels,
    hospitalRegion,
    judgeStatus,
    hospitalSpecial,
    specialName,
    uploadToken,
  } = cases

  const casesSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'cases/updateSearchMode',
        payload: {
          searchMode: 'simple',
        },
      })
    },
    onSearch (fieldsValue) {
      dispatch(
        routerRedux.push({
          pathname: '/cases',
          query: { page: 1, ...fieldsValue },
        }),
      )
    },
    onReset () {
      dispatch(
        routerRedux.push({
          pathname: '/cases',
          query: { page: 1, keyword: '' },
        }),
      )
    },
    hospitalRank,
    hospitalCategories,
    hospitalLevels,
  }

  const casesListProps = {
    pagination,
    loading: loading.effects['cases/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'cases/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    confirmLoading,
    handleCancel () {
      dispatch({
        type: 'cases/hideModal',
        payload: {
          modalVisible: false,
        },

      })
    },
    onEdit (code) {
      dispatch({
        type: 'cases/edit',
        payload: {
          code: code,
        },
      })
    },
    onDelete (code) {
      dispatch({
        type: 'cases/delete',
        payload: code,
      })
    },
    modalVisible,
    onVerify (code) {
      dispatch({
        type: 'cases/verify',
        payload: {
          code: code,
        },
      })
    },

  }

  const casesActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'cases/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'cases/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'cases/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/cases',
          query: { page: 1, keyword: kw },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/cases',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }
  const casesModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: modalType === 'create' ? loading.effects['cases/create'] : loading.effects['hospital/update'],
    title: `${modalType === 'create' ? '新增医院' : '医院更新'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `cases/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cases/hideModal',
      })
    },
    dataSource,
    hospitalRank,
    hospitalCategories,
    hospitalRegion,
    hospitalSpecial,
    getHospitalSpecial (code) {
      dispatch({
        type: 'cases/getHospitalSpecial',
        payload: code,
      })
    },
    specialName,
    uploadIconSuccess (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'cases/uploadIconSuccess',
        payload: IconUrl,
      })
    },
    uploadImageSuccess (res) {
      const imageUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'cases/uploadImageSuccess',
        payload: imageUrl,
      })
    },
    uploadToken,
  }

  const casesVerifyModalProps = {
    item: currentItem,
    visible: verifyModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['cases/update'],
    title: '医院审核',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'cases/verifyHospital',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cases/hideVerifyModal',
      })
    },
    dataSource,
    hospitalRank,
    hospitalCategories,
    handleChange (val) {
      dispatch({
        type: 'cases/change',
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
        searchMode === 'advance' && <CasesSearch {...casesSearchProps} />
      }
      <CasesAction {...casesActionProps} />
      <CasesList {...casesListProps} />
      {modalVisible && <CasesModal {...casesModalProps} />}
      {verifyModalVisible && <CasesVerifyModal {...casesVerifyModalProps} />}
    </div>
  )
}

Cases.propTypes = {
  cases: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ cases, loading }) {
  return { cases, loading }
}

export default connect(mapStateToProps)(Cases)
