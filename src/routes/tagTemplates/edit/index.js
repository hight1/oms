import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import TagTemplatesSearch from '../../../components/TagTemplates/TagTemplatesSearch'

import TagTemplatesModal from '../../../components/TagTemplates/TagTemplatesModal'

function TagTemplates ({ tagTemplates, dispatch }) {
  const {
  // list,
    searchMode,
    keyword,
    currentItem,
 //   modalVisible,
    modalType,
    targetKeys,
    dataSource,
    selectedKeys,
    value,
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
  const tagTemplatesModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    // visible: modalVisible,
    modalType,
    maskClosable: false,
    title: `${modalType === 'create' ? '创建用户' : '医生信息详情'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      if (data.code === '') {
        dispatch({
          type: 'tagTemplates/create',
          payload: data,
        })
      } else {
        dispatch({
          type: 'tagTemplates/update',
          payload: data,
        })
      }
    },
    dataSource,
    targetKeys,
    selectedKeys,
    tabList,
  }
  return (
    <div className="content-inner">
      {
        searchMode === 'advance' && <TagTemplatesSearch {...tagTemplatesSearchProps} />
      }
      <TagTemplatesModal {...tagTemplatesModalProps} />

    </div>
  )
}

TagTemplates.propTypes = {
  tagTemplates: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ tagTemplates, loading }) {
  return { tagTemplates, loading }
}

export default connect(mapStateToProps)(TagTemplates)
