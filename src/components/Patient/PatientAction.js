import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Alert } from 'antd'

const Search = Input.Search

const PatientAction = ({
  searchMode,
  keyword,
  onSearch,
  onResetSearch,
  // onAdvanceSearchMode,
}) => {
  return (
    <div>
      {
        (keyword && searchMode === 'simple') && <Alert message={`关键词："${keyword}"`} type="info"
          showIcon style={{ marginBottom: 16 }} closeText="清除所有" onClose={onResetSearch}
        />
      }
      <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={14} style={{ textAlign: '' }} />
        {
          searchMode === 'simple' && (
            <Col span={10} style={{ textAlign: 'right', display: 'inline' }}>
              <Search
                placeholder="请输入关键字查询"
                defaultValue={keyword || ''}
                onSearch={value => onSearch(value)}
                style={{ width: 150, marginRight: 5 }}
              />
              {/* <a onClick={onAdvanceSearchMode}>高级搜索</a> */}
            </Col>
          )
        }
      </Row>
    </div>
  )
}

PatientAction.propTypes = {
  searchMode: PropTypes.string,
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onResetSearch: PropTypes.func,
}

export default PatientAction
