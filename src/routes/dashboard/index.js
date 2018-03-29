import React from 'react'
import PropTypes from 'prop-types'

function Dashboard () {
  return (
    <h1 style={{ textAlign: 'center', marginTop: 200 }}>9K运营管理系统OMS</h1>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default Dashboard
