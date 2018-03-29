import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover, Modal, Row, Col, Form, Input } from 'antd'
// import { Link } from 'dva/router'
import styles from './Header.less'
import Menus from './Menus'

const SubMenu = Menu.SubMenu
const FormItem = Form.Item


const Header = ({ hideCenter, modalVisible, openCenter, user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu
  , form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  onOk,
}) => {
  let handleClickMenu = e => {
    if (e.key === 'logout') { logout() } else if (e.key === 'center') {
      openCenter()
    }
  }
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      onOk({
        ...data,
        id: user.id,
      })
    })
  }
  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div className={styles.button} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
      <div className={styles.leftWarpper}>
        {/* <Menu
          mode="horizontal"
          style={{ lineHeight: '47px' }}
        >
          <Menu.Item key="21"><Link to="/users">用户管理</Link></Menu.Item>
          <Menu.Item key="51"><Link to="/doctors">医生管理</Link></Menu.Item>
        </Menu> */}
      </div>
      <div className={styles.rightWarpper}>
        <div className={styles.button}>
          <Icon type="mail" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu style={{
            float: 'right',
          }} title={<span> <Icon type="user" />
            {user.username} </span>}
          >
            <Menu.Item key="center">
              个人中心
            </Menu.Item>
            <Menu.Item key="logout">
              退出登录
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      <div>
        <Modal visible={modalVisible} onCancel={hideCenter} title="个人中心" onOk={handleOk}>
          <Form>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label="旧密码">
                  {getFieldDecorator('oldPassword', {
                    rules: [{
                      required: true,
                      message: '不能为空',
                    }],
                    initialValue: '',


                  })(
                    <Input />
                )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem {...formItemLayout} label="新密码">
                  {getFieldDecorator('newPassword', {
                    rules: [{
                      required: true,
                      message: '不能为空',
                    }],
                    initialValue: '',

                  })(
                    <Input />
                )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem {...formItemLayout} label="确认新密码">
                  {getFieldDecorator('newPassword2', {
                    rules: [{
                      required: true,
                      message: '不能为空',
                    }],
                    initialValue: '',

                  })(
                    <Input />
                )}
                </FormItem>
              </Col>
            </Row>
          </Form>

        </Modal>
      </div>
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Form.create()(Header)
