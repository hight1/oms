import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Row, Col, Input, Button, Radio } from 'antd'

const Search = Input.Search


const AgencyAction = ({
  searchMode,
  keyword,
  onSearch,
  onCreate,
  // onReturn,
  // onBatchDelete,
  handleChange,
  rank,
}) => {
  return (
    <div>
      <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: '' }}>
          <Link to={'/agencies/edit/new'}> <Button type="primary" style={{ marginRight: 8 }} onClick={onCreate}>新增</Button></Link>
          {/* <Popconfirm title={'确定删除这些项?'} placement="right" onConfirm={onBatchDelete}>
            <Button type="default" style={{ marginLeft: 8 }}>删除</Button>
          </Popconfirm> */}
        </Col>
        {
          searchMode === 'simple' && (
            <Col span={18} style={{ textAlign: 'right', display: 'inline' }}>
              <Radio.Group style={{ marginRight: '10px' }} defaultValue={1} value={rank} onChange={handleChange}>
                <Radio.Button value={1}>个人</Radio.Button>
                <Radio.Button value={2}>县代</Radio.Button>
                <Radio.Button value={3}>市代</Radio.Button>
                <Radio.Button value={4}>省代</Radio.Button>
                <Radio.Button value={5}>官方</Radio.Button>
              </Radio.Group>
              <Search
                placeholder="搜索"
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

AgencyAction.propTypes = {
  searchMode: PropTypes.string,
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onCreate: PropTypes.func,
}

export default AgencyAction
