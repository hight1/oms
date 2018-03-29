import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'dva/router'
import { Table, Alert, Row, Col, Badge, Tabs, Radio } from 'antd'
// import EditableCell from '../../components/EditableCell'
// import { left } from '../Department/List.less'
import '../../themes/index.less'
import { getQueStatus } from '../../utils/helper'

// const Search = Input.Search
const TabPane = Tabs.TabPane

const QuestionsList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  // onChangeSort,
  // onDelete,
  // onSearch,
  replyQuestion,
  handleTabClick,
  handleChange,
  handleChange2,
  status,
  // rowSelection,
}) => {
  const columns = [
    {
      title: '头像',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => {
        const imgUrl = record.image || 'https://gtms03.alicdn.com/tps/i3/TB1opXxHXXXXXahXpXXvBLt6FXX-230-230.png'
        return (
          <img
            src={imgUrl}
            width={50}
            height={50}
            style={{ borderRadius: '50%' }}
            role="presentation"
          />
        )
      },
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        const name = record.name
        return (
        name
        )
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text, record) => {
        const mobile = record.mobile || '未填写'
        return (
        mobile
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => {
        const title = record.title || '未填写'
        return (
        title
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return (
          <span>
            <Badge status={getQueStatus(`${record.status}`).status} text={getQueStatus(`${record.status}`).text} />
          </span>
          // <Badge status={getQueStatus(status).status} text={getQueStatus(status).text} />
        )
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) => {
        const content = record.content || '未填写'
        return (
          content
        )
      },
    },
    {
      title: '操作',
      key: 'operation',
      width: '180px',
      render: (text, record) => {
        // const { uid, title, imGroupId } = record
        return (
          <span style={{ color: '#108ee9' }}>
            <a onClick={() => replyQuestion(record)}>回复</a>
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
      {/* <Row>
        <Col span={12} offset={12} style={{ textAlign: 'right', display: 'inline' }}>
          <Search
            placeholder="搜索订单号"
            defaultValue={''}
            onSearch={value => onSearch(value)}
            style={{ width: 150, marginRight: 5, marginBottom: 10 }}
          />
        </Col>
      </Row> */}
      <Tabs onTabClick={handleTabClick}>
        <TabPane tab="订单相关" key="1" closable={false} >
          <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
            <Col span={10} />
            <Col span={14} style={{ textAlign: 'right' }}>
              <Radio.Group value={status || 0} onChange={handleChange}>
                <Radio.Button value={0}>未回复</Radio.Button>
                <Radio.Button value={1}>已回复</Radio.Button>
                <Radio.Button value={2}>已解决</Radio.Button>
              </Radio.Group>
            </Col>

          </Row>
          <Table
            columns={columns}
        // rowSelection={rowSelection}
            dataSource={dataSource}
            loading={loading}
            rowKey={record => record.code}
            pagination={pagination}
            onChange={onPageChange}
          />
        </TabPane>
        <TabPane tab="建议相关" key="2" closable={false}>
          <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
            <Col span={10} />
            <Col span={14} style={{ textAlign: 'right' }}>
              <Radio.Group style={{ marginLeft: '10px' }} value={status || 0} onChange={handleChange2}>
                <Radio.Button value={0}>未回复</Radio.Button>
                <Radio.Button value={1}>已回复</Radio.Button>
                <Radio.Button value={2}>已解决</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Table
            columns={columns}
        // rowSelection={rowSelection}
            dataSource={dataSource}
            loading={loading}
            rowKey={record => record.code}
            pagination={pagination}
            onChange={onPageChange}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

QuestionsList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default QuestionsList
