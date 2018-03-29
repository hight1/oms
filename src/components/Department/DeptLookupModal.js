import React from 'react'
import { createForm } from 'rc-form'
import { Modal, Table, Popover, Input } from 'antd'
import { longText, ListPopOverStyle, layout, main, aside, item, list } from './List.less'

const Search = Input.Search

function DeptLookupModal ({
  deptLookUpList,
  handleOk,
  deptLookUpSelection,
  onShow,
  deptLookData,
  onDeptSearch,
  ...modalProps

}) {
  const modalOpts = {
    ...modalProps,
  }
  const columns = [
    {
      title: '科室编号',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => {
        const code = record.code
        return (
           code
        )
      },
    },
    {
      title: '科室名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        const name = record.name

        return (
          name
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
      title: '一级科室代码',
      dataIndex: 'parentCode',
      key: 'parentCode',
      render: (text, record) => {
        const parentCode = record.parentCode
        return (
         parentCode
        )
      },
    },
    {
      title: '是否标准科室',
      dataIndex: 'isStandard',
      key: 'isStandard',

      render: (text, record) => {
        const isStandard = record.isStandard
        return (
          isStandard === 0 ? '否' : '是'
        )
      },
    },
    {
      title: '是否热门科室',
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
      dataIndex: 'description',
      key: 'description',
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
  ]
  return (
    <div>
      <Modal title="科室参照页" {...modalOpts}>
        <div className={layout}>
          <aside className={aside}>
            <ul className={list}>
              {
                deptLookUpList.map((val, index) => {
                  let { code } = val
                  return <li className={item} key={index} onClick={() => onShow(code)}><a>{val.name}</a></li>
                })
              }
            </ul>
          </aside>
          <div className={main}>
            <Search
              placeholder="搜索科室名称"
              onSearch={value => onDeptSearch(value)}
              style={{ width: 150, marginLeft: 600, marginBottom: 16 }}
            />
            <Table
              columns={columns}
              rowSelection={deptLookUpSelection}
              dataSource={deptLookData}
              rowKey={record => record.code}
            />
          </div>
        </div>
      </Modal>


    </div>
  )
}

export default createForm()(DeptLookupModal)
