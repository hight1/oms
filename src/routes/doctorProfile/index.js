import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import DoctorProfileList from '../../components/DoctorProfile/DoctorProfileList'
import DoctorProfileSearch from '../../components/DoctorProfile/DoctorProfileSearch'
import DoctorProfileAction from '../../components/DoctorProfile/DoctorProfileAction'

function DoctorProfileS ({ doctorProfile, auth, loading, location, dispatch }) {
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
  } = doctorProfile

  const currentUser = auth.user

  const DoctorProfileSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'doctorProfile/updateSearchMode',
        payload: {
          searchMode: 'simple',
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/doctor-profiles',
          query: {
            page: 1,
            keyword: kw,
            status: type,
          },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/doctor-profiles',
          query: {
            page: 1,
            keyword: '',
            status: type,
          },
        }),
      )
    },
  }

  const DoctorProfileListProps = {
    pagination,
    loading: loading.effects['doctorProfile/query'],
    currentUser,
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'doctorProfile/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    onPageChange (page) {
      const { query } = location
      dispatch({
        type: 'doctorProfile/query',
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
        type: 'doctorProfile/edit',
        payload: {
          code: code,
        },
      })
    },
    onQuery (code) {
      dispatch({
        type: 'doctorProfile/queryDoctorProfile',
        payload: {
          code: code,
        },
      })
    },
    onDelete (id) {
      dispatch({
        type: 'doctorProfile/delete',
        payload: id,
      })
    },
  }

  const DoctorProfileActionProps = {
    type,
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'doctorProfile/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'doctorProfile/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'doctorProfile/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch({
        type: 'doctorProfile/query',
        payload: {
          status: type,
          page: 1,
          keyword: kw,
        },
      })
    },
    onResetSearch () {
      dispatch({
        type: 'doctorProfile/query',
        payload: {
          status: type,
          page: 1,
          keyword: '',
        },
      })
    },
    handleChange (e) {
      dispatch({
        type: 'doctorProfile/query',
        payload: {
          status: e.target.value,
        },
      })
      dispatch({
        type: 'doctorProfile/changeType',
        payload: {
          type: e.target.value,
        },
      })
    },
  }


  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <DoctorProfileSearch {...DoctorProfileSearchProps} />
      }
      <DoctorProfileAction {...DoctorProfileActionProps} />
      <DoctorProfileList {...DoctorProfileListProps} />
    </div>
  )
}

DoctorProfileS.propTypes = {
  doctorProfile: PropTypes.object,
  auth: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ doctorProfile, auth, loading }) {
  return { doctorProfile, auth, loading }
}

export default connect(mapStateToProps)(DoctorProfileS)
