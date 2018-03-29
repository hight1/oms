import React from 'react'
import { Modal, Input, Table, Col, Row } from 'antd'


const Search = Input.Search

const HospitalCateLookupModal = ({
   // item = {},
    onOk,
    cateDataSource,
    rowSelection,
    onCateSearch,
    handleOk,
    onDelete,
    ...modalProps
}) => {
//   function handleOk () {
//     validateFields((errors) => {
//       if (errors) {
//         return
//       }
//       const data = { ...getFieldsValue() }
//       onOk(data)
//     })
//   }


  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const columns = [
    {
      title: '分类编号',
      dataIndex: 'categoryCode',
      key: 'categoryCode',
      width: '200px',
      render: (text, record) => {
        const categoryCode = record.code
        return (
            categoryCode
        )
      },
    },
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: '200px',
      render: (text, record) => {
        const categoryName = record.name
        return (
            categoryName
        )
      },
    },
    {
      title: '是否热门分类',
      dataIndex: 'isHot',
      key: 'isHot',
      render: (text, record) => {
        const isHot = record.isHot
        return (
            isHot === 0 ? '否' : '是'
        )
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render: (text, record) => {
        const remark = record.description
        return (
            remark
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
      title="医院分类参照页"
    >
      <Row>
        <Col span={24} style={{ marginBottom: '10px', textAlign: 'right' }}>
          <Search
            placeholder="搜索"
            defaultValue={''}
            onSearch={value => onCateSearch(value)}
            style={{ width: 150, marginRight: 5 }}
          />
        </Col>
        <Col span={24}>
          <div>
            <Table
              columns={columns}
              dataSource={cateDataSource}
              rowSelection={rowSelection}
              rowKey={record => record.code}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  )
}

export default HospitalCateLookupModal
