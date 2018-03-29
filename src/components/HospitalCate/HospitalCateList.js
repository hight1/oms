import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table, Alert } from 'antd'

import { left } from './List.less'
import '../../themes/index.less'

const HospitalCateList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  // onChangeSort,
  onEdit,
  // onDelete,
  // rowClick,
  // isParent,
  rowSelection,
}) => {
  const columns = [
    {
      title: '分类编号',
      dataIndex: 'code',
      key: 'code',
      className: left,
      render: (text, record) => {
        const categoryCode = record.code
        return (
          categoryCode
        )
      },
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      className: left,
      render: (text, record) => {
        const categoryName = record.name
        return (
          categoryName
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
      title: '是否热门分类',
      dataIndex: 'isHot',
      key: 'isHot',
      className: left,
      render: (text, record) => {
        const isHot = record.isHot
        return (
          isHot === 0 ? '否' : '是'
        )
      },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      render: (text, record) => {
        const sort = record.sort
        return (
          sort
        )
      },
    },
    {
      title: '备注',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => {
        const remark = record.description
        return (
          remark
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
            <Link to={`/hospital-cates/edit/${code}`} ><span onClick={() => onEdit(code)}>编辑</span></Link>
            &nbsp;&nbsp;
          </span>
        )
      },
    }]


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
        pagination={pagination}
        onChange={onPageChange}
      />
    </div>
  )
}

HospitalCateList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default HospitalCateList
