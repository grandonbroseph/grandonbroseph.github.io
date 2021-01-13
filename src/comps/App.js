import React, { useState } from 'react'
import Project from './Project'
import * as projects from '../projects'

export default function App () {
  const [menu, setMenu] = useState(false)

  function closeMenu () {
    setMenu(false)
  }

  function toggleMenu () {
    setMenu(!menu)
  }

  return <main className='app'>
    <button onClick={toggleMenu} className='nav-toggle material-icons-round'>
      {menu ? 'close' : 'menu'}
    </button>
    <nav className='nav'>
      <ul className='nav-list'>
        <li className='nav-item'>
          <a className='nav-link'>Home</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link'>Projects</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link'>About</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link'>Contact</a>
        </li>
      </ul>
    </nav>
    <div className={menu ? 'page -slide' : 'page'}
         onClick={menu ? closeMenu : null}>
      <div className='screen'>
        <div className='headings'>
          <h1 className='name'>Brandon Semilla</h1>
          <h2 className='title'>Web Developer</h2>
          <h2 className='subtitle'>+ Game Designer</h2>
          <button className='button'>View projects</button>
        </div>
        <div className='socials'>
          <img className='social -github' src='../assets/icon-github.svg' />
          <img className='social -linkedin' src='../assets/icon-linkedin.svg' />
        </div>
      </div>
      <section className='section -projects'>
        <h3 className='section-title'>Projects</h3>
        <Project side='left' {...projects.lifeos} />
        <Project side='right' {...projects.riderly} />
        <Project side='left' {...projects.mineteria} />
        <Project side='right' {...projects.tactics} />
        <Project side='left' {...projects.proto} />
      </section>
    </div>
  </main>
}
