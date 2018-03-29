import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table, Tabs, Button } from 'antd'

import '../../themes/index.less'

const TabPane = Tabs.TabPane


const TagTemplatesList = ({
  // realPagination,
  loading,
  realDataSource,
  onRealPageChange,
  // onQuery,
  onDelete,
  onCreate,
  realRowSelection,
  tabList,
  handleTabClick,
}) => {
  const columns = [
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
      render: (text, record) => {
        const { code } = record
        return (
          <span>
            <Link to={`/tag-templates/edit/${code}`} >详情</Link>
            &nbsp;&nbsp;
            {/* <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDelete(code)}>
              <a>删除</a>
            </Popconfirm> */}
          </span>
        )
      },
    }]
  return (
    <div>
      <Tabs tabPosition={'left'} onTabClick={handleTabClick}>
        {
        tabList.map((val) => {
          return (
            <TabPane tab={val.title} key={val.id} closable={false} >
              <Button type="primary" size="large" style={{ marginBottom: '30px', marginLeft: '30px' }} onClick={onCreate}>新增</Button>
              <Button type="default" size="large" style={{ marginBottom: '30px', marginLeft: '30px' }} onClick={() => onDelete(val.id)}>删除</Button>
              <Table
                rowSelection={realRowSelection}
                columns={columns}
                dataSource={realDataSource}
                loading={loading}
                rowKey={record => record.code}
                // pagination={realPagination}
                onChange={onRealPageChange}
              />
            </TabPane>
          )
        })
      }
      </Tabs>
    </div>
  )
}

TagTemplatesList.propTypes = {
  loading: PropTypes.bool,
}

export default TagTemplatesList
