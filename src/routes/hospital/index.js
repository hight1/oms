import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import HospitalList from '../../components/Hospital/HospitalList'
import HospitalSearch from '../../components/Hospital/HospitalSearch'
import HospitalAction from '../../components/Hospital/HospitalAction'

function Hospital ({ hospital, loading, location, dispatch }) {
  const {
    list,
    searchMode,
    keyword,
    pagination,
   // currentItem,
    selectedRowKeys,
    modalVisible,
    confirmLoading,
    hospitalRank,
    hospitalCategories,
    hospitalLevels,
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

  const hospitalListProps = {
    pagination,
    loading: loading.effects['hospital/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'hospital/updateState',
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
    confirmLoading,
    handleCancel () {
      dispatch({
        type: 'hospital/hideModal',
        payload: {
          modalVisible: false,
        },

      })
    },
    onEdit (code) {
      dispatch({
        type: 'hospital/edit',
        payload: {
          code: code,
        },
      })
    },
    onDelete (code) {
      dispatch({
        type: 'hospital/multiDelete',
        payload: {
          codes: [code],
        },
      })
    },
    modalVisible,
    onVerify (code) {
      dispatch({
        type: 'hospital/verify',
        payload: {
          code: code,
        },
      })
    },

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
          codes: selectedRowKeys,
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
  // function remove (targetKey) {
  //   let activeKey1 = activeKey
  //   let lastIndex
  //   panes.forEach((pane, i) => {
  //     if (pane.key === targetKey) {
  //       lastIndex = i - 1
  //     }
  //   })
  //   const panes1 = panes.filter(pane => pane.key !== targetKey)
  //   if (lastIndex >= 0 && activeKey1 === targetKey) {
  //     activeKey1 = panes1[lastIndex].key
  //   }
  //   dispatch({
  //     type: 'hospital/removePanes',
  //     payload: {
  //       panes: panes1,
  //       activeKey: activeKey1,
  //     },
  //   })
  // }

  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <HospitalSearch {...hospitalSearchProps} />
      }
      <HospitalAction {...hospitalActionProps} />
      <HospitalList {...hospitalListProps} />
      {/* {modalVisible && <HospitalModal {...hospitalModalProps} />}
      {verifyModalVisible && <HospitalVerifyModal {...hospitalVerifyModalProps} />}
      {modalGrantVisible && <HospitalModalGrant {...hospitalModalGrantProps} />} */}
    </div>
  )
}

Hospital.propTypes = {
  hospital: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ hospital, loading }) {
  return { hospital, loading }
}

export default connect(mapStateToProps)(Hospital)
