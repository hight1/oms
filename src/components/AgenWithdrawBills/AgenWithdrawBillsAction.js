import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Button, Alert, Popconfirm, Radio } from 'antd'

const Search = Input.Search

const AgenWithdrawBillsAction = ({
  searchMode,
  keyword,
  onSearch,
  onResetSearch,
  onBatchWithdraw,
  // onCreate,
  // onAdvanceSearchMode,
  handleChange,
  rank,
}) => {
  return (
    <div>
      {
        (keyword && searchMode === 'simple') && <Alert message={`提现单号："${keyword}"；`} type="info"
          showIcon style={{ marginBottom: 16 }} closeText="清除所有" onClose={onResetSearch}
        />
      }
      <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: '' }}>
          <Popconfirm title={'确定批量提现?'} placement="right" onConfirm={onBatchWithdraw}>
            <Button type="primary" style={{ marginLeft: 8 }}>批量提现</Button>
          </Popconfirm>
        </Col>
        {
          searchMode === 'simple' && (
            <Col span={18} style={{ textAlign: 'right', display: 'inline' }}>
              <Radio.Group style={{ marginRight: '10px' }} defaultValue={1} value={rank} onChange={handleChange}>
                <Radio.Button value={0}>处理中</Radio.Button>
                <Radio.Button value={1}>已处理</Radio.Button>
                <Radio.Button value={2}>处理失败</Radio.Button>
              </Radio.Group>
              <Search
                placeholder="搜索关键字"
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

AgenWithdrawBillsAction.propTypes = {
  searchMode: PropTypes.string,
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onResetSearch: PropTypes.func,

}

export default AgenWithdrawBillsAction
