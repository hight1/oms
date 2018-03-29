import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import HelpList from '../../components/HelpList/HelpList'

function HelpPage ({ helpList, loading, location, dispatch }) {
  const {
   list,
    pagination,
    // currentItem,
    selectedRowKeys,

    // modalVisible,
    // modalType,
    // hospitalName,
    // hospitalDept,
    app,
    categoryList,
  } = helpList


  const helpListProps = {
    app,
    categoryList,
    pagination,
    loading: loading.effects['helpList/query'],
    dataSource: list,
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'helpList/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    onPageChange (page) {
      const { query } = location
      dispatch({
        type: 'helpList/query',
        payload: {
          ...query,
          app: app,
          page: page.current,
          size: page.pageSize,
        },
      })
    },
    onDeny (id, enable) {
      dispatch({
        type: 'helpList/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant (item) {
      dispatch({
        type: 'helpList/showModalGrant',
        payload: {
          currentItem: item,
        },
      })
    },
    onDelete (code) {
      dispatch({
        type: 'helpList/delete',
        payload: code,
      })
    },
    onSearch (val) {
      dispatch(routerRedux.push({
        pathname: '/help',
        query: {
          keyword: val,
        },
      }))
      // dispatch({
      //   type: 'helpList/query',
      //   payload: {
      //     keyword: val },
      // })
      dispatch({
        type: 'helpList/changeApp',
        payload: {
          app: 0,
        },
      })
    },
    changeTop (e, record) {
      dispatch({
        type: 'helpList/changeTop',
        payload: {
          id: e.target.value,
          isTop: e.target.checked,
          title: record.title,
          staticHtmlPath: record.staticHtmlPath,
          app: record.app,
        },
      })
    },
    changeCate (e, record) {
      dispatch({
        type: 'helpList/changeCateTop',
        payload: {
          id: e.target.value,
          isCategoryTop: e.target.checked,
          title: record.title,
          staticHtmlPath: record.staticHtmlPath,
          app: record.app,
        },
      })
    },
    handleChange (e) {
      console.log(e.target.value)
      dispatch({
        type: 'helpList/changeApp',
        payload: {
          app: e.target.value,
        },
      })
      dispatch({
        type: 'helpList/queryHelpCate',
        payload: {
          app: e.target.value,
        },
      })
      dispatch({
        type: 'helpList/query',
        payload: {
          app: e.target.value,
        },
      })
    },
    clickMenu (e) {
      console.log(e.key)
      dispatch({
        type: 'helpList/changeCateCode',
        payload: {
          categoryCode: e.key,
        },
      })
      dispatch({
        type: 'helpList/query',
        payload: {
          app: app,
          categoryCode: e.key,
        },
      })
    },
  }


  return (
    <div className="content-inner">
      <HelpList {...helpListProps} />
    </div>
  )
}

HelpPage.propTypes = {
  helpList: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ helpList, loading }) {
  return { helpList, loading }
}

export default connect(mapStateToProps)(HelpPage)
