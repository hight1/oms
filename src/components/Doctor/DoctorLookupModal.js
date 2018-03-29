import React from 'react'
import { Modal, Input, Table, Col, Row, Popover } from 'antd'
import { ListPopOverStyle, longText } from '../Department/List.less'


const Search = Input.Search

const DoctorLookupModal = ({
    docDataSource,
    docLookUpSelection,
    onSearch,
    handleOk,
    onDelete,
    handleHospi,
    DocPagination,
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
    // onOk: handleOk,
  }
  const columns = [
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
      title="医生参照页"
    >
      <Row>
        <Col span={24} style={{ marginBottom: '10px', textAlign: 'right' }}>
          <Search
            placeholder="搜索"
            defaultValue={''}
            onSearch={value => onSearch(value)}
            style={{ width: 150, marginRight: 5 }}
          />
        </Col>
        <Col span={24}>
          <div>
            <Table
              columns={columns}
              dataSource={docDataSource}
              rowSelection={docLookUpSelection}
              rowKey={record => record.code}
              pagination={DocPagination}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  )
}

export default DoctorLookupModal
