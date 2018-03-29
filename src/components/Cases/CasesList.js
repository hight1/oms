import React from 'react'
import PropTypes from 'prop-types'
import { Table, Alert } from 'antd'
// import { getHospitalStatus } from '../../utils/helper'
// import { ListPopOverStyle, longText } from '../Department/List.less'

import '../../themes/index.less'

const CasesList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  onEdit,
  onVerify,
}) => {
  const columns = [
    {
      title: '病例类型',
      dataIndex: 'type',
      key: 'type',
      className: 'column-center',
      render: (text, record) => {
        const type = record.type || '未填写'
        return (
          type
        )
      },
    },
    {
      title: '就诊人姓名',
      dataIndex: 'patientName',
      key: 'patientName',
      className: 'column-center',
      render: (text, record) => {
        const patientName = record.patientName || '未填写'
        return (
          patientName
        )
      },
    },
    {
      title: '性别',
      dataIndex: 'patietSex',
      key: 'patientSex',
      className: 'column-center',
      render: (text, record) => {
        const patientSex = record.patientSex || '未填写'
        return (
          patientSex
        )
      },
    }, {
      title: '年龄',
      dataIndex: 'patientAge',
      key: 'patientAge',
      className: 'column-center',
      render: (text, record) => {
        const patientAge = record.patientAge || '未填写'
        return (
          patientAge
        )
      },
    },
    {
      title: '症状',
      dataIndex: 'symptom',
      key: 'symptom',
      className: 'column-center',
      render: (text, record) => {
        const symptom = record.symptom || '未填写'
        return (
          symptom
        )
      },
    },
    {
      title: '就诊医院',
      dataIndex: 'hospitalName',
      key: 'hospitalName',
      className: 'column-center',
      render: (text, record) => {
        const hospitalName = record.hospitalName || '未填写'
        return (
          hospitalName
        )
      },
    },
    {
      title: '就诊科室',
      dataIndex: 'deptName',
      key: 'deptName',
      className: 'column-center',
      render: (text, record) => {
        const deptName = record.deptName || '未填写'
        return (
          deptName
        )
      },
    },
    {
      title: '就诊时间',
      dataIndex: 'visitTime',
      key: 'visitTime',
      className: 'column-center',
      render: (text, record) => {
        const visitTime = record.visitTime || '未填写'
        return (
          visitTime
        )
      },
    },
    {
      title: '诊断',
      dataIndex: 'diagnose',
      key: 'diagnose',
      width: 200,
      className: 'column-center',
      render: (text, record) => {
        const diagnose = record.diagnose || '未填写'
        return (
          diagnose
        )
      },
    }, {
      title: '操作',
      key: 'operation',
      className: 'column-center',
      width: 150,
      render: (text, record) => {
        const { code } = record
        return (
          <span>
            <a onClick={() => onEdit(code)} >编辑</a>
            &nbsp;&nbsp;
            <a onClick={() => onVerify(code)} >审核</a>
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
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.code}
        pagination={pagination}
        onChange={onPageChange}
      />
    </div>
  )
}

CasesList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default CasesList
