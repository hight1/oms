import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import HospitalCateList from '../../components/HospitalCate/HospitalCateList'
import HospitalCateAction from '../../components/HospitalCate/HospitalCateAction'


function HospitalCate ({ hospitalCate, loading, location, dispatch }) {
  const {
   list,
    searchMode,
    keyword,
    pagination,
    // currentItem,
    selectedRowKeys,
    // modalVisible,
    // modalType,
    // hospitalName,
    // hospitalDept,
    isParent,
  } = hospitalCate


  const hospitalCateListProps = {
    pagination,
    loading: loading.effects['hospitalCate/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'hospitalCate/updateState',
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
        type: 'hospitalCate/edit',
        payload: {
          code: code,
        },
      })
    },
    onDeny (id, enable) {
      dispatch({
        type: 'hospitalCate/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'hospitalCate/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
    onDelete (code) {
      dispatch({
        type: 'hospitalCate/delete',
        payload: code,
      })
    },
    onChangeSort  (record, sort) {
      dispatch({
        type: 'hospitalCate/updateSort',
        payload: {
          record,
          sort,
        },
      })
    },
    rowClick (code) {
      dispatch({
        type: 'hospitalCate/queryChildDept',
        payload: {
          code: code,
        },
      })
      dispatch({
        type: 'hospitalCate/isNotParent',
      })
    },
    isParent,
  }

  const hospitalCateActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'hospitalCate/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'hospitalCate/multiDelete',
        payload: {
          codes: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'hospitalCate/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/hospital-cates',
          query: { page: 1, keyword: kw },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/hospital-cates',
          query: { page: 1, keyword: '' },
        }),
      )
    },
    onReturn () {
      dispatch(routerRedux.push({
        pathname: '/hospital-cates',

      }))
      dispatch({
        type: 'hospitalCate/isParent',
      })
    },
  }
  return (
    <div className="content-inner">
      <HospitalCateAction {...hospitalCateActionProps} />
      <HospitalCateList {...hospitalCateListProps} />
    </div>
  )
}

HospitalCate.propTypes = {
  hospitalCate: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ hospitalCate, loading }) {
  return { hospitalCate, loading }
}

export default connect(mapStateToProps)(HospitalCate)
