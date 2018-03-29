import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Button, Popconfirm, Alert } from 'antd'

const Search = Input.Search

const RoleAction = ({
  searchMode,
  keyword,
  onSearch,
  onResetSearch,
  onCreate,
  onBatchDelete,
  onAdvanceSearchMode,
}) => {
  return (
    <div>
      {
        (keyword && searchMode === 'simple') && <Alert message={`姓名："${keyword}"；手机号："${keyword}"；邮箱："${keyword}"`} type="info"
          showIcon style={{ marginBottom: 16 }} closeText="清除所有" onClose={onResetSearch}
        />
      }
      <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={14} style={{ textAlign: '' }}>
          <Button type="primary" onClick={onCreate} style={{ marginRight: 8 }} >新增</Button>
          <Popconfirm title={'确定删除这些项?'} placement="right" onConfirm={onBatchDelete}>
            <Button type="default" style={{ marginLeft: 8 }}>删除</Button>
          </Popconfirm>
        </Col>
        {
          searchMode === 'simple' && (
            <Col span={10} style={{ textAlign: 'right', display: 'inline' }}>
              <Search
                placeholder="请输入关键字查询"
                defaultValue={keyword || ''}
                onSearch={value => onSearch(value)}
                style={{ width: 150, marginRight: 5 }}
              />
              <a onClick={onAdvanceSearchMode}>高级搜索</a>
            </Col>
          )
        }
      </Row>
    </div>
  )
}

RoleAction.propTypes = {
  searchMode: PropTypes.string,
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onResetSearch: PropTypes.func,
  onCreate: PropTypes.func,
  onBatchDelete: PropTypes.func,
}

export default RoleAction
