import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import DiseasesList from '../../components/Diseases/DiseasesList'
import DiseasesSearch from '../../components/Diseases/DiseasesSearch'
import DiseasesAction from '../../components/Diseases/DiseasesAction'
import DiseasesModal from '../../components/Diseases/DiseasesModal'

function Diseases ({ diseases, auth, loading, location, dispatch }) {
  const {
   list,
    searchMode,
    keyword,
    pagination,
    currentItem,
    selectedRowKeys,
    modalVisible,
    modalType,
    value,
    hospitalSpecial,
  } = diseases

  const currentUser = auth.user

  const diseaseSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'diseases/updateSearchMode',
        payload: {
          searchMode: 'simple',
        },
      })
    },
    onSearch (fieldsValue) {
      dispatch(
        routerRedux.push({
          pathname: '/diseases',
          query: { page: 1, ...fieldsValue },
        }),
      )
    },
    onReset () {
      dispatch(
        routerRedux.push({
          pathname: '/diseases',
          query: { page: 1, keyword: '' },
        }),
      )
    },
    value,
    hospitalSpecial,
  }

  const diseaseListProps = {
    pagination,
    loading: loading.effects['diseases/query'],
    currentUser,
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'diseases/updateState',
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
          size: page.pageSize,
        },
      }))
    },
    onEdit (code) {
      dispatch({
        type: 'diseases/edit',
        payload: {
          code: code,
        },
      })
    },
    onDeny (id, enable) {
      dispatch({
        type: 'diseases/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'diseases/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
    onDelete (code) {
      dispatch({
        type: 'diseases/delete',
        payload: code,
      })
    },
  }

  const diseaseActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'diseases/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'diseases/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'diseases/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/diseases',
          query: { page: 1, keyword: kw },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/diseases',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }
  const diseaseModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['diseases/update'],
    title: `${modalType === 'create' ? '新增疾病' : '疾病更新'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `diseases/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'diseases/hideModal',
      })
    },
    hospitalSpecial,
  }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <DiseasesSearch {...diseaseSearchProps} />
      }
      <DiseasesAction {...diseaseActionProps} />
      <DiseasesList {...diseaseListProps} />
      {modalVisible && <DiseasesModal {...diseaseModalProps} />}
    </div>
  )
}

Diseases.propTypes = {
  diseases: PropTypes.object,
  auth: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ diseases, auth, loading }) {
  return { diseases, auth, loading }
}

export default connect(mapStateToProps)(Diseases)
