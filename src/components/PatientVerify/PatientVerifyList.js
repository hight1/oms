import React from 'react'
import PropTypes from 'prop-types'
import { Table, Alert, Badge } from 'antd'
import { getHospitalStatus } from '../../utils/helper.js'

const PatientVerifyList = ({
  pagination,
  loading,
  dataSource,
  selectedRowKeys,
  onPageChange,
  onEdit,

}) => {
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => {
      const name = record.name
      return (
        name
      )
    },
  }, {
    title: '手机',
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
    title: '身份证号',
    dataIndex: 'idCard',
    key: 'idCard',
    render: (text, record) => {
      const idCard = record.idCard || '未填写'
      return (
        idCard
      )
    },
  },
  // {
  //   title: '身份证正面',
  //   dataIndex: 'idCardFrontPic',
  //   key: 'idCardFrontPic',
  //   render: (text, record) => {
  //     // let card = record.idCardFrontPic.slice(1, -1)
  //     // let num = card.indexOf(',')
  //     // let b = card.slice(0, num).slice(1, -1)
  //     record.idCardFrontPic === null ? '' : record.idCardFrontPic
  //     return (
  //       <img
  //         src={record.idCardFrontPic}
  //         width={100}
  //         height={100}
  //         role="presentation"
  //       />
  //     )
  //   },
  // },
  // {
  //   title: '身份证反面',
  //   dataIndex: 'idCardBackPic',
  //   key: 'idCardBackPic',
  //   render: (text, record) => {
  //     // let card = record.idCardFrontPic.slice(1, -1)
  //     // let num = card.indexOf(',')
  //     // let a = card.slice(num + 1).slice(1, -1)
  //     record.idCardBackPic === null ? '' : record.idCardBackPic
  //     return (
  //       <img
  //         src={record.idCardBackPic}
  //         width={100}
  //         height={100}
  //         role="presentation"
  //       />
  //     )
  //   },
  // },
  {
    title: '认证状态',
    dataIndex: 'idCardPicAuthStatus',
    key: 'idCardPicAuthStatus',
    render: (text, record) => {
      const idCardStatus = getHospitalStatus(record.idCardPicAuthStatus)
      return (
        <Badge status={idCardStatus.status} text={idCardStatus.text} />
      )
    },
  },
  {
    title: '备注',
    dataIndex: 'authRemark',
    key: 'authRemark',
    render: (text, record) => {
      const authRemark = record.authRemark || '未填写'
      return (
        authRemark
      )
    },
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
    render: (text, record) => {
      const submitTime = record.submitTime || '未填写'
      return (
        submitTime
      )
    },
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: (text, record) => {
      const type = record.type || '未填写'
      if (type === 1) {
        return '申请'
      } else if (type === 2) {
        return '提升'
      } else if (type === 2) {
        return '申诉'
      }
    },
  },
  {
    title: '操作',
    key: 'operation',
    render: (text, record) => {
      const { code } = record
      let { idCardPicAuthStatus } = record
      idCardPicAuthStatus === '0' || idCardPicAuthStatus === 0 ? idCardPicAuthStatus
      :
      idCardPicAuthStatus = '1'
      return (
        <span className={'table-operation'}>
          <a onClick={() => onEdit(code, idCardPicAuthStatus)}>审核</a>
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

PatientVerifyList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
  onEdit: PropTypes.func,
}

export default PatientVerifyList
