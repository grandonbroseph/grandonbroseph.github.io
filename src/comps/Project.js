import React from 'react'
import type from 'prop-types'
import icons from '../icons'

Project.propTypes = {
  title: type.string,
  subtitle: type.string,
  images: type.arrayOf(type.string),
  lifespan: type.arrayOf(type.string),
  contents: type.arrayOf(type.string),
  takeaways: type.arrayOf(type.string),
  icons: type.arrayOf(type.string),
  platform: type.string,
  link: type.objectOf(type.string),
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
  if (project.lifespan[0] && project.lifespan[1]) {
    lifestr += ' - ' + project.lifespan[1]
  }
  return <div className={reverse ? 'project -reverse' : 'project'}>
    <img src={imagesrc} className='project-image' />
    <div className='project-contents'>
      <div className='project-header'>
        <h3 className='project-title'>{project.title}</h3>
        <div className='project-icons'>
          {project.icons && project.icons.length
            ? project.icons.map((iconId, i) =>
                <img key={i} src={`assets/${icons[iconId]}`} className='project-icon' />
              )
            : null}
        </div>
      </div>
      {project.context
        ? lifestr
            ? <span className='project-subtitle'><strong>{project.context}</strong> · {lifestr}</span>
            : <span className='project-subtitle'><strong>{project.context}</strong></span>
        : <span className='project-subtitle'>{lifestr}</span>}
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
        ? <a href={project.link.href}
          target='_blank'
          rel='noreferrer'
          className='button'>
            {project.link.text}
            <span className='project-button-icon material-icons-round'>chevron_right</span>
          </a>
        : null}
    </div>
  </div>
}
