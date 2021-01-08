import React from 'react'
import type from 'prop-types'

Project.propTypes = {
  title: type.string,
  subtitle: type.string,
  images: type.arrayOf(type.string),
  contents: type.arrayOf(type.string)
}

export default function Project ({ title, subtitle, images, contents }) {
  const imageidx = 0
  const imagesrc = images[imageidx]
  return <div className='project'>
    <div className='project-content'>
      <div className='project-headings'>
        <h3 className='project-title'>{title}</h3>
        <span className='project-subtitle'>{subtitle}</span>
      </div>
      {contents.map((content, i) =>
        <p key={i} className='project-content'>{content}</p>
      )}
    </div>
    <div className='project-imagewrap'>
      <img src={imagesrc} className='project-image' />
    </div>
  </div>
}
