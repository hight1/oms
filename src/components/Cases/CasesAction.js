import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Button, Alert, Upload, Icon } from 'antd'

const Search = Input.Search

const CasesAction = ({
  searchMode,
  keyword,
  onSearch,
  onResetSearch,
  onCreate,
  onAdvanceSearchMode,
}) => {
  return (
    <div>
      {
        (keyword && searchMode === 'simple') && <Alert message={`医院名称："${keyword}"；`} type="info"
          showIcon style={{ marginBottom: 16 }} closeText="清除所有" onClose={onResetSearch}
        />
      }
      <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={14} style={{ textAlign: '' }}>
          <Button type="primary" onClick={onCreate} style={{ marginRight: 8 }} >新增</Button>
          <Upload name="logo" action="" listType="picture" style={{ display: 'inline', marginLeft: 16 }} >
            <Button style={{ marginRight: 20 }}>
              <Icon type="upload" /> 医院批量导入
              </Button>
          </Upload>
        </Col>
        {
          searchMode === 'simple' && (
            <Col span={10} style={{ textAlign: 'right', display: 'inline' }}>
              <Search
                placeholder="搜索医院名称"
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

CasesAction.propTypes = {
  searchMode: PropTypes.string,
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onResetSearch: PropTypes.func,
  onCreate: PropTypes.func,

}

export default CasesAction
