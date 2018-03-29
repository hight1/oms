import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Row, Col, Input, Alert, Button, Radio } from 'antd'

const Search = Input.Search

const RemoteConsultAction = ({
  searchMode,
  keyword,
  onSearch,
  onResetSearch,
  // onCreate,
  // onBatchDelete,
 // onAdvanceSearchMode,
  type,
  handleChange,
}) => {
  return (
    <div>
      {
        (keyword && searchMode === 'simple') && <Alert message={`搜索关键字："${keyword}"`} type="info"
          showIcon style={{ marginBottom: 16 }} closeText="清除所有" onClose={onResetSearch}
        />
      }
      <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={5} style={{ textAlign: '' }}>
          <Link to={'/remote-consult/edit/new'}> <Button type="primary" style={{ marginRight: 8 }} >新增</Button></Link>
          {/* <Popconfirm title={'确定删除这些项?'} placement="right" onConfirm={onBatchDelete}>
            <Button type="default" style={{ marginLeft: 8 }}>删除</Button>
          </Popconfirm> */}

        </Col>
        {
          searchMode === 'simple' && (
            <Col span={19} style={{ textAlign: 'right', display: 'inline' }}>
              <Radio.Group style={{ marginRight: '10px' }} value={type || '0'} onChange={handleChange}>
                <Radio.Button value={'0'}>全部</Radio.Button>
                <Radio.Button value={'1'}>专家已接诊</Radio.Button>
                <Radio.Button value={'2'}>会诊已开始</Radio.Button>
                <Radio.Button value={'3'}>会诊已完成</Radio.Button>
                <Radio.Button value={'4'}>订单已取消</Radio.Button>
              </Radio.Group>
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

RemoteConsultAction.propTypes = {
  searchMode: PropTypes.string,
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onResetSearch: PropTypes.func,
}

export default RemoteConsultAction
