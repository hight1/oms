import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import HotKeywordsList from '../../components/HotKeywords/HotKeywordsList'

function HotKeywords ({ hotKeywords, loading, location, dispatch }) {
  const {
   list,
    pagination,
    // currentItem,
    selectedRowKeys,

    // modalVisible,
    // modalType,
    // hospitalName,
    // hospitalDept,
  } = hotKeywords


  const hotKeywordsListProps = {
    pagination,
    loading: loading.effects['hotKeywords/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'hotKeywords/updateState',
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
    onEdit (hotKeyword) {
      dispatch({
        type: 'hotKeywords/setDic',
        payload: {
          hotKeyword: hotKeyword,
        },
      })
    },
    cancelEdit (hotKeyword) {
      dispatch({
        type: 'hotKeywords/cancelDic',
        payload: {
          hotKeyword: hotKeyword,
        },
      })
    },
    onDeny (id, enable) {
      dispatch({
        type: 'hotKeywords/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'hotKeywords/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
    onDelete (code) {
      dispatch({
        type: 'hotKeywords/delete',
        payload: code,
      })
    },
    onSearch (val) {
      dispatch({
        type: 'hotKeywords/query',
        payload: {
          keyword: val },
      })
    },

  }


  return (
    <div className="content-inner">

      <HotKeywordsList {...hotKeywordsListProps} />
    </div>
  )
}

HotKeywords.propTypes = {
  hotKeywords: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ hotKeywords, loading }) {
  return { hotKeywords, loading }
}

export default connect(mapStateToProps)(HotKeywords)
