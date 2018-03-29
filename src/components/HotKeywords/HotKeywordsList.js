import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'dva/router'
import { Table, Alert, Input, Row, Col } from 'antd'
// import EditableCell from '../../components/EditableCell'
// import { left } from '../Department/List.less'
import '../../themes/index.less'

const Search = Input.Search
const HotKeywordsList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  // onChangeSort,
  // onDelete,
  onEdit,
  onSearch,
  cancelEdit,
  // rowSelection,
}) => {
  const columns = [
    {
      title: '热词',
      dataIndex: 'hotKeyword',
      key: 'hotKeyword',
      className: 'column-center',
      render: (text, record) => {
        const hotKeyword = record.hotKeyword
        return (
          hotKeyword
        )
      },
    },
    {
      title: '搜索频次',
      dataIndex: 'freq',
      key: 'freq',
      className: 'column-center',
      render: (text, record) => {
        const freq = record.freq
        return (
          freq
        )
      },
    },
    {
      title: '是否分词词典',
      dataIndex: 'isDic',
      key: 'isDic',
      className: 'column-center',
      render: (text, record) => {
        const isDic = record.isDic
        return (
          isDic ? '是' : '否'
        )
      },
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        const { hotKeyword } = record
        return (
          <span>
            <a onClick={() => onEdit(hotKeyword)}>标记分词</a>
            <a style={{ marginLeft: '0.5rem' }} onClick={() => cancelEdit(hotKeyword)}>取消分词</a>
          </span>
        )
      },
    },
  ]

  return (
    <div>
      {
        selectedRowKeys.length > 0 &&
        <Alert message={`已选${selectedRowKeys.length}项`} type="info" showIcon style={{ marginBottom: 16 }} />
      }
      <Row>
        <Col span={12} offset={12} style={{ textAlign: 'right', display: 'inline' }}>
          <Search
            placeholder="搜索热词"
            defaultValue={''}
            onSearch={value => onSearch(value)}
            style={{ width: 150, marginRight: 5, marginBottom: 10 }}
          />
        </Col>
      </Row>

      <Table
        columns={columns}
        // rowSelection={rowSelection}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.hotKeyword}
        pagination={pagination}
        onChange={onPageChange}
      />
    </div>
  )
}

HotKeywordsList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default HotKeywordsList
