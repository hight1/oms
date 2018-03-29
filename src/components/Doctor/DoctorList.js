import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table, Radio, Popover, Tabs, Button, Input, Row, Col } from 'antd'
// import { getHospitalStatus } from '../../utils/helper'
import { ListPopOverStyle, longText } from '../Department/List.less'


import '../../themes/index.less'

const Search = Input.Search

const TabPane = Tabs.TabPane


const DoctorList = ({
  realPagination,
  loading,
  realDataSource,
  onRealPageChange,
  // onQuery,
  // onDelete,
  // onCreate,
  realRowSelection,
  onSearch,
  // onUndoneSearch,
  // loading1,
  loading2,
  // onUndoneQuery,
  // //////////////////离线医生 //////////////
  fakeRowSelection,
  fakeDataSource,
  fakePagination,
  onFakeQuery,
  deleteOffline,
  addOffline,
  // undoneRowSelection,
  // undoneDataSource,
  // undonePagination,
  onFakeSearch,
  handleTabClick,
  type,
  handleChange,
}) => {
  const columns = [
    {
      title: '医生编号',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => {
        const code = record.code || '未填写'
        return (
          code
        )
      },
    },
    {
      title: '医生姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        const nickName = record.name || '未填写'
        return (
          nickName
        )
      },
    },
    {
      title: '医生级别',
      dataIndex: 'titleName',
      key: 'titleName',
      render: (text, record) => {
        const titleName = record.titleName || '未填写'
        return (
          titleName
        )
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      className: 'column-right',
      render: (text, record) => {
        const mobile = record.mobile || '未填写'
        return (
          mobile
        )
      },
    },
    {
      title: '科室名称',
      dataIndex: 'deptName',
      key: 'deptName',
      render: (text, record) => {
        const deptName = record.deptName || '未填写'
        return (
          deptName
        )
      },
    },
    {
      title: '医院名称',
      dataIndex: 'hospitalName',
      key: 'hospitalName',
      render: (text, record) => {
        const content = (
          <div className={ListPopOverStyle}>
            <p> {text}</p>
          </div>
        )
        return (
          <Popover content={content} title="医院名称" trigger="hover" placement="topRight" arrowPointAtCenter>
            <div className={longText}>{record.hospitalName}</div>
          </Popover>
        )
      },
    },
    {
      title: '是否测试',
      dataIndex: 'isExpert',
      key: 'isExpert',
      className: 'column-center',
      render: (text, record) => {
        return (
           record.isExpert === '1' ? '是' : '否'
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
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        const { code } = record
        return (
          type === '1' ?
            <span>
              <Link to={`/doctors/edit/${code}`} ><span>详情</span></Link>
            &nbsp;&nbsp;
              {/* <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDelete(code)}>
              <a>删除</a>
            </Popconfirm> */}
            </span>
          :
            <span>
              <Link to={`/doctors/editUndone/${code}`} >详情</Link>
          &nbsp;&nbsp;
              {/* <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDelete(code)}>
            <a>删除</a>
          </Popconfirm> */}
            </span>
        )
      },
    }]
  // const undoneColumns = [
  //   {
  //     title: '医生编号',
  //     dataIndex: 'code',
  //     key: 'code',
  //     render: (text, record) => {
  //       const code = record.code || '未填写'
  //       return (
  //         code
  //       )
  //     },
  //   },
  //   {
  //     title: '医生姓名',
  //     dataIndex: 'name',
  //     key: 'name',
  //     render: (text, record) => {
  //       const nickName = record.name || '未填写'
  //       return (
  //         nickName
  //       )
  //     },
  //   },
  //   {
  //     title: '医生级别',
  //     dataIndex: 'titleName',
  //     key: 'titleName',
  //     render: (text, record) => {
  //       const titleName = record.titleName || '未填写'
  //       return (
  //         titleName
  //       )
  //     },
  //   },
  //   {
  //     title: '手机号',
  //     dataIndex: 'mobile',
  //     key: 'mobile',
  //     className: 'column-right',
  //     render: (text, record) => {
  //       const mobile = record.mobile || '未填写'
  //       return (
  //         mobile
  //       )
  //     },
  //   },
  //   {
  //     title: '科室名称',
  //     dataIndex: 'deptName',
  //     key: 'deptName',
  //     render: (text, record) => {
  //       const deptName = record.deptName || '未填写'
  //       return (
  //         deptName
  //       )
  //     },
  //   },
  //   {
  //     title: '医院名称',
  //     dataIndex: 'hospitalName',
  //     key: 'hospitalName',
  //     render: (text, record) => {
  //       const content = (
  //         <div className={ListPopOverStyle}>
  //           <p> {text}</p>
  //         </div>
  //       )
  //       return (
  //         <Popover content={content} title="医院名称" trigger="hover" placement="topRight" arrowPointAtCenter>
  //           <div className={longText}>{record.hospitalName}</div>
  //         </Popover>
  //       )
  //     },
  //   },
  //   {
  //     title: '是否专家',
  //     dataIndex: 'isExpert',
  //     key: 'isExpert',
  //     className: 'column-center',
  //     render: (text, record) => {
  //       return (
  //          record.isExpert === '1' ? '是' : '否'
  //       )
  //     },
  //   },

  //   {
  //     title: '创建时间',
  //     dataIndex: 'createTime',
  //     key: 'createTime',
  //     className: 'column-center',
  //     render: (text, record) => {
  //       const createTime = record.createTime || '未填写'
  //       return (
  //         createTime
  //       )
  //     },
  //   },
  //   {
  //     title: '操作',
  //     key: 'operation',
  //     render: (text, record) => {
  //       const { code } = record
  //       let uid = code
  //       return (
  //         <span>
  //           <Link to={`/doctors/editUndone/${uid}`} >详情</Link>
  //           &nbsp;&nbsp;
  //           {/* <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDelete(code)}>
  //             <a>删除</a>
  //           </Popconfirm> */}
  //         </span>
  //       )
  //     } },
  // ]

  const fakeColumns = [
    {
      title: '医生姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        const nickName = record.name || '未填写'
        return (
            nickName
        )
      },
    },
    {
      title: '医生级别',
      dataIndex: 'titleName',
      key: 'titleName',
      render: (text, record) => {
        const levelName = record.titleName || '未填写'
        return (
            levelName
        )
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      className: 'column-right',
      render: (text, record) => {
        const phone = record.mobile || '未填写'
        return (
            phone
        )
      },
    },
    {
      title: '科室名称',
      dataIndex: 'deptName',
      key: 'deptName',
      render: (text, record) => {
        const deptName = record.deptName || '未填写'
        return (
            deptName
        )
      },
    },
    {
      title: '医院名称',
      dataIndex: 'hospitalName',
      key: 'hospitalName',
      render: (text, record) => {
        const content = (
          <div className={ListPopOverStyle}>
            <p> {text}</p>
          </div>
          )
        return (
          <Popover content={content} title="医院名称" trigger="hover" placement="topRight" arrowPointAtCenter>
            <div className={longText}>{record.hospitalName}</div>
          </Popover>
        )
      },
    },
    {
      title: '是否专家',
      dataIndex: 'isExpert',
      key: 'isExpert',
      className: 'column-center',
      render: (text, record) => {
        return (
             record.isExpert === 1 ? '是' : '否'
        )
      },
    },
    // {
    //   title: '认证状态',
    //   dataIndex: 'authStatus',
    //   key: 'authStatus',
    //   className: 'column-center',
    //   render: (text, record) => {
    //     const hospitalStatus = getHospitalStatus(record.authStatus)
    //     return (
    //       <Badge status={hospitalStatus.status} text={hospitalStatus.text} />
    //     )
    //   },
    // },

    // {
    //   title: '创建时间',
    //   dataIndex: 'createTime',
    //   key: 'createTime',
    //   className: 'column-center',
    //   render: (text, record) => {
    //     const createTime = record.createTime || '未填写'
    //     return (
    //         createTime
    //     )
    //   },
    // },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        const { code } = record
        return (
          <span>
            <Link to={`/doctors/editFake/${code}`} ><span onClick={() => onFakeQuery(code)} >详情</span></Link>
             &nbsp;&nbsp;
            {/* <a onClick={() => onFakeQuery(code)} >详情</a> */}

            {/* <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDelete(code)}>
              <a>删除</a>
            </Popconfirm> */}
          </span>
        )
      },
    }]


  return (
    <div>
      <Tabs onTabClick={handleTabClick}>
        <TabPane tab="在线医生" key="1" closable={false} >
          {/* <Button type="primary" size="large" style={{ marginBottom: '30px', marginLeft: '30px' }} onClick={onCreate}>新增</Button> */}
          {/* <Button type="primary" size="large" style={{ marginBottom: '30px', marginLeft: '30px' }} onClick={onDelete}>删除</Button> */}
          <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
            <Col span={5} style={{ textAlign: '' }} />
            <Col span={19} style={{ textAlign: 'right', display: 'inline' }}>
              <Radio.Group style={{ marginRight: '10px' }} value={type || '1'} onChange={handleChange}>
                <Radio.Button value={'1'}>已审核</Radio.Button>
                <Radio.Button value={'0'}>未审核</Radio.Button>
              </Radio.Group>
              <Search
                placeholder="请输入关键字查询"
                defaultValue={''}
                onSearch={value => onSearch(value)}
                style={{ width: 150 }}
              />
            </Col>
          </Row>


          <Table
            rowSelection={realRowSelection}
            columns={columns}
            dataSource={realDataSource}
            loading={loading}
            rowKey={record => record.code}
            pagination={realPagination}
            onChange={onRealPageChange}
          />
        </TabPane>
        {/* <TabPane tab="在线医生（未审核）" key="2" closable={false} >
          <Row>
            <Col span={24} offset={21}>
              <Search
                placeholder="请输入关键字查询"
                defaultValue={''}
                onSearch={value => onUndoneSearch(value)}
                style={{ width: 150, marginBottom: '16px', marginRight: '16px' }}
              />
            </Col>
          </Row>
          <Table
            rowSelection={undoneRowSelection}
            columns={undoneColumns}
            dataSource={undoneDataSource}
            loading={loading1}
            rowKey={record => record.code}
            pagination={undonePagination}
          />
        </TabPane> */}
        <TabPane tab="离线医生" key="3" closable={false} >
          <Row>
            <Col span={24}>
              <Button type="primary" size="large" style={{ marginBottom: '10px', marginTop: '10px', marginLeft: '30px' }} onClick={addOffline}>新增</Button>
              <Button type="default" size="large" style={{ marginBottom: '10px', marginTop: '10px', marginLeft: '30px' }} onClick={deleteOffline}>删除</Button>
              <Search
                placeholder="请输入关键字查询"
                defaultValue={''}
                onSearch={value => onFakeSearch(value)}
                style={{ width: 150, float: 'right', marginTop: '10px' }}
              />
            </Col>
          </Row>
          <Table
            rowSelection={fakeRowSelection}
            columns={fakeColumns}
            dataSource={fakeDataSource}
            loading={loading2}
            rowKey={record => record.code}
            pagination={fakePagination}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

DoctorList.propTypes = {
  loading: PropTypes.bool,
}

export default DoctorList
