import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Row, Col, Checkbox,
  Modal,
} from 'antd'

import { getLocalStorageJson } from '../../utils/storage'

const CheckboxGroup = Checkbox.Group

const HospitalVerify = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
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

  const roles = item.roles || []
  const listRoles = getLocalStorageJson('roles') || []
  const defaultCheckedList = []
  const plainOptions = []
  roles.map((role) => {
    return defaultCheckedList.push(role.id)
  })

  listRoles.map((role) => {
    return plainOptions.push({
      label: role.name,
      value: role.id,
    })
  })

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
    width: 720,
  }

  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={24} className="checkboxItem">
            {getFieldDecorator('role_ids', { initialValue: defaultCheckedList })(
              <CheckboxGroup options={plainOptions} />
            )}
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

HospitalVerify.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(HospitalVerify)
