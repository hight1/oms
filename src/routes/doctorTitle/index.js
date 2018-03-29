import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import DoctorTitleList from '../../components/DoctorTitleVerify/DoctorTitleList'
import DoctorTitleSearch from '../../components/DoctorTitleVerify/DoctorTitleSearch'
import DoctorTitleAction from '../../components/DoctorTitleVerify/DoctorTitleAction'

function DoctorTitleS ({ DoctorTitle, auth, loading, location, dispatch }) {
  const {
    list,
    searchMode,
    keyword,
    pagination,
    // currentItem,
    selectedRowKeys,
    type,
    // modalVisible,
    // QuerymodalVisible,
    // modalType,
    // judgeStatus,
    // vcPriceDisable,
      // vcPriceList,
  } = DoctorTitle

  const currentUser = auth.user

  const DoctorTitleSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'DoctorTitle/updateSearchMode',
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
          pathname: '/title-auths',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }

  const DoctorTitleListProps = {
    pagination,
    loading: loading.effects['DoctorTitle/query'],
    currentUser,
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'DoctorTitle/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    onPageChange (page) {
      const { query } = location
      dispatch({
        type: 'DoctorTitle/query',
        payload: {
          page: page.current,
          pageSize: page.pageSize,
          status: type,
          ...query,
        },
      })
    },
    onEdit (code) {
      dispatch({
        type: 'DoctorTitle/edit',
        payload: {
          code: code,
        },
      })
    },
    onQuery (code) {
      dispatch({
        type: 'DoctorTitle/queryDoctorTitle',
        payload: {
          code: code,
        },
      })
    },
    onDelete (id) {
      dispatch({
        type: 'DoctorTitle/delete',
        payload: id,
      })
    },
  }

  const DoctorTitleActionProps = {
    type,
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'DoctorTitle/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'DoctorTitle/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'DoctorTitle/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch({
        type: 'DoctorTitle/query',
        payload: {
          status: type,
          page: 1,
          keyword: kw,
        },
      })
    },
    onResetSearch () {
      dispatch({
        type: 'DoctorTitle/query',
        payload: {
          status: type,
          page: 1,
          keyword: '',
        },
      })
    },
    handleChange (e) {
      dispatch({
        type: 'DoctorTitle/query',
        payload: {
          status: e.target.value,
        },
      })
      dispatch({
        type: 'DoctorTitle/changeType',
        payload: {
          type: e.target.value,
        },
      })
    },
  }


  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <DoctorTitleSearch {...DoctorTitleSearchProps} />
      }
      <DoctorTitleAction {...DoctorTitleActionProps} />
      <DoctorTitleList {...DoctorTitleListProps} />
    </div>
  )
}

DoctorTitleS.propTypes = {
  DoctorTitle: PropTypes.object,
  auth: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ DoctorTitle, auth, loading }) {
  return { DoctorTitle, auth, loading }
}

export default connect(mapStateToProps)(DoctorTitleS)
