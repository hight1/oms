import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table, Alert, Popover } from 'antd'
// import EditableCell from '../../components/EditableCell'
import { longText, ListPopOverStyle, left } from './List.less'
import '../../themes/index.less'


const DepartmentList = ({
  // pagination,
  loading,
  dataSource,
  selectedRowKeys,
  // onPageChange,
  // onChangeSort,
  onEdit,
  // onDelete,
  rowClick,
  isParent,
  rowSelection,
  onRowClick,
}) => {
  const columns = [
    // {
    //   title: '科室编号',
    //   dataIndex: 'code',
    //   key: 'code',
    //   className: left,
    //   width: '200px',
    //   render: (text, record) => {
    //     const code = record.code
    //     return (
    //        code
    //     )
    //   },
    // },
    {
      title: '科室名称',
      dataIndex: 'name',
      key: 'name',
      className: left,
      render: (text, record) => {
        const name = record.name
        let code = record.code
        return (
          isParent ?
            <a onClick={() => { rowClick(code) }} > {name} </a>
           :
            <p> {text}</p>
        )
      },
    },
    // {
    //   title: '顺序',
    //   dataIndex: 'sort ',
    //   key: 'sort',
    //   width: 100,
    //   render: (text, record) => {
    //     return (
    //       <EditableCell
    //         value={record.sort}
    //         onChange={(sort) => { onChangeSort(record, sort) }}
    //       />
    //     )
    //   },
    // },
    {
      title: '一级科室',
      dataIndex: 'parentCode',
      key: 'parentCode',
      className: left,
      render: (text, record) => {
        const parentCode = record.parentName
        return (
         parentCode
        )
      },
    },
    {
      title: '标准科室',
      dataIndex: 'isStandard',
      key: 'isStandard',
      className: left,
      render: (text, record) => {
        const isStandard = record.isStandard
        return (
          isStandard === 1 ? '是' : '否'
        )
      },
    },
    {
      title: '热门科室',
      dataIndex: 'isHot',
      key: 'isHot',
      className: left,
      render: (text, record) => {
        const isHot = record.isHot
        return (
          isHot === 1 ? '是' : '否'
        )
      },
    },
    // {
    //   title: '创建时间',
    //   dataIndex: 'createTime',
    //   key: 'createTime',
    //   width: 200,
    // },
    // {
    //   title: '修改时间',
    //   dataIndex: 'updateTime',
    //   key: 'updateTime',
    //   width: 200,
    // },
    {
      title: '备注',
      dataIndex: 'description',
      key: 'description',
      className: left,
      render: (text, record) => {
        const content = (
          <div className={ListPopOverStyle}>
            <p> {text}</p>
          </div>
        )
        return (
          <Popover content={content} title="科室描述详情" trigger="hover" placement="topRight" arrowPointAtCenter>
            <div className={longText}>{record.description}</div>
          </Popover>
        )
      },
    },
    {
      title: '操作',
      key: 'operation',
      width: 200,
      render: (text, record) => {
        const { code } = record
        return (
          <span>
            {
              isParent ? '' :
              <Link to={`/departments/edit/${code}`} ><span onClick={() => onEdit(code)}>编辑</span></Link>
            }
            &nbsp;&nbsp;

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
      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.code}
        // pagination={pagination}
        // onChange={onPageChange}
        onRowDoubleClick={onRowClick}
      />
    </div>
  )
}

DepartmentList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  // onPageChange: PropTypes.func,
}

export default DepartmentList
