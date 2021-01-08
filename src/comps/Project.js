import React from 'react'
import type from 'prop-types'

Project.propTypes = {
  title: type.string,
  subtitle: type.string,
  images: type.arrayOf(type.string),
  contents: type.arrayOf(type.string),
  lifespan: type.arrayOf(type.number),
  icons: type.arrayOf(type.string),
  link: type.string,
  side: type.string
}

export default function Project (project) {
  let reverse = false
  if (project.side === 'left') {
    reverse = true
  }
  const imageidx = 0
  const imagesrc = project.images[imageidx]
  let lifestr = project.lifespan[0]
  if (project.lifespan[1]) {
    lifestr += '-' + project.lifespan[1]
  }
  return <div className={reverse ? 'project -reverse' : 'project'}>
    <div className='project-content'>
      <div className='project-headings'>
        <h3 className='project-title'>{project.title}</h3>
        <span className='project-subtitle'>{project.subtitle}</span>
        <span className='project-lifespan'>{lifestr}</span>
      </div>
      <div className='project-icons'>
        {project.icons && project.icons.length
          ? project.icons.map((icon, i) =>
              <img key={i} src={`assets/${icon}`} className='project-icon' />
            )
          : null}
      </div>
      {project.contents.map((content, i) =>
        <p key={i} className='project-content'>{content}</p>
      )}
      <div className='project-carousel'>
        {project.images.map((src, i) =>
          i === imageidx
            ? <img src={src} key={i} className='project-thumb -select'/>
            : <img src={src} key={i} className='project-thumb'/>
        )}
      </div>
      {project.link
        ? <a href={project.link}
          target='_blank'
          rel='noreferrer'
          className='project-button'>
            View the demo
            <span className='project-button-icon material-icons-round'>arrow_right</span>
          </a>
        : null}
    </div>
    <div className='project-imagewrap'>
      <img src={imagesrc} className='project-image' />
      <img src={imagesrc} className='project-image -refl' />
    </div>
  </div>
}
