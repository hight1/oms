import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import MembersList from '../../components/Members/MembersList'
import MembersSearch from '../../components/Members/MembersSearch'
import MembersAction from '../../components/Members/MembersAction'
import MembersModal from '../../components/Members/MembersModal'
import MembersVerifyModal from '../../components/Members/MembersVerifyModal'

function Members ({ members, loading, location, dispatch }) {
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
  } = members

  const membersSearchProps = {
    keyword,
    onSimpleSearchMode () {
      dispatch({
        type: 'members/updateSearchMode',
        payload: {
          searchMode: 'simple',
        },
      })
    },
    onSearch (fieldsValue) {
      dispatch(
        routerRedux.push({
          pathname: '/members',
          query: { page: 1, ...fieldsValue },
        }),
      )
    },
    onReset () {
      dispatch(
        routerRedux.push({
          pathname: '/members',
          query: { page: 1, keyword: '' },
        }),
      )
    },
    hospitalRank,
    hospitalCategories,
    hospitalLevels,
  }

  const membersListProps = {
    pagination,
    loading: loading.effects['members/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'members/updateState',
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
        type: 'members/hideModal',
        payload: {
          modalVisible: false,
        },

      })
    },
    onEdit (code) {
      dispatch({
        type: 'members/edit',
        payload: {
          code: code,
        },
      })
    },
    onDelete (code) {
      dispatch({
        type: 'members/delete',
        payload: code,
      })
    },
    modalVisible,
    onVerify (code) {
      dispatch({
        type: 'members/verify',
        payload: {
          code: code,
        },
      })
    },

  }

  const membersActionProps = {
    searchMode,
    keyword,
    selectedRowKeys,
    onCreate () {
      dispatch({
        type: 'members/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onBatchDelete () {
      dispatch({
        type: 'members/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    onAdvanceSearchMode () {
      dispatch({
        type: 'members/updateSearchMode',
        payload: {
          searchMode: 'advance',
        },
      })
    },
    onSearch (kw) {
      dispatch(
        routerRedux.push({
          pathname: '/members',
          query: { page: 1, keyword: kw },
        }),
      )
    },
    onResetSearch () {
      dispatch(
        routerRedux.push({
          pathname: '/members',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }
  const membersModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: modalType === 'create' ? loading.effects['members/create'] : loading.effects['members/update'],
    title: `${modalType === 'create' ? '新增医院' : '医院更新'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `members/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'members/hideModal',
      })
    },
    dataSource,
    hospitalRank,
    hospitalCategories,
    hospitalRegion,
    hospitalSpecial,
    getHospitalSpecial (code) {
      dispatch({
        type: 'members/getHospitalSpecial',
        payload: code,
      })
    },
    specialName,
    uploadIconSuccess (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'members/uploadIconSuccess',
        payload: IconUrl,
      })
    },
    uploadImageSuccess (res) {
      const imageUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'members/uploadImageSuccess',
        payload: imageUrl,
      })
    },
    uploadToken,
  }

  const membersVerifyModalProps = {
    item: currentItem,
    visible: verifyModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['members/update'],
    title: '医院审核',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'members/verifyHospital',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'members/hideVerifyModal',
      })
    },
    dataSource,
    hospitalRank,
    hospitalCategories,
    handleChange (val) {
      dispatch({
        type: 'members/change',
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
        searchMode === 'advance' && <MembersSearch {...membersSearchProps} />
      }
      <MembersAction {...membersActionProps} />
      <MembersList {...membersListProps} />
      {modalVisible && <MembersModal {...membersModalProps} />}
      {verifyModalVisible && <MembersVerifyModal {...membersVerifyModalProps} />}
    </div>
  )
}

Members.propTypes = {
  members: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ members, loading }) {
  return { members, loading }
}

export default connect(mapStateToProps)(Members)
