import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Row, Col, Input, Button, Alert, Popconfirm } from 'antd'

const Search = Input.Search

const DepartmentAction = ({
  searchMode,
  keyword,
  onSearch,
  onResetSearch,
  onCreate,
  onReturn,
  onBatchDelete,
}) => {
  return (
    <div>
      {
        (keyword && searchMode === 'simple') && <Alert message={`科室名称："${keyword}"；`} type="info"
          showIcon style={{ marginBottom: 16 }} closeText="清除所有" onClose={onResetSearch}
        />
      }
      <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={14} style={{ textAlign: '' }}>
          <Link to={'/departments/edit/new'}> <Button type="primary" style={{ marginRight: 8 }} onClick={onCreate}>新增</Button></Link>
          <Button type="default" style={{ marginLeft: 8 }} onClick={onReturn}>返回上级</Button>
          <Popconfirm title={'确定删除这些项?'} placement="right" onConfirm={onBatchDelete}>
            <Button type="default" style={{ marginLeft: 8 }}>删除</Button>
          </Popconfirm>
        </Col>
        {
          searchMode === 'simple' && (
            <Col span={10} style={{ textAlign: 'right', display: 'inline' }}>
              <Search
                placeholder="搜索科室名称"
                defaultValue={keyword || ''}
                onSearch={value => onSearch(value)}
                style={{ width: 150, marginRight: 5 }}
              />
            </Col>
          )
        }
      </Row>
    </div>
  )
}

DepartmentAction.propTypes = {
  searchMode: PropTypes.string,
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onResetSearch: PropTypes.func,
  onCreate: PropTypes.func,
}

export default DepartmentAction
