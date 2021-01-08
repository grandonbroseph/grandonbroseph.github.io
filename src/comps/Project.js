import React from 'react'
import type from 'prop-types'

Project.propTypes = {
  title: type.string,
  subtitle: type.string,
  images: type.arrayOf(type.string),
  contents: type.arrayOf(type.string),
  lifespan: type.arrayOf(type.number)
}

export default function Project ({ title, subtitle, lifespan, images, contents }) {
  const imageidx = 0
  const imagesrc = images[imageidx]
  let lifestr = lifespan[0]
  if (lifespan[1]) {
    lifestr += '-' + lifespan[1]
  }
  return <div className='project'>
    <div className='project-content'>
      <div className='project-headings'>
        <h3 className='project-title'>{title}</h3>
        <span className='project-subtitle'>{subtitle}</span>
        <span className='project-lifespan'>{lifestr}</span>
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
