import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Row, Col, Checkbox, Card,
  Modal,
} from 'antd'

import { getLocalStorageJson } from '../../utils/storage'

const CheckboxGroup = Checkbox.Group

const RoleModalGrant = ({
  item,
  visible,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      onOk(data)
    })
  }

  const permissionCodes = item.permissionCodes || []
  const listPermissions = getLocalStorageJson('permissions') || []
  const defaultCheckedList = []
  const plainOptions = []
  let map = {}
  let dest = []
  permissionCodes.map((permissionCode) => {
    return defaultCheckedList.push(permissionCode)
  })

  listPermissions.map((permission) => {
    return plainOptions.push({
      label: permission.name,
      value: permission.id,
    })
  })

  for (let i = 0; i < listPermissions.length; i++) {
    const permission = listPermissions[i]
    if (!map[permission.scope]) {
      dest.push({
        scope: permission.scope,
        children: [permission],
        options: [{
          label: permission.name,
          value: permission.code,
        }],
      })
      map[permission.scope] = permission
    } else {
      for (let j = 0; j < dest.length; j++) {
        const dj = dest[j]
        if (dj.scope === permission.scope) {
          dj.children.push(permission)
          dj.options.push({
            label: permission.name,
            value: permission.code,
          })
          break
        }
      }
    }
  }

  const loop = data => data.map((permission) => {
    if (permission.children) {
      return (
        <Card title={permission.scope} bordered={false} key={permission.scope}>
          <Col span={24} className="checkboxItem">
            {getFieldDecorator('permissionCodes', { initialValue: defaultCheckedList })(
              <CheckboxGroup options={permission.options} />
            )}
          </Col>
        </Card>
      )
    }
    return null
  })

  const modalOpts = {
    title: '授权',
    visible,
    onOk: handleOk,
    onCancel,
    width: 720,
  }

  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          {loop(dest)}
        </Row>
      </Form>
    </Modal>
  )
}

RoleModalGrant.propsTypes = {
  item: PropTypes.object,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(RoleModalGrant)
