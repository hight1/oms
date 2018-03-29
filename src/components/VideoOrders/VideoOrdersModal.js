import React from 'react'
import {
  Form, Row, Col, Table, Button,
} from 'antd'
import { Link } from 'dva/router'
import styles from './VideoOrders.less'

// 推荐在入口文件全局设置 locale
import PicturesWall from './VideoOrdersPic'
import { getVideoOrdersStatus } from '../../utils/helper'


const FormItem = Form.Item
// import { getOpenStatus, isOpenStatus, format } from '../../utils/helper.js'


// const statusList = [
//   {
//     name: '全部',
//     code: '',
//   },
//   {
//     name: '待付款',
//     code: '10',
//   },
//   {
//     name: '待付款（倒计时）',
//     code: '11',
//   },
//   {
//     name: '已取消（患者未付取消）',
//     code: '20',
//   },
//   {
//     name: '已取消（超时未付）',
//     code: '21',
//   },
//   {
//     name: '已取消（患者超时未接）',
//     code: '22',
//   },
//   {
//     name: '已取消（进入视频失败）',
//     code: '23',
//   },
//   {
//     name: '已取消（患者取消有退款）',
//     code: '24',
//   },
//   {
//     name: '已取消（患者拒接有退款）',
//     code: '25',
//   },
//   {
//     name: '已取消（医生取消）',
//     code: '26',
//   },
//   {
//     name: '已付款（预约成功）',
//     code: '30',
//   },
//   {
//     name: '已付款（进入服务队列）',
//     code: '40',
//   },
//   {
//     name: '已付款（发起视频邀请）',
//     code: '41',
//   },
//   {
//     name: '已付款（患者接听）',
//     code: '42',
//   },
//   {
//     name: '已付款（进入视频，开始计费）',
//     code: '43',
//   },
//   {
//     name: '已完成（无退款）',
//     code: '50',
//   },
//   {
//     name: '已完成（有退款）',
//     code: '51',
//   },
// ]
const VideoOrdersModal = ({
  item = {},
  cancelOrder,
  // onOk,
  // onChangeHospitalName,
  // form: {
    // validateFields,
    // getFieldsValue,
    // getFieldDecorator,
  // },
  // ...modalProps
}) => {
  const videoOrders = item
  // function handleOk () {
  //   validateFields((errors) => {
  //     if (errors) {
  //       return
  //     }
  //     // const data = { ...getFieldsValue() }
  //     onOk({
  //       code: videoOrders.uid,
  //     })
  //   })
  // }
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 13 },
  }
  const formItemLayout2 = {
    labelCol: { span: 3 },
    wrapperCol: { span: 13 },
  }
  const formItemLayout3 = {
    labelCol: { span: 5 },
    wrapperCol: { span: 13 },
  }
  return (
    <Form >
      <Row>
        <Col span={24}>
          <Link to="/video-orders"><Button type="default" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }}>返回</Button></Link>
          <Button type="default" size="large" style={{ marginLeft: '30px', marginBottom: '30px' }} onClick={() => cancelOrder(videoOrders.orderNo)}>解除订单</Button>

        </Col>
      </Row>
      <fieldset style={{ border: 0 }}>
        <legend>订单基本信息</legend>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout3} label="订单号">
              <div><span>{!videoOrders ? '' : videoOrders.orderNo}</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="订单状态"
            >
              <div><span>{!videoOrders ? '' : getVideoOrdersStatus(videoOrders.orderStatus)}</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="支付状态">
              <div><span>{!videoOrders ? '' : getVideoOrdersStatus(videoOrders.paymentStatus)}</span></div>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout3} label="视频预约时长">
              <div><span>{!videoOrders ? '' : videoOrders.orderDuration}秒</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="开始时间">
              <div><span>{!videoOrders ? '' : videoOrders.startTime}</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="结束时间">
              <div><span>{!videoOrders ? '' : videoOrders.finishTime}</span></div>
            </FormItem>
          </Col>
        </Row>
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>咨询医生信息</legend>
        <div className={styles.layout}>
          <aside className={styles.layout__aside}>
            <img src={(!videoOrders.serviceDoctor) ? '' : videoOrders.serviceDoctor.image} role="presentation"
              width={100}
              height={100}
              style={{ textAlign: 'right', borderRadius: '50%' }}
            />

          </aside>
          <div className={styles.layout__main}>
            <Row style={{ textAlign: 'left' }}>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >姓名：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.serviceDoctor ? '' : videoOrders.serviceDoctor.name}</span></div>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >手机号：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.serviceDoctor ? '' : videoOrders.serviceDoctor.mobile}</span></div>
                </div>

              </Col>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >医院名称：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.serviceDoctor ? '' : videoOrders.serviceDoctor.hospitalName}</span></div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >总收入：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.serviceDoctor ? '' : videoOrders.serviceDoctor.incomeAmount}元</span></div>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >服务收入：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.serviceDoctor ? '' : videoOrders.serviceDoctor.serviceIncomeAmount}元</span></div>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >奖励收入：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.serviceDoctor ? '' : videoOrders.serviceDoctor.awardIncomeAmount}元</span></div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >科室名称：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.serviceDoctor ? '' : videoOrders.serviceDoctor.deptName}</span></div>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >职称名称：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.serviceDoctor ? '' : videoOrders.serviceDoctor.titleName}</span></div>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >服务完成时间：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.serviceDoctor ? '' : videoOrders.serviceDoctor.finishTime}</span></div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={8}>

                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >服务开始时间：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.serviceDoctor ? '' : videoOrders.serviceDoctor.startTime}</span></div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>患者信息</legend>
        <div className={styles.layout}>
          <aside className={styles.layout__aside}>
            <img src={(!videoOrders.patient) ? '' : videoOrders.patient.image} role="presentation"
              width={100}
              height={100}
              style={{ textAlign: 'right', borderRadius: '50%' }}
            />
          </aside>
          <div className={styles.layout__main}>
            <Row style={{ textAlign: 'left' }}>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >姓名：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.patient ? '' : videoOrders.patient.name}</span></div>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >性别：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.patient ? '' : (videoOrders.patient.sex === 0 ? '男' : '女')}</span></div>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >年龄：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.patient ? '' : videoOrders.patient.age}</span></div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >手机号：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.patient ? '' : videoOrders.patient.mobile}</span></div>
                </div>
              </Col>

              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >症状：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.patient ? '' : videoOrders.patient.symptom}</span></div>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.layout2}>
                  <aside className={styles.layout__aside2}>
                    <div >诊断：</div></aside>
                  <div className={styles.layout__main2}><span>{!videoOrders.patient ? '' : videoOrders.patient.diagnose}</span></div>
                </div>
              </Col>

            </Row>
          </div>
        </div>
        <Row>
          <Col span={24} style={{ textAlign: 'left' }}>
            <FormItem {...formItemLayout2} label="病例图片列表">
              {/* {
            !videoOrders.patient || !videoOrders.patient.imageList ? '无记录' : videoOrders.patient.imageList.map((val, index) => {
              return (
                <img key={index} alt="无图" style={{ width: '35%', marginLeft: '5rem', marginBottom: '10px', cursor: 'pointer' }} src={val} />
              )
            })
          } */}
              {
            !videoOrders.patient ? '' :
            <PicturesWall src={videoOrders.patient.imageList} />

          }

            </FormItem>
          </Col>
        </Row>
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>线下就诊医生信息</legend>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="医生名称">
              <div><span>{!videoOrders.offlineDoctor ? '' : videoOrders.offlineDoctor.doctorName}</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="医院名称">
              <div><span>{!videoOrders.offlineDoctor ? '' : videoOrders.offlineDoctor.hospitalName}</span></div>

            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="科室名称">
              <div><span>{!videoOrders.offlineDoctor ? '' : videoOrders.offlineDoctor.deptName}</span></div>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="总收入">
              <div><span>{!videoOrders.offlineDoctor ? '' : videoOrders.offlineDoctor.incomeAmount}元</span></div>

            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="服务收入">

              <div><span>{!videoOrders.offlineDoctor ? '' : videoOrders.offlineDoctor.serviceIncomeAmount}元</span></div>

            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="奖励收入">
              <div><span>{!videoOrders.offlineDoctor ? '' : videoOrders.offlineDoctor.awardIncomeAmount}元</span></div>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="就诊时间">
              <div><span>{!videoOrders.offlineDoctor ? '' : videoOrders.offlineDoctor.treatTime}</span></div>

            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="服务开始时间">

              <div><span>{!videoOrders.offlineDoctor ? '' : videoOrders.offlineDoctor.startTime}</span></div>

            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="服务完成时间">
              <div><span>{!videoOrders.offlineDoctor ? '' : videoOrders.offlineDoctor.finishTime}</span></div>

            </FormItem>
          </Col>
        </Row>

      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>录制视频地址</legend>
        <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
          <Col span={24}>
            <Table
              columns={[
                { title: '录制视频地址',
                  dataIndex: 'recordVideoUrlList',
                  key: 'recordVideoUrlList' },
              ]}
              dataSource={!videoOrders.recordVideoUrlList ? [] : videoOrders.recordVideoUrlList}
              pagination={false}
              rowKey={record => record.recordVideoUrlList}
            />
          </Col>
        </Row>
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>支付记录</legend>
        <Table
          columns={[
            { title: '交易号',
              dataIndex: 'tradeNo',
              key: 'tradeNo' },
            { title: '支付状态',
              dataIndex: 'status',
              key: 'status',
              render: (text, record) => {
                return (
                  getVideoOrdersStatus(record.status)
                )
              },
            },
            { title: '交易金额',
              dataIndex: 'amount',
              key: 'amount' },
            { title: '支付方式',
              dataIndex: 'method',
              key: 'method' },
            { title: '支付时间',
              dataIndex: 'createTime',
              key: 'createTime' },
          ]}
          dataSource={!videoOrders.paymentRecord ? [] : videoOrders.paymentRecord}
          pagination={false}
          rowKey={record => record.tradeNo}
          style={{ marginBottom: '20px', marginTop: '20px' }}
        />
        {/* {
          !videoOrders.paymentRecord ? '支付记录：无记录' :
          videoOrders.paymentRecord.map((val, index) => {
            return (
              <Row key={index}>
                <Col span={5}>
                  <FormItem {...formItemLayout} label="交易号" style={{ overflow: 'hidden' }}>
                    <div>{val.tradeNo}</div>
                  </FormItem>
                </Col>
                <Col span={5}>
                  <FormItem {...formItemLayout} label="支付状态">
                    <div><span>{getVideoOrdersStatus(val.status)}</span></div>
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem {...formItemLayout} label="支付金额">
                    <div><span>{`${val.amount}元`}</span></div>
                  </FormItem>
                </Col>
                <Col span={5}>
                  <FormItem {...formItemLayout} label="支付方式">
                    <div><span>{val.method}</span></div>
                  </FormItem>
                </Col>
                <Col span={5}>
                  <FormItem {...formItemLayout} label="支付时间">
                    <div><span>{val.createTime}</span></div>
                  </FormItem>
                </Col>
              </Row>
            )
          })
        } */}
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>订单日志</legend>
        <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
          <Col span={24}>
            <Table
              columns={[
                { title: '信息',
                  dataIndex: 'info',
                  key: 'info' },
                { title: '时间',
                  dataIndex: 'createTime',
                  key: 'createTime' },
              ]}
              dataSource={!videoOrders.orderLog ? [] : videoOrders.orderLog}
              pagination={false}
            />
          </Col>
        </Row>
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>退款记录</legend>
        <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
          <Col span={24}>
            <Table
              columns={[
                { title: '交易号',
                  dataIndex: 'tradeNo',
                  key: 'tradeNo' },
                { title: '支付状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (text, record) => {
                    return (
                  getVideoOrdersStatus(record.status)
                    )
                  },
                },
                { title: '交易金额',
                  dataIndex: 'amount',
                  key: 'amount' },
                { title: '支付方式',
                  dataIndex: 'method',
                  key: 'method' },
                { title: '支付时间',
                  dataIndex: 'createTime',
                  key: 'createTime' },
              ]}
              dataSource={!videoOrders.refundRecord ? [] :
              videoOrders.refundRecord}
              pagination={false}
              rowKey={record => record.tradeNo}
            />
          </Col>
        </Row>
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>患者排队情况</legend>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="排队位置">
              <div><span>{!videoOrders.queue ? '' : videoOrders.queue.position}</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="队列长度">
              <div><span>{!videoOrders.queue ? '' : videoOrders.queue.waittingCount}</span></div>
            </FormItem>
          </Col>
          <Col span={8} />
        </Row>
        {/* <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
          <Col span={24}>
            <Table
              columns={[
                { title: '交易号',
                  dataIndex: 'tradeNo',
                  key: 'tradeNo' },
                { title: '排队位置',
                  dataIndex: 'videoOrders.queue',
                  key: 'position',
                },
                { title: '队列长度',
                  dataIndex: 'waittingCount',
                  key: 'waittingCount' },
              ]}
              dataSource={!videoOrders.queue ? [] :
              videoOrders.queue}
              pagination={false}
              rowKey={record => record.tradeNo}
            />
          </Col>
        </Row> */}
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>患者评价</legend>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="是否评价">
              <div><span>{!videoOrders.patientComment ? '' : videoOrders.patientComment.isComment ? '是' : '否'}</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="评分">
              <div><span>{!videoOrders.patientComment ? '' : videoOrders.patientComment.score}</span></div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="评价内容">
              <div><span>{!videoOrders.patientComment ? '' : videoOrders.patientComment.content}</span></div>
            </FormItem>
          </Col>
        </Row>

      </fieldset>
    </Form>
  )
}


export default Form.create()(VideoOrdersModal)
