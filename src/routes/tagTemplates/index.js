import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import TagTemplatesList from '../../components/TagTemplates/TagTemplatesList'
import TagTemplatesSearch from '../../components/TagTemplates/TagTemplatesSearch'
// import TagTemplatesAction from '../../components/TagTemplates/TagTemplatesAction'


function TagTemplates ({ tagTemplates, loading, dispatch }) {
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
  } = tagTemplates
  const tagTemplatesSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'tagTemplates/updateSearchMode',
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
          pathname: '/tagTemplates',
          query: { page: 1, keyword: '' },
        }),
      )
    },
    value,
  }

  const tagTemplatesListProps = {
    tabList,
    realPagination: {
      ...pagination,
      showQuickJumper: true,
      onChange (page, pageSize) {
        dispatch({
          type: 'tagTemplates/query',
          payload: {
            page: page,
            size: pageSize,
          },
        })
      },
    },
    handleTabClick (val) {
      dispatch({
        type: 'tagTemplates/query',
        payload: {
          type: val,
        },
      })
    },
    loading: loading.effects['tagTemplates/query'],
    realDataSource: list,
    selectedRowKeys,
    realRowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'tagTemplates/updateState',
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
    onQuery () {
      // dispatch({
      //   type: 'tagTemplates/edit',
      //   payload: {
      //     code: code,
      //   },
      // })
    },
    onDeny (id, enable) {
      dispatch({
        type: 'tagTemplates/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'tagTemplates/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
    onDelete (val) {
      dispatch({
        type: 'tagTemplates/multiDelete',
        payload: {
          codes: selectedRowKeys,
          type: `${val}`,
        },
      })
    },
    onCreate () {
      dispatch(routerRedux.push({
        pathname: '/tag-templates/edit/new',

      }))
      dispatch({
        type: 'tagTemplates/updateQueryKey',
        payload: {
          currentItem: {},
        },
      })
    },
    // ///////////////////////// 离线医生 //////////////////
    fakeRowSelection: {
      selectedFakeKeys,
      onChange: (keys) => {
        console.log(selectedFakeKeys)
        dispatch({
          type: 'tagTemplates/updateFakeState',
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
          type: 'tagTemplates/queryFake',
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
    //     type: 'tagTemplates/queryFake',
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
      //   type: 'tagTemplates/showFakeModal',
      // })
    },
    deleteOffline () {
      console.log(selectedFakeKeys)
      dispatch({
        type: 'tagTemplates/multiFakeDelete',
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
        pathname: '/tagTemplates/editFake/new',
      }))
    },
    // /////////////////////////// 未完善医生 ///////////////////
    undoneDataSource: undoneList,
    undoneRowSelection: {
      undoneSelectedKeys,
      onChange: (keys) => {
        console.log(keys)
        dispatch({
          type: 'tagTemplates/updateState',
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
          type: 'tagTemplates/queryUndone',
          payload: {
            page: page,
            size: pageSize,
          },
        })
      },
    },
    deleteUndone () {
      dispatch({
        type: 'tagTemplates/multiDelete',
        payload: {
          undoneSelectedKeys: undoneSelectedKeys,
        },
      })
    },
    onUndoneQuery (code) {
      dispatch({
        type: 'undoneDoctor/editUndone',
        payload: {
          code: code,
        },
      })
    },
  }

  // const tagTemplatesActionProps = {
  //   searchMode,
  //   keyword,
  //   selectedRowKeys,
  //   onCreate () {
  //     dispatch({
  //       type: 'tagTemplates/showModal',
  //       payload: {
  //         modalType: 'create',
  //       },
  //     })
  //   },
  //   onBatchDelete () {
  //     dispatch({
  //       type: 'tagTemplates/multiDelete',
  //       payload: {
  //         ids: selectedRowKeys,
  //       },
  //     })
  //   },
  //   onAdvanceSearchMode () {
  //     dispatch({
  //       type: 'tagTemplates/updateSearchMode',
  //       payload: {
  //         searchMode: 'advance',
  //       },
  //     })
  //   },
  //   onSearch (kw) {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/tagTemplates',
  //         query: { page: 1, keyword: kw },
  //       }),
  //     )
  //   },
  //   onResetSearch () {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/tagTemplates',
  //         query: { page: 1, keyword: '' },
  //       }),
  //     )
  //   },
  // }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <TagTemplatesSearch {...tagTemplatesSearchProps} />
      }
      {/* <TagTemplatesAction {...tagTemplatesActionProps} /> */}
      <TagTemplatesList {...tagTemplatesListProps} />

    </div>
  )
}

TagTemplates.propTypes = {
  tagTemplates: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ undoneDoctor, fakeDoctor, tagTemplates, loading }) {
  return { undoneDoctor, fakeDoctor, tagTemplates, loading }
}

export default connect(mapStateToProps)(TagTemplates)
