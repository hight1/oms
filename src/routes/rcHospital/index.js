import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import RCHospitalList from '../../components/RCHospital/RCHospitalList'
import RCHospitalSearch from '../../components/RCHospital/RCHospitalSearch'
import RCHospitalAction from '../../components/RCHospital/RCHospitalAction'


function RCHospital ({ rcHospital, loading, dispatch }) {
  const {
   list,
    searchMode,
    keyword,
    pagination,
    // currentItem,
    selectedRowKeys,
    // modalVisible,
    // modalType,
    // targetKeys,
    // dataSource,
    // selectedKeys,
    value,
    selectedFakeKeys,
    fakeList,
    undoneList,
    undoneSelectedKeys,
    tabList,
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

  const rcHospitalListProps = {
    tabList,
    realPagination: {
      ...pagination,
      showQuickJumper: true,
      onChange (page, pageSize) {
        dispatch({
          type: 'rcHospital/query',
          payload: {
            page: page,
            size: pageSize,
          },
        })
      },
    },
    handleTabClick (val) {
      dispatch({
        type: 'rcHospital/query',
        payload: {
          type: val,
        },
      })
    },
    loading: loading.effects['rcHospital/query'],
    realDataSource: list,
    selectedRowKeys,
    realRowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'rcHospital/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    // onRealPageChange (page) {
    //   const { query, pathname } = location
    //   dispatch(routerRedux.push({
    //     pathname,
    //     query: {
    //       ...query,
    //       page: page.current,
    //       size: page.pageSize,
    //     },
    //   }))
    // },
    onQuery (uid) {
      dispatch({
        type: 'rcHospital/edit',
        payload: {
          uid: uid,
        },
      })
    },
    onDeny (id, enable) {
      dispatch({
        type: 'rcHospital/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'rcHospital/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
    // ///////////////////////// 离线医生 //////////////////
    fakeRowSelection: {
      selectedFakeKeys,
      onChange: (keys) => {
        console.log(selectedFakeKeys)
        dispatch({
          type: 'rcHospital/updateFakeState',
          payload: {
            selectedFakeKeys: keys,
          },
        })
      },
    },
    fakeDataSource: fakeList,
    fakePagination: {
      ...pagination,
      showQuickJumper: true,
      onChange (page, pageSize) {
        dispatch({
          type: 'rcHospital/queryFake',
          payload: {
            page: page,
            size: pageSize,
          },
        })
      },
    },
    // onFakePageChange (page) {
    //   console.log(page)
    //   dispatch({
    //     type: 'rcHospital/queryFake',
    //     payload: {
    //       page: page.current,
    //       size: page.pageSize,
    //     },
    //   })
    // },
    onIllQuery (code) {
      dispatch({
        type: 'fakeDoctor/editFake',
        payload: {
          code: code,
        },
      })
      // dispatch({
      //   type: 'rcHospital/showFakeModal',
      // })
    },
    deleteOffline () {
      console.log(selectedFakeKeys)
      dispatch({
        type: 'rcHospital/multiFakeDelete',
        payload: {
          uids: selectedFakeKeys,
        },
      })
    },
    // /////////////////////////// 未完善医生 ///////////////////
    undoneDataSource: undoneList,
    undoneRowSelection: {
      undoneSelectedKeys,
      onChange: (keys) => {
        console.log(keys)
        dispatch({
          type: 'rcHospital/updateState',
          payload: {
            undoneSelectedKeys: keys,
          },
        })
      },
    },
    undonePagination: {
      ...pagination,
      showQuickJumper: true,
      onChange (page, pageSize) {
        dispatch({
          type: 'rcHospital/queryUndone',
          payload: {
            page: page,
            size: pageSize,
          },
        })
      },
    },
    deleteUndone () {
      dispatch({
        type: 'rcHospital/multiDelete',
        payload: {
          undoneSelectedKeys: undoneSelectedKeys,
        },
      })
    },
  }

  const rcHospitalActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    onDelete () {
      dispatch({
        type: 'rcHospital/multiDelete',
        payload: {
          uids: selectedRowKeys,
        },
      })
    },
    onCreate () {
      dispatch(routerRedux.push({
        pathname: '/rc-hospital/edit/new',
      }))
    },
    onBatchDelete () {
      dispatch({
        type: 'rcHospital/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'rcHospital/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch({
        type: 'rcHospital/query',
        payload: {
          keyword: kw,
        },
      })
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/rc-hospital',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <RCHospitalSearch {...rcHospitalSearchProps} />
      }
      <RCHospitalAction {...rcHospitalActionProps} />
      <RCHospitalList {...rcHospitalListProps} />

    </div>
  )
}

RCHospital.propTypes = {
  rcHospital: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ rcHospital, loading }) {
  return { rcHospital, loading }
}

export default connect(mapStateToProps)(RCHospital)
