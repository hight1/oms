import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Menu, Table, Alert, Input, Row, Col, Popover, Button, Radio } from 'antd'
// import EditableCell from '../../components/EditableCell'
// import { left } from '../Department/List.less'
import '../../themes/index.less'
import { ListPopOverStyle, longText } from '../Department/List.less'

const Search = Input.Search
const HelpList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  // onChangeSort,
  // onDelete,
  onSearch,
  app,
  handleChange,
  categoryList,
  categoryCode,
  clickMenu,
  // changeTop,
  // changeCate,
  // rowSelection,
}) => {
  const columns = [
    {
      title: '分类',
      dataIndex: 'cateTitle',
      key: 'cateTitle',
      className: 'column-center',
      render: (text, record) => {
        const cateTitle = record.cateTitle
        return (
          cateTitle
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      className: 'column-center',
      render: (text, record) => {
        const title = record.title
        const content = (
          <div className={ListPopOverStyle}>
            <p> {title}</p>
          </div>
        )
        return (
          <Popover content={content} title="标题" trigger="hover" placement="topRight" arrowPointAtCenter>
            <div className={longText}>{title}</div>
          </Popover>
        )
      },
    },
    {
      title: '静态文件路径',
      dataIndex: 'staticHtmlPath',
      key: 'staticHtmlPath',
      render: (text, record) => {
        const staticHtmlPath = record.staticHtmlPath
        return (
          staticHtmlPath
        )
      },
    },
    {
      title: '客户端',
      dataIndex: 'app',
      key: 'app',
      render: (text, record) => {
        const app1 = record.app
        return (
          app1 === 1 ? '医生端' : '患者端'
        )
      },
    },
    {
      title: '已解决数',
      dataIndex: 'solveCount',
      key: 'solveCount',
      className: 'column-center',
      render: (text, record) => {
        const solveCount = record.solveCount
        return (
          solveCount
        )
      },
    },
    {
      title: '未解决数',
      dataIndex: 'unSolveCount',
      key: 'unSolveCount',
      className: 'column-center',
      render: (text, record) => {
        const unSolveCount = record.unSolveCount
        return (
          unSolveCount
        )
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      className: 'column-center',
      render: (text, record) => {
        const createTime = record.createTime || '未填写'
        return (
          createTime
        )
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      className: 'column-center',
      render: (text, record) => {
        const updateTime = record.updateTime || '未填写'
        return (
          updateTime
        )
      },
    },
    {
      title: '操作',
      key: 'operation',
      width: '180px',
      className: 'column-center',
      render: (text, record) => {
        const { /* top, categoryTop,*/ id } = record
        return (
          <div >
            <Link to={`/help/update/${id}`} >详情</Link>
          </div>
          // <span style={{ color: '#108ee9' }}>
          //   {/* <Checkbox defaultChecked={top} onChange={(...arg) => changeTop(...arg, record)} value={id}>首页置顶</Checkbox>
          //   <Checkbox defaultChecked={categoryTop} onChange={(...arg) => changeCate(...arg, record)} value={id}>分类置顶</Checkbox> */}

          // </span>
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
        <Col span={12}>
          <Link to={'/help/update/new'}> <Button type="primary" style={{ marginRight: 8 }} >新增</Button></Link>
        </Col>
        <Col span={12} style={{ textAlign: 'right', display: 'inline' }}>
          <Radio.Group style={{ marginRight: '10px' }} value={app} onChange={handleChange}>
            <Radio.Button value={0}>全部</Radio.Button>
            <Radio.Button value={1}>医生端</Radio.Button>
            <Radio.Button value={2}>患者端</Radio.Button>
          </Radio.Group>
          <Search
            placeholder="搜索帮助问题"
            defaultValue={''}
            onSearch={value => onSearch(value)}
            style={{ width: 150, marginRight: 5, marginBottom: 10 }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={3} >
          <Menu
            selectedKeys={[categoryCode]}
            onClick={clickMenu}
          >
            {
            categoryList.map((val) => {
              return (
                <Menu.Item key={val.code} disabled={app === 0}>
                  <img
                    src={val.icon}
                    width={15}
                    height={15}
                    style={{ verticalAlign: 'middle', marginRight: '15px' }}
                    role="presentation"
                  /><span style={{ verticalAlign: 'middle' }}>{val.title}</span>
                </Menu.Item>
              )
            })
          }
          </Menu>
        </Col>
        <Col span={21}>
          <Table
            columns={columns}
        // rowSelection={rowSelection}
            dataSource={dataSource}
            loading={loading}
            rowKey={record => record.id}
            pagination={pagination}
            onChange={onPageChange}
          />
        </Col>
      </Row>

    </div>
  )
}

HelpList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default HelpList
