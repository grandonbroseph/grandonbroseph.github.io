import React, { useState } from 'react'
import Project from './Project'
import * as projects from '../data/projects'

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
      <div className='hero'>
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
      <section className='section -about'>
        <h3 className='section-title'>About</h3>
        <div className='picture'></div>
        <p>Hi, I&apos;m Brandon! I&apos;m a front-end web developer and designer. I&apos;m passionate about UI/UX design and making applications simpler, more accessible, and more effective to the people who need them most.</p>
        <p>Currently, I&apos;m a second-term Computer Systems Technology (CST) student at BCIT in search of an entry-level co-op position. Need someone to build and maintain a website for the 21st century? Let&apos;s get in touch!</p>
        <button className='button'>
          Download résumé
          <span className='icon -padded material-icons-round'>download</span>
        </button>
      </section>
      <section className='section -projects'>
        <h3 className='section-title'>Projects</h3>
        <Project side='left' {...projects.lifeos} />
        <Project side='right' {...projects.riderly} />
        <Project side='left' {...projects.mineteria} />
        <Project side='right' {...projects.tactics} />
        <Project side='left' {...projects.proto} />
        <em className='section-addendum'>
          Find more projects on <a
             href='https://github.com/semibran'
             target='_blank'
             rel='noreferrer'>GitHub</a>
        </em>
      </section>
      <footer className='footer'>
        <span>
          &copy;{new Date().getFullYear()} Brandon Semilla
           · <a href='https://opensource.org/licenses/MIT'
                target='_blank'
                rel='noreferrer'>MIT</a>
        </span>
      </footer>
    </div>
  </main>
}
