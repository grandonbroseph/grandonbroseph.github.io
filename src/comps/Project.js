import React from 'react'
import PropTypes from 'prop-types'

export default function Project ({ title }) {
  return <div className='project'>{title}</div>
}

Project.propTypes = {
  title: PropTypes.string
}
