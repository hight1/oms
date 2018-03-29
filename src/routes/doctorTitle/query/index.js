import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import DoctorTitleModal from '../../../components/DoctorTitleVerify/DoctorTitleModal'

function VerifyDoctorTitle ({ queryDoctorTitle,  /* auth,*/ loading, dispatch }) {
  const {
    // list,
    // searchMode,
    // keyword,
    // pagination,
    currentItem,
    // selectedRowKeys,
    // modalVisible,
    QuerymodalVisible,
    modalType,
    // judgeStatus,
    // vcPriceDisable,
      // vcPriceList,
  } = queryDoctorTitle

  // const currentUser = auth.user

  // const DoctorTitleSearchProps = {
  //   keyword,
  //   onSimpleSearchMode () {
  //     dispatch({
  //       type: 'queryDoctorTitle/updateSearchMode',
  //       payload: {
  //         searchMode: 'simple',
  //       },
  //     })
  //   },
  //   onSearch (fieldsValue) {
  //     console.log(fieldsValue)
  //   },
  //   onReset () {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/doctors/title-auths',
  //         query: { page: 1, keyword: '' },
  //       }),
  //     )
  //   },
  // }

  // const DoctorTitleListProps = {
  //   pagination,
  //   loading: loading.effects['queryDoctorTitle/query'],
  //   currentUser,
  //   dataSource: list,
  //   selectedRowKeys,
  //   rowSelection: {
  //     selectedRowKeys,
  //     onChange: (keys) => {
  //       dispatch({
  //         type: 'queryDoctorTitle/updateState',
  //         payload: {
  //           selectedRowKeys: keys,
  //         },
  //       })
  //     },
  //   },
  //   onPageChange (page) {
  //     const { query, pathname } = location
  //     dispatch(routerRedux.push({
  //       pathname,
  //       query: {
  //         ...query,
  //         page: page.current,
  //         size: page.pageSize,
  //       },
  //     }))
  //   },
  //   onEdit (code) {
  //     dispatch({
  //       type: 'queryDoctorTitle/edit',
  //       payload: {
  //         code: code,
  //       },
  //     })
  //   },
  //   onQuery (code) {
  //     dispatch({
  //       type: 'queryDoctorTitle/queryDoctorTitle',
  //       payload: {
  //         code: code,
  //       },
  //     })
  //   },
  //   onDelete (id) {
  //     dispatch({
  //       type: 'queryDoctorTitle/delete',
  //       payload: id,
  //     })
  //   },
  // }

  // const DoctorTitleActionProps = {
  //   searchMode,
  //   keyword,
  //   selectedRowKeys,
  //   onCreate () {
  //     dispatch({
  //       type: 'queryDoctorTitle/showModal',
  //       payload: {
  //         modalType: 'create',
  //       },
  //     })
  //   },
  //   onBatchDelete () {
  //     dispatch({
  //       type: 'queryDoctorTitle/multiDelete',
  //       payload: {
  //         ids: selectedRowKeys,
  //       },
  //     })
  //   },
  //   onAdvanceSearchMode () {
  //     dispatch({
  //       type: 'queryDoctorTitle/updateSearchMode',
  //       payload: {
  //         searchMode: 'advance',
  //       },
  //     })
  //   },
  //   onSearch (kw) {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/doctors/title-auths',
  //         query: { page: 1, keyword: kw },
  //       }),
  //     )
  //   },
  //   onResetSearch () {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/doctors/title-auths',
  //         query: { page: 1, keyword: '' },
  //       }),
  //     )
  //   },
  // }

  // const DoctorTitleVerifyModalProps = {
  //   item: modalType === 'create' ? {} : currentItem,
  //   type: modalType,
  //   visible: modalVisible,
  //   maskClosable: false,
  //   confirmLoading: loading.effects['users/update'],
  //   title: `${modalType === 'create' ? '创建用户' : '认证职称'}`,
  //   wrapClassName: 'vertical-center-modal',
  //   onOk (data) {
  //     dispatch({
  //       type: 'queryDoctorTitle/update',
  //       payload: data,
  //     })
  //     dispatch({
  //       type: 'queryDoctorTitle/notEditVcPrice',
  //     })
  //   },
  //   onCancel () {
  //     dispatch({
  //       type: 'queryDoctorTitle/hideModal',
  //     })
  //     dispatch({
  //       type: 'queryDoctorTitle/notEditVcPrice',
  //     })
  //   },
  //   handleChange (val) {
  //     const value = val
  //     dispatch({
  //       type: 'queryDoctorTitle/changeTextarea',
  //       payload: {
  //         judgeStatus: value,
  //       },
  //     })
  //   },
  //   judgeStatus,
  //   vcPriceDisable,
  //     // vcPriceList,
  //   editVcPrice () {
  //     dispatch({
  //       type: 'queryDoctorTitle/editVcPrice',
  //     })
  //   },
  // }
  const DoctorTitleModalProps = {
    item: currentItem,
    type: modalType,
    visible: QuerymodalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['queryDoctorTitle/queryDoctor'],
    title: '医生职称详情',
    wrapClassName: 'vertical-center-modal',
    onOk () {
      dispatch({
        type: 'queryDoctorTitle/hideQueryModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'queryDoctorTitle/hideQueryModal',
      })
    },
  }
  return (
    <div className="content-inner">
      <DoctorTitleModal {...DoctorTitleModalProps} />
    </div>
  )
}

VerifyDoctorTitle.propTypes = {
  queryDoctorTitle: PropTypes.object,

  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ queryDoctorTitle, auth, loading }) {
  return { queryDoctorTitle, auth, loading }
}

export default connect(mapStateToProps)(VerifyDoctorTitle)
