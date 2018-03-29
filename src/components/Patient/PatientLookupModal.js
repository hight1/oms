import React from 'react'
import { Modal, Input, Table, Col, Row } from 'antd'
// mport { ListPopOverStyle, longText } from '../Department/List.less'


const Search = Input.Search

const PatientLookupModal = ({
    patDataSource,
    patLookUpSelection,
    onPatiSearch,
    handleOk,
    onDelete,
    PatPagination,
    ...modalProps
}) => {
  const modalOpts = {
    ...modalProps,
  }
  const columns = [
    {
      title: '患者编号',
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
      title: '患者姓名',
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
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text, record) => {
        const sex = `${record.sex}` || '未填写'

        if (sex === '1') {
          return '女'
        } else if (sex === '0') {
          return '男'
        } else {
          return '未填写'
        }
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
      title: '出生日期',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (text, record) => {
        const birthday = record.birthday || '未填写'
        return (
          `${birthday.slice(0, 4)}年${birthday.slice(4, 6)}月${birthday.slice(6, 8)}日`
        )
      },
    },
    // {
    //   title: '操作',
    //   key: 'operation',
    //   width: 200,
    //   render: (text, record) => {
    //     const { code } = record
    //     return (
    //       <span>
    //         {/* <a onClick={() => onDeptEdit(code)} >编辑</a> */}
    //         &nbsp;&nbsp;
    //         <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDelete(code)}>
    //           <a>删除</a>
    //         </Popconfirm>
    //       </span>
    //     )
    //   },
    // },
  ]

  return (
    <Modal
      {...modalOpts}
      title="患者参照页"
    >
      <Row>
        <Col span={24} style={{ marginBottom: '10px', textAlign: 'right' }}>
          <Search
            placeholder="搜索"
            defaultValue={''}
            onSearch={value => onPatiSearch(value)}
            style={{ width: 150, marginRight: 5 }}
          />
        </Col>
        <Col span={24}>
          <div>
            <Table
              columns={columns}
              dataSource={patDataSource}
              rowSelection={patLookUpSelection}
              rowKey={record => record.code}
              pagination={PatPagination}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  )
}

export default PatientLookupModal
