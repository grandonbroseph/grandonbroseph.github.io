import React, { useState } from 'react'
import Project from './Project'
import * as projects from '../data/projects'

export default function App () {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  let hero = null

  function closeMenu () {
    setMenu(false)
  }

  function toggleMenu () {
    setMenu(!menu)
  }

  window.addEventListener('scroll', () => {
    if (!hero) {
      hero = document.getElementById('hero')
    }
    if (window.scrollY >= hero.clientHeight) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  })

  return <main className='app'>
    <button onClick={toggleMenu}
      className={'nav-toggle material-icons-round' +
        (scrolled ? ' -filled' : '')}>
      {menu ? 'close' : 'menu'}
    </button>
    <nav className='nav'>
      <span className='nav-title'>Menu</span>
      <ul className='nav-list'>
        <li className='nav-item'>
          <a className='nav-link'>Home</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link'>About</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link'>Projects</a>
        </li>
      </ul>
    </nav>
    <div className={menu ? 'page -slide' : 'page'}
         onClick={menu ? closeMenu : null}>
      <div className='hero' id='hero'>
        <div className='headings'>
          <h1 className='name'>Brandon <strong>Semilla</strong></h1>
          <div className='titles'>
            <h2 className='title'>Web Developer</h2>
            <h2 className='subtitle'> + Game Designer</h2>
          </div>
        </div>
        <div className='socials'>
          <div className='social'>
            <img className='social-icon -github' src='../assets/icon-github.svg' />
          </div>
          <div className='social'>
            <img className='social-icon -linkedin' src='../assets/icon-linkedin.svg' />
          </div>
          <div className='social'>
            <span className='social-icon material-icons-round'>mail</span>
          </div>
        </div>
      </div>
      <section className='section -about'>
        <h3 className='section-title'>About</h3>
        <div className='picture'></div>
        <p>Hi, I&apos;m Brandon! I&apos;m a front-end web developer and designer. I excel in using modern web frameworks like React and Vue with HTML and CSS to create beautiful and highly interactive user interfaces for any device.</p>
        <p>Currently, I&apos;m a second-term Computer Systems Technology (CST) student at BCIT in search of an entry-level co-op position. Need someone to build a website for the 21st century? Let&apos;s get in touch!</p>
        <button className='button'>
          Download résumé
          <span className='icon -padded material-icons-round'>download</span>
        </button>
      </section>
      <section className='section -projects'>
        <h3 className='section-title'>Projects</h3>
        <div className='projects'>
          {projects.sequence.map((project, i) =>
            <Project key={i} {...project} />)}
        </div>
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
