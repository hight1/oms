import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Select, DatePicker } from 'antd'

const Search = Input.Search
const Option = Select.Option


const VideoOrdersAction = ({
  keyword,
  onSearch,
  // onResetSearch,
  handleChange,
  orderStatus,
  bizType,
  clickMenu,
  onStartDate,
  onEndDate,
 // onAdvanceSearchMode,
}) => {
  const statList = [
    {
      name: '全部状态',
      code: '00',
    },
    {
      name: '待付款',
      code: '待付款',
    },
    // {
    //   name: '已付款',
    //   code: '30',
    // },
    // {
    //   name: '待付款',
    //   code: '11',
    // },
    {
      name: '已取消',
      code: '已取消',
    },
    // {
    //   name: '已取消（超时未付）',
    //   code: '21',
    // },
    // {
    //   name: '已取消（患者超时未接）',
    //   code: '22',
    // },
    // {
    //   name: '已取消（进入视频失败）',
    //   code: '23',
    // },
    // {
    //   name: '已取消（患者取消有退款）',
    //   code: '24',
    // },
    // {
    //   name: '已取消（患者拒接有退款）',
    //   code: '25',
    // },
    // {
    //   name: '已取消（医生取消）',
    //   code: '26',
    // },
    {
      name: '已付款',
      code: '已付款',
    },
    // {
    //   name: '已付款（发起视频邀请）',
    //   code: '41',
    // },
    // {
    //   name: '已付款（患者接听）',
    //   code: '42',
    // },
    // {
    //   name: '已付款（进入视频，开始计费）',
    //   code: '43',
    // },
    {
      name: '已完成',
      code: '已完成',
    },
    // {
    //   name: '已完成（有退款）',
    //   code: '51',
    // },
  ]
  return (
    <div>
      {/* {
        (keyword && searchMode === 'simple') && <Alert message={`关键字："${keyword}"`} type="info"
          showIcon style={{ marginBottom: 16 }} closeText="清除所有" onClose={onResetSearch}
        />
      } */}
      <Row type="flex" justify="space-between" >
        <Col span={1} style={{ textAlign: '' }} />
        <Col span={23} style={{ textAlign: 'right', display: 'inline', marginBottom: '5px' }}>
          <Select mode="multiple" /* value={orderStatus}*/ defaultValue={orderStatus} placeholder="可以选择订单状态" style={{ width: 190, marginRight: 15 }} onChange={handleChange}>
            {
          statList.map((val) => {
            return (
              <Option key={val.code} value={val.code}>{val.name}</Option>
            )
          })
                 }
          </Select>

          <Select value={bizType} defaultValue={`${bizType}`} style={{ width: 100, marginRight: 15 }} onChange={clickMenu}>
            <Option key={' '} value={' '}>全部类型</Option>
            <Option key={'00'} value={'00'}>视频预约</Option>
            <Option key={'02'} value={'02'}>一元义诊</Option>
          </Select>
          <DatePicker showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="开始时间"
            onChange={onStartDate}
            style={{
              marginRight: 15,
            }}
          />
          <DatePicker showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="结束时间"
            onChange={onEndDate}
            style={{
              marginRight: 15,
            }}
          />

          <Search
            placeholder="请输入关键字查询"
            defaultValue={keyword || ''}
            onSearch={value => onSearch(value)}
            style={{ width: 150, marginRight: 5 }}
          />
        </Col>
      </Row>
    </div>
  )
}

VideoOrdersAction.propTypes = {
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
}

export default VideoOrdersAction
