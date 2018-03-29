import React from 'react'
import { Modal, Input, Table, Col, Row } from 'antd'


const Search = Input.Search

const HospitalLookupModal = ({
    onOk,
    cateDataSource,
    rowSelection,
    onHosiSearch,
    handleOk,
    onDelete,
    handleHospi,
    HospitalPagination,
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
      title: '医院名称',
      dataIndex: 'name',
      key: 'name',
      width: '200px',
      render: (text, record) => {
        const categoryCode = record.name
        return (
            categoryCode
        )
      },
    },
    {
      title: '医院等级',
      dataIndex: 'levelName',
      key: 'levelName',
      width: '200px',
      render: (text, record) => {
        const categoryName = record.levelName
        return (
            categoryName
        )
      },
    },
    {
      title: '顶级医院',
      dataIndex: 'isTop',
      key: 'isTop',
      render: (text, record) => {
        const isTop = record.isTop
        return (
          isTop === 1 ? '是' : '否'
        )
      },
    },
    {
      title: '医保定点',
      dataIndex: 'isInsurance',
      key: 'isInsurance',
      render: (text, record) => {
        const isInsurance = record.isInsurance
        return (
          isInsurance === 1 ? '是' : '否'
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
      title="医院参照页"
    >
      <Row>
        <Col span={24} style={{ marginBottom: '10px', textAlign: 'right' }}>
          <Search
            placeholder="搜索"
            defaultValue={''}
            onSearch={value => onHosiSearch(value)}
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
              pagination={HospitalPagination}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  )
}

export default HospitalLookupModal
