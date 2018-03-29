import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import DoctorList from '../../components/Doctor/DoctorList'
import DoctorSearch from '../../components/Doctor/DoctorSearch'
// import DoctorAction from '../../components/Doctor/DoctorAction'


function Doctor ({ doctor, loading, dispatch }) {
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
    type,
  } = doctor
  const doctorSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'doctor/updateSearchMode',
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

  const doctorListProps = {
    type,
    handleChange (e) {
      if (e.target.value === '1') {
        dispatch({
          type: 'doctor/query',
          payload: {
            type: e.target.value,
          },
        })
        dispatch({
          type: 'doctor/changeType',
          payload: {
            type: e.target.value,
          },
        })
      } else if (e.target.value === '0') {
        dispatch({
          type: 'doctor/query',
          payload: {
            type: e.target.value,
          },
        })
        dispatch({
          type: 'doctor/changeType',
          payload: {
            type: e.target.value,
          },
        })
      }
    },
    // ////////////////// 在线医生 //////////////////
    realPagination: {
      ...pagination,
      showQuickJumper: true,
      onChange (page, pageSize) {
        dispatch({
          type: 'doctor/query',
          payload: {
            page: page,
            size: pageSize,
            type: type,
          },
        })
      },
    },
    handleTabClick (val) {
      if (val === '1') {
        dispatch({
          type: 'doctor/query',
          payload: {
            type: '1',
          },
        })
      } else if (val === '2') {
        dispatch({
          type: 'doctor/queryUndone',
        })
      } else {
        dispatch({
          type: 'doctor/queryFake',
        })
      }
    },
    loading: loading.effects['doctor/query'],
    loading1: loading.effects['doctor/queryFake'],
    loading2: loading.effects['doctor/queryUndone'],
    realDataSource: list,
    selectedRowKeys,
    realRowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'doctor/updateState',
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
    onQuery (code) {
      dispatch({
        type: 'doctor/edit',
        payload: {
          code: code,
        },
      })
    },
    onDeny (id, enable) {
      dispatch({
        type: 'doctor/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'doctor/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
    onDelete () {
      dispatch({
        type: 'doctor/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onCreate () {
      dispatch(routerRedux.push({
        pathname: '/doctors/edit/new',

      }))
    },
    // ///////////////////////// 离线医生 //////////////////
    fakeRowSelection: {
      selectedFakeKeys,
      onChange: (keys) => {
        console.log(selectedFakeKeys)
        dispatch({
          type: 'doctor/updateFakeState',
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
          type: 'doctor/queryFake',
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
    //     type: 'doctor/queryFake',
    //     payload: {
    //       page: page.current,
    //       size: page.pageSize,
    //     },
    //   })
    // },
    onFakeQuery (code) {
      dispatch({
        type: 'fakeDoctor/editFake',
        payload: {
          code: code,
        },
      })
      // dispatch({
      //   type: 'doctor/showFakeModal',
      // })
    },
    deleteOffline () {
      dispatch({
        type: 'doctor/multiFakeDelete',
        payload: {
          uids: selectedFakeKeys,
        },
      })
    },
    addOffline () {
      dispatch({
        type: 'fakeDoctor/createSuccess',
        payload: {
          currentItem: {},
          modalType: 'create',
        },
      })
      dispatch(
        {
          type: 'fakeDoctor/fetchUploadToken',
          payload: {
            bucket: 'jkgj-hosp',
          },
        }
      )
      dispatch(routerRedux.push({
        pathname: '/doctors/editFake/new',
      }))
    },
    // /////////////////////////// 未完善医生 ///////////////////
    undoneDataSource: undoneList,
    undoneRowSelection: {
      undoneSelectedKeys,
      onChange: (keys) => {
        console.log(keys)
        dispatch({
          type: 'doctor/updateState',
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
          type: 'doctor/queryUndone',
          payload: {
            page: page,
            size: pageSize,
          },
        })
      },
    },
    deleteUndone () {
      dispatch({
        type: 'doctor/multiDelete',
        payload: {
          undoneSelectedKeys: undoneSelectedKeys,
        },
      })
    },
    onUndoneQuery (uid) {
      dispatch({
        type: 'undoneDoctor/editUndone',
        payload: {
          uid: uid,
        },
      })
      dispatch(
        {
          type: 'undoneDoctor/fetchUploadToken',
          payload: {
            bucket: 'jkgj-hosp',
          },
        }
      )
      dispatch(routerRedux.push({
        pathname: `/doctors/editUndone/${uid}`,
      }))
    },
    // /////////////医生搜索/////////
    onFakeSearch (kw) {
      dispatch({
        type: 'doctor/queryFake',
        payload: {
          keyword: kw,
          page: 1,
          pageSize: 1000,
        },
      })
    },
    onSearch (kw) {
      // dispatch(
      //   routerRedux.push({
      //     pathname: '/doctors',
      //     query: { keyword: kw },
      //   }),
      // )
      dispatch({
        type: 'doctor/query',
        payload: {
          keyword: kw,
          pageSize: 1000,
          type: type,
        },
      })
    },
    onUndoneSearch (kw) {
      dispatch({
        type: 'doctor/queryUndone',
        payload: {
          keyword: kw,
          page: 1,
          pageSize: 1000,
        },
      })
    },
  }

  // const doctorActionProps = {
  //   searchMode,
  //   keyword,
  //   selectedRowKeys,
  //   onCreate () {
  //     dispatch({
  //       type: 'doctor/showModal',
  //       payload: {
  //         modalType: 'create',
  //       },
  //     })
  //   },
  //   onBatchDelete () {
  //     dispatch({
  //       type: 'doctor/multiDelete',
  //       payload: {
  //         ids: selectedRowKeys,
  //       },
  //     })
  //   },
  //   onAdvanceSearchMode () {
  //     dispatch({
  //       type: 'doctor/updateSearchMode',
  //       payload: {
  //         searchMode: 'advance',
  //       },
  //     })
  //   },
  //   onSearch (kw) {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/doctors',
  //         query: { page: 1, keyword: kw },
  //       }),
  //     )
  //   },
  //   onResetSearch () {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/doctors',
  //         query: { page: 1, keyword: '' },
  //       }),
  //     )
  //   },
  // }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <DoctorSearch {...doctorSearchProps} />
      }
      {/* <DoctorAction {...doctorActionProps} /> */}
      <DoctorList {...doctorListProps} />

    </div>
  )
}

Doctor.propTypes = {
  doctor: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ undoneDoctor, fakeDoctor, doctor, loading }) {
  return { undoneDoctor, fakeDoctor, doctor, loading }
}

export default connect(mapStateToProps)(Doctor)
