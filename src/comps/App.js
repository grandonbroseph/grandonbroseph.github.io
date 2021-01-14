import React, { useState, useRef } from 'react'
import { Link } from 'react-scroll'
import Project from './Project'
import * as projects from '../data/projects'

const scrollDelay = 0
const scrollDuration = 500

export default function App () {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)

  function closeMenu () {
    setMenu(false)
    document.body.classList.remove('-noclick')
  }

  function toggleMenu () {
    setMenu(!menu)
    document.body.classList.toggle('-noclick')
  }

  window.addEventListener('scroll', () => {
    const headerHeight = 64
    if (window.scrollY >= heroRef.current.clientHeight - headerHeight) {
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
          <Link className='nav-link'
                activeClass='-active'
                to='hero'
                spy={true}
                smooth={true}
                duration={scrollDuration}
                delay={scrollDelay}
                onClick={closeMenu}
          >Home</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link'
                activeClass='-active'
                to='about'
                spy={true}
                smooth={true}
                duration={scrollDuration}
                delay={scrollDelay}
                onClick={closeMenu}
          >About</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link'
                activeClass='-active'
                to='projects'
                spy={true}
                smooth={true}
                duration={scrollDuration}
                delay={scrollDelay}
                onClick={closeMenu}
          >Projects</Link>
        </li>
      </ul>
    </nav>
    <div className={menu ? 'page -slide' : 'page'}
         onClick={menu ? closeMenu : null}>
      <div className='hero' id='hero' ref={heroRef}>
        <div className='hero-content'>
          <div className='headings'>
            <h1 className='name'>Brandon <strong>Semilla</strong></h1>
            <div className='titles'>
              <h2 className='title'>Web Developer</h2>
              <h2 className='subtitle'> + Game Designer</h2>
            </div>
          </div>
          <Socials />
        </div>
      </div>
      <section className='section -about' id='about' ref={aboutRef}>
        <h3 className='section-title'>About</h3>
        <div className='about'>
          <div className='about-picture'></div>
          <div className='about-content'>
            <p>Hi, I&apos;m Brandon! I&apos;m a front-end web developer and UI/UX designer. I specialize in using modern web frameworks including React and Vue with HTML/CSS/JS to create highly interactive user interfaces for any device.</p>
            <p>Currently, I&apos;m a second-term Computer Systems Technology (CST) student at BCIT in search of an entry-level co-op position. Need a beautiful and responsive website built for the 21st century? Let&apos;s get in touch!</p>
            <button className='button' title='Currently unavailable' disabled>
              Download résumé
              <span className='icon -padded material-icons-round'>download</span>
            </button>
          </div>
        </div>
      </section>
      <section className='section -projects' id='projects' ref={projectsRef}>
        <h3 className='section-title'>Projects</h3>
        <div className='projects'>
          {[...projects.sequence.map((project, i) =>
            <Project key={i} {...project} />),
            <div key='notice' className='project-notice -desktop'>
              <img src='../assets/icon-github.svg' className='project-notice-icon' />
              <span>Find more projects on <a
                href='https://github.com/semibran'
                target='_blank'
                rel='noreferrer'>my GitHub</a>!
              </span>
            </div>
          ]}
        </div>
        <div className='project-notice -mobile -tablet'>
          <img src='../assets/icon-github.svg' className='project-notice-icon' />
          <span>Find more projects on <a
            href='https://github.com/semibran'
            target='_blank'
            rel='noreferrer'>my GitHub!</a>
          </span>
        </div>
      </section>
      <footer className='footer'>
        <span className='footer-text'>
          &copy;{new Date().getFullYear()} Brandon Semilla · <a
            href='https://opensource.org/licenses/MIT'
            target='_blank'
            rel='noreferrer'
            className='footer-notice'>MIT</a>
        </span>
        <Socials />
      </footer>
    </div>
  </main>
}

function Socials () {
  return <div className='socials'>
    <a className='social'
        href='https://github.com/semibran'
        target='_blank'
        rel='noreferrer'>
      <img className='social-icon -github' src='../assets/icon-github.svg' />
    </a>
    <a className='social'
        href='https://www.linkedin.com/in/brandon-semilla/'
        target='_blank'
        rel='noreferrer'>
      <img className='social-icon -linkedin' src='../assets/icon-linkedin.svg' />
    </a>
    <a className='social'
        href='mailto:semibran+gh@gmail.com'
        target='_blank'
        rel='noreferrer'>
      <span className='social-icon material-icons-round'>mail</span>
    </a>
  </div>
}
