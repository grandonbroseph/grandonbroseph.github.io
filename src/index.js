import patch from '@semibran/patch'
import * as h from './lib/vdom'
import Project from './views/project'
import * as projects from './projects'

const $root = document.querySelector('main')

patch($root, h.main([
  h.header({ class: 'header' }, [
    h.div({ class: 'back' }, [
      h.span({ class: 'icon -back material-icons-round' }, ['arrow_right_alt']),
      'Home'
    ]),
    h.h1({ class: 'title' }, ['Project Showcase']),
    h.div({ class: 'theme-select' }, [
      h.span({ class: 'theme-icon icon -light material-icons-round' }, ['wb_sunny']),
      h.span({ class: 'theme-icon icon -dark material-icons-round' }, ['brightness_2']),
    ])
  ]),
  Project(projects.proto)
]))
