import React from 'react'
import Project from './Project'
import * as projects from '../projects'

export default function App () {
  return <main className='app'>
    <div className='screen'>
      <div className='headings'>
        <h1 className='name'>Brandon Semilla</h1>
        <h2 className='title'>Web Developer</h2>
        <h2 className='title'>+ Game Designer</h2>
      </div>
      <div className='socials'>
        <img className='social -github' src='../assets/github.svg' />
        <img className='social -linkedin' src='../assets/linkedin.svg' />
        <img className='social -instagram' src='../assets/instagram.svg' />
      </div>
    </div>
    <div className='projects'>
      <Project side='right' {...projects.tactics} />
      <Project side='left' {...projects.proto} />
    </div>
  </main>
}
